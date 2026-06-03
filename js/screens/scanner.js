// scanner.js — Premium AI food scanner with OpenAI Vision + Confirmation & Selection Screen
import { store } from '../store.js';
import { router } from '../router.js';
import { analyzeFoodWithVision, getNutritionForConfirmedFood, guessIcon, hasVisionApi } from '../services/food-vision.js';
import { hasUsdaApi, usdaSearchFoods, getUsdaNutritionForFdcId } from '../services/nutrition-usda.js';
import { saveScannedImage } from '../services/image-store.js';
import { showToast } from '../components/toast.js';

let stream = null;
let capturedImageDataUrl = null;
let capturedImageMeta = null;
let analysisAborted = false;

const LOW_CONFIDENCE_THRESHOLD = 0.8;

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
  }
}

function getStringHash(str) {
  if (!str) return '';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

export function render(container) {
  let isFlashOn = false;
  let currentMealType = null;

  // Enforce meal-type context by time of day
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 10) currentMealType = 'breakfast';
  else if (hour >= 10 && hour < 15) currentMealType = 'lunch';
  else if (hour >= 17 && hour < 22) currentMealType = 'dinner';
  else currentMealType = 'snacks';

  function renderCameraState() {
    const apiReady = true;

    container.innerHTML = `
      <div class="nv-scanner animate-fadeIn">
        <div class="nv-scanner-header">
          <button class="btn-back nv-side-btn" type="button" aria-label="Back">
            <i data-lucide="arrow-left" style="width:20px;height:20px;color:#fff;"></i>
          </button>
          <span class="nv-scanner-title">AI Food Scanner</span>
          <button class="btn-flash nv-side-btn" type="button" aria-label="Flash">
            <i data-lucide="zap" class="flash-icon" style="width:18px;height:18px;color:#fff;"></i>
          </button>
        </div>

        <div class="nv-scanner-viewfinder">
          <video id="scanner-video" autoplay playsinline muted></video>
          <div style="position:absolute;inset:0;pointer-events:none;">
            <div class="scanner-line" style="position:absolute;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent,#00cec9,transparent);animation:scanLine 2.5s linear infinite;"></div>
            <div style="position:absolute;top:14px;left:50%;transform:translateX(-50%);" class="nv-badge ${apiReady ? 'nv-badge--vision' : 'nv-badge--estimate'}">
              ${apiReady ? '● AI Scanner Active' : '⚠ Keys Required'}
            </div>
          </div>
          
          <!-- Key Required overlay blocker -->
          ${!apiReady ? `
            <div style="position:absolute;inset:0;background:rgba(10,10,15,0.92);backdrop-filter:blur(10px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:32px;text-align:center;z-index:5;">
              <div style="width:56px;height:56px;border-radius:50%;background:rgba(253,121,168,0.15);border:1px solid rgba(253,121,168,0.3);display:flex;align-items:center;justify-content:center;color:var(--accent-pink);">
                <i data-lucide="key-round" style="width:26px;height:26px;"></i>
              </div>
              <div>
                <h3 class="font-display" style="font-size:1.15rem;font-weight:800;color:var(--text-primary);margin:0 0 6px;">API Configuration Required</h3>
                <p style="color:var(--text-secondary);font-size:0.8rem;line-height:1.5;max-width:280px;margin:0;">
                  This scanner uses real-time GPT-4 Vision & USDA Food Data APIs. Please save your API keys in the Profile section to scan.
                </p>
              </div>
              <button class="btn btn-primary btn-go-profile" style="padding:0 24px;height:42px;font-size:0.85rem;">Configure Keys</button>
            </div>
          ` : ''}

          <div id="camera-fallback" style="display:none;position:absolute;inset:0;background:#0a0a0f;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;text-align:center;">
            <span style="font-size:3rem;">📷</span>
            <p style="color:rgba(255,255,255,0.7);font-size:0.9rem;max-width:260px;line-height:1.5;">Camera unavailable. Upload a photo from your gallery.</p>
            <button class="nv-btn-primary btn-upload-fallback" style="width:auto;padding:0 24px;">Choose Photo</button>
          </div>
        </div>

      

        <div class="nv-scanner-controls" style="${!apiReady ? 'pointer-events:none;opacity:0.4;' : ''}">
          <button class="btn-gallery nv-side-btn" type="button">
            <i data-lucide="image" style="width:20px;height:20px;color:#fff;"></i>
            Gallery
          </button>
          <input type="file" id="scanner-file-input" accept="image/*" style="display:none;" />
          <div class="nv-capture-ring">
            <button class="nv-capture-inner btn-trigger-capture" type="button" aria-label="Capture">
              <i data-lucide="camera" style="width:26px;height:26px;color:#222;"></i>
            </button>
          </div>
          <button class="btn-flip nv-side-btn" type="button">
            <i data-lucide="refresh-cw" style="width:20px;height:20px;color:#fff;"></i>
            Flip
          </button>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    container.querySelector('.btn-back').addEventListener('click', () => router.back());

    // Redirect to profile to input keys
    const goProfileBtn = container.querySelector('.btn-go-profile');
    if (goProfileBtn) {
      goProfileBtn.addEventListener('click', () => {
        router.navigate('profile');
      });
    }

    if (apiReady) {
      container.querySelector('.btn-flash').addEventListener('click', (e) => {
        const btn = e.currentTarget;
        isFlashOn = !isFlashOn;
        const icon = btn.querySelector('.flash-icon');
        if (icon) {
          icon.style.fill = isFlashOn ? '#fdcb6e' : 'none';
          icon.style.color = isFlashOn ? '#fdcb6e' : '#fff';
        }
      });

      container.querySelector('.btn-trigger-capture').addEventListener('click', () => {
        const video = container.querySelector('#scanner-video');
        if (video?.readyState >= 2 && video.videoWidth > 0) {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0);
          capturedImageDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        } else {
          capturedImageDataUrl = null;
          showToast({ message: 'Use Gallery upload if camera is not ready', type: 'info' });
          return;
        }
        startAnalysis();
      });

      const fileInput = container.querySelector('#scanner-file-input');
      container.querySelector('.btn-gallery').addEventListener('click', () => fileInput.click());
      const fallback = container.querySelector('.btn-upload-fallback');
      if (fallback) fallback.addEventListener('click', () => fileInput.click());

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          capturedImageDataUrl = ev.target.result;
          fileInput.value = '';
          startAnalysis();
        };
        reader.onerror = () => showToast({ message: 'Could not read image', type: 'error' });
        reader.readAsDataURL(file);
      });

      let facingMode = 'environment';
      container.querySelector('.btn-flip').addEventListener('click', () => {
        facingMode = facingMode === 'environment' ? 'user' : 'environment';
        stopCamera();
        startCamera(container.querySelector('#scanner-video'), container.querySelector('#camera-fallback'), facingMode);
      });

      startCamera(container.querySelector('#scanner-video'), container.querySelector('#camera-fallback'), facingMode);
    }
  }

  function startCamera(videoEl, fallbackEl, facing) {
    if (!navigator.mediaDevices?.getUserMedia) {
      if (fallbackEl) fallbackEl.style.display = 'flex';
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } } })
      .then(str => {
        stream = str;
        if (videoEl) {
          videoEl.srcObject = stream;
          videoEl.play().catch(() => {});
        }
      })
      .catch(() => { if (fallbackEl) fallbackEl.style.display = 'flex'; });
  }

  function startAnalysis() {
    analysisAborted = false;
    capturedImageMeta = null;
    stopCamera();

    const previewSrc = capturedImageDataUrl;

    container.innerHTML = `
      <div class="scanner-processing-page animate-fadeIn" style="height:100dvh;background:var(--bg-primary);display:flex;flex-direction:column;">
        <div style="height:42%;position:relative;overflow:hidden;background:#111;">
          ${previewSrc ? `<img src="${previewSrc}" alt="Your meal" style="width:100%;height:100%;object-fit:cover;" />` : '<div style="height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;">🍽️</div>'}
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(10,10,15,0.8));"></div>
          <div class="scanner-line" style="position:absolute;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent,#00cec9,transparent);animation:scanLine 1.6s linear infinite;"></div>
          <div style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);" class="nv-badge nv-badge--vision">
            <span style="width:6px;height:6px;border-radius:50%;background:var(--accent-teal);animation:pulse 1s infinite;"></span>
            GPT-4 Vision analyzing...
          </div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;gap:20px;text-align:center;">
          <div style="width:88px;height:88px;border-radius:50%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;box-shadow:0 12px 40px rgba(108,92,231,0.5);">
            <i data-lucide="brain" style="width:40px;height:40px;color:#fff;" class="animate-pulse"></i>
          </div>
          <div>
            <h2 class="font-display" style="font-size:1.35rem;font-weight:800;color:var(--text-primary);margin:0 0 8px;">Analyzing Photo</h2>
            <p class="processing-text" style="font-size:0.85rem;color:var(--text-secondary);margin:0;min-height:22px;">Identifying unified dish predictions...</p>
          </div>
          <div id="progress-steps" style="width:100%;max-width:300px;display:flex;flex-direction:column;gap:8px;"></div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    const stepsEl = container.querySelector('#progress-steps');
    const stepLabels = ['Scanned image recognition', 'Generating candidates', 'Ready for validation'];
    stepLabels.forEach((label, i) => {
      const el = document.createElement('div');
      el.className = 'nv-glass';
      el.style.cssText = 'padding:10px 14px;display:flex;align-items:center;gap:10px;opacity:0.35;font-size:0.8rem;color:var(--text-secondary);transition:all 0.3s;';
      el.innerHTML = `<i data-lucide="loader" class="animate-spin" style="width:14px;height:14px;"></i><span>${label}</span>`;
      el.dataset.step = i;
      stepsEl.appendChild(el);
    });
    if (window.lucide) window.lucide.createIcons();

    let stepIdx = 0;
    const stepInterval = setInterval(() => {
      const stepEls = container.querySelectorAll('#progress-steps > div');
      if (stepIdx < stepEls.length) {
        stepEls[stepIdx].style.opacity = '1';
        stepEls[stepIdx].style.borderColor = 'rgba(0,206,201,0.4)';
        stepIdx++;
      }
    }, 600);

    setTimeout(async () => {
      clearInterval(stepInterval);
      if (analysisAborted) return;

      try {
        const result = await analyzeFoodWithVision(capturedImageDataUrl);

        // Save scanned image to IndexedDB
        try {
          capturedImageMeta = await saveScannedImage(capturedImageDataUrl);
        } catch (e) {
          capturedImageMeta = null;
          console.warn('[Scanner] Scanned image persistence failed:', e);
        }

        const predictions = result.predictions || [];
        if (!predictions.length) {
          throw new Error('No food candidates identified.');
        }

        // Direct selection or interactive picker based on confidence
        const bestPrediction = predictions[0];
        if (bestPrediction.confidence >= LOW_CONFIDENCE_THRESHOLD) {
          // High confidence: skip selection, go directly to confirmation
          renderConfirmationScreen(bestPrediction, result.description, predictions);
        } else {
          // Low confidence (< 80%): show prediction selector picker
          renderPredictionPicker(predictions, result.description);
        }

      } catch (e) {
        console.error('[Scanner]', e);
        if (!analysisAborted) {
          showToast({ message: e.message || 'Analysis failed', type: 'error' });
          renderCameraState();
        }
      }
    }, 1800);
  }

  // --- STAGE A: Predictions Selector Picker Screen ---
  function renderPredictionPicker(predictions, description) {
    const previewSrc = capturedImageDataUrl;

    container.innerHTML = `
      <div class="nv-results animate-fadeIn" style="background:var(--bg-primary);min-height:100dvh;padding-bottom:30px;">
        <div class="nv-results-hero" style="height:320px;position:relative;">
          ${previewSrc ? `<img src="${previewSrc}" alt="Scanned meal" style="width:100%;height:100%;object-fit:cover;" />` : ''}
          <div class="nv-results-hero-overlay" style="position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(10,10,15,0.95));"></div>
          <div style="position:absolute;top:16px;left:16px;z-index:2;">
            <button class="btn-restart nv-btn-ghost" style="padding:8px 12px;background:rgba(0,0,0,0.5);border:none;border-radius:20px;color:#fff;">
              <i data-lucide="arrow-left" style="width:16px;height:16px;vertical-align:middle;margin-right:4px;"></i> Retake
            </button>
          </div>
          <div style="position:absolute;bottom:20px;left:16px;right:16px;z-index:2;">
            <span class="nv-badge nv-badge--estimate" style="margin-bottom:8px;">Confidence Alert</span>
            <h2 class="font-display" style="font-size:1.3rem;font-weight:800;color:var(--text-primary);margin:0;">Low-Confidence Match</h2>
            <p style="font-size:0.75rem;color:var(--text-secondary);margin:4px 0 0;">${description || 'Please select the correct food item from the list below.'}</p>
          </div>
        </div>

        <div style="padding:20px 16px;">
          <h3 class="font-display" style="font-size:0.95rem;font-weight:850;color:var(--text-primary);margin:0 0 12px;display:flex;align-items:center;gap:6px;">
            <i data-lucide="sparkles" style="width:16px;height:16px;color:var(--accent-teal);"></i>
            Select Correct Prediction
          </h3>

          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
            ${predictions.map((p, idx) => {
              const pct = Math.round(p.confidence * 100);
              return `
                <div class="card glass-card btn-select-prediction" data-idx="${idx}" style="padding:14px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:all 0.2s;border:1px solid var(--glass-border);">
                  <div style="display:flex;align-items:center;gap:12px;">
                    <div style="font-size:1.5rem;">${p.icon || '🍲'}</div>
                    <div>
                      <h4 class="font-display" style="font-size:0.92rem;font-weight:700;color:var(--text-primary);margin:0;">${p.name}</h4>
                      <span style="font-size:0.75rem;color:var(--text-secondary);">Serving: ${p.serving} ${p.servingUnit}</span>
                    </div>
                  </div>
                  <div style="text-align:right;display:flex;align-items:center;gap:8px;">
                    <span class="font-display" style="font-size:0.8rem;font-weight:800;color:${pct >= 70 ? 'var(--accent-teal)' : 'var(--accent-yellow)'};background:rgba(255,255,255,0.03);padding:4px 8px;border-radius:12px;border:1px solid var(--glass-border);">${pct}% Match</span>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:var(--text-tertiary);"></i>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Divider -->
          <div style="display:flex;align-items:center;gap:10px;margin:24px 0 16px;">
            <div style="flex:1;height:1px;background:var(--glass-border);"></div>
            <span style="font-size:0.7rem;color:var(--text-tertiary);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Or Search Manually</span>
            <div style="flex:1;height:1px;background:var(--glass-border);"></div>
          </div>

          <div class="nv-correction-bar" style="position:relative;">
            <input type="text" class="nv-correction-input" placeholder="Search trusted database for correct food name..." style="width:100%;height:46px;padding:12px 42px 12px 14px;background:var(--bg-card);border:1px solid var(--glass-border);border-radius:var(--radius-md);color:var(--text-primary);outline:none;" />
            <i data-lucide="search" style="position:absolute;right:14px;top:15px;width:16px;height:16px;color:var(--text-secondary);"></i>
          </div>
          <div class="nv-search-dropdown" style="display:none;position:absolute;left:16px;right:16px;background:rgba(18,18,26,0.95);backdrop-filter:blur(16px);border:1px solid var(--glass-border);border-radius:var(--radius-md);max-height:220px;overflow-y:auto;z-index:10;box-shadow:0 10px 30px rgba(0,0,0,0.5);"></div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Retake back button
    container.querySelector('.btn-restart').addEventListener('click', () => {
      capturedImageDataUrl = null;
      renderCameraState();
    });

    // Select candidate click
    container.querySelectorAll('.btn-select-prediction').forEach(card => {
      card.addEventListener('click', (e) => {
        const idx = Number(card.getAttribute('data-idx'));
        renderConfirmationScreen(predictions[idx], description, predictions);
      });
    });

    // Manual search input correction binder
    const searchInput = container.querySelector('.nv-correction-input');
    const dropdown = container.querySelector('.nv-search-dropdown');
    let seq = 0;

    searchInput.addEventListener('input', async () => {
      const q = searchInput.value.trim();
      const mySeq = ++seq;
      if (q.length < 2) {
        dropdown.style.display = 'none';
        dropdown.innerHTML = '';
        return;
      }

      dropdown.innerHTML = '<div style="padding:12px;font-size:0.8rem;color:var(--text-secondary);text-align:center;">Searching USDA Database...</div>';
      dropdown.style.display = 'block';

      let usdaMatches = [];
      try {
        usdaMatches = await usdaSearchFoods(q, { pageSize: 6 });
      } catch (_) {
        usdaMatches = [];
      }

      if (mySeq !== seq) return;

      if (!usdaMatches.length) {
        dropdown.innerHTML = '<div style="padding:12px;font-size:0.8rem;color:var(--text-secondary);text-align:center;">No results found</div>';
        return;
      }

      dropdown.innerHTML = '';
      usdaMatches.forEach(match => {
        const row = document.createElement('div');
        row.className = 'nv-search-item';
        row.style.cssText = 'padding:12px 14px;border-bottom:1px solid var(--glass-border);cursor:pointer;display:flex;justify-content:space-between;align-items:center;';
        row.innerHTML = `
          <span style="font-size:0.85rem;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:240px;">${match.description}</span>
          <span style="font-size:0.65rem;font-weight:700;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.5px;">USDA DB</span>
        `;

        row.addEventListener('click', () => {
          dropdown.style.display = 'none';
          const food = {
            id: `usda_${match.fdcId}`,
            name: match.description,
            confidence: 0.99,
            serving: match.servingSize || 1,
            servingUnit: match.servingSizeUnit || 'g',
            icon: guessIcon(match.description, 'meal'),
            fdcId: match.fdcId
          };
          renderConfirmationScreen(food, description, predictions);
        });

        dropdown.appendChild(row);
      });
    });

    // Close search dropdown on click outside
    document.addEventListener('click', (e) => {
      if (dropdown && !dropdown.contains(e.target) && e.target !== searchInput) {
        dropdown.style.display = 'none';
      }
    });
  }

  // --- STAGE B: Validation & Confirmation Screen ---
  function renderConfirmationScreen(selectedFood, description, allPredictions) {
    const previewSrc = capturedImageDataUrl;
    let selectedMealType = currentMealType;

    // Build the structural screen HTML
    container.innerHTML = `
      <div class="nv-results animate-fadeIn" style="background:var(--bg-primary);height:100dvh;display:flex;flex-direction:column;overflow:hidden;">
        <!-- Hero Image -->
        <div class="nv-results-hero" style="height:250px;flex-shrink:0;position:relative;">
          ${previewSrc ? `<img src="${previewSrc}" alt="Confirmed food photo" style="width:100%;height:100%;object-fit:cover;" />` : ''}
          <div class="nv-results-hero-overlay" style="position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(10,10,15,0.95));"></div>
          
          <div style="position:absolute;top:16px;left:16px;z-index:2;">
            <button class="btn-restart-conf nv-btn-ghost" style="padding:8px 12px;background:rgba(0,0,0,0.5);border:none;border-radius:20px;color:#fff;">
              <i data-lucide="arrow-left" style="width:16px;height:16px;vertical-align:middle;margin-right:4px;"></i> Back
            </button>
          </div>
        </div>

        <div style="flex:1;overflow-y:auto;padding:16px 16px 100px;">
          <!-- Header card info -->
          <div class="card glass-card" style="padding:16px;margin-top:-30px;position:relative;z-index:3;border:1px solid var(--glass-border);box-shadow:0 8px 32px rgba(0,0,0,0.3);">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">
              <div>
                <span class="nv-badge nv-badge--vision" style="margin-bottom:6px;">
                  ● ${selectedFood.confidence >= 0.9 ? 'Verified' : 'Low Confidence'} Match · ${Math.round(selectedFood.confidence * 100)}%
                </span>
                <h2 class="font-display name-label-confirmed" style="font-size:1.2rem;font-weight:900;color:var(--text-primary);margin:0;line-height:1.3;">
                  ${selectedFood.name}
                </h2>
              </div>
              <div style="font-size:2rem;">${selectedFood.icon || '🍲'}</div>
            </div>
          </div>

          <!-- Loading Macros section -->
          <div id="nutrition-loading-container" style="padding:32px 16px;text-align:center;">
            <div class="animate-spin" style="width:36px;height:36px;border:3px solid rgba(0,206,201,0.1);border-top-color:var(--accent-teal);border-radius:50%;margin:0 auto 12px;"></div>
            <p style="font-size:0.8rem;color:var(--text-secondary);margin:0;">Querying trusted USDA Database...</p>
          </div>

          <!-- Loaded Macros Details card (initially hidden) -->
          <div id="nutrition-details-container" style="display:none;">
            <!-- Adjust Servings & Log Meal type Card -->
            <div class="card glass-card" style="padding:16px;margin:16px 0;display:flex;flex-direction:column;gap:14px;border:1px solid var(--glass-border);">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
                <div>
                  <h4 class="font-display" style="font-size:0.85rem;font-weight:800;color:var(--text-primary);margin:0;">Portion / Serving Size</h4>
                  <span style="font-size:0.75rem;color:var(--text-secondary);">Default unit: <span class="serving-unit-label">${selectedFood.servingUnit}</span></span>
                </div>
                <div style="display:flex;align-items:center;gap:6px;">
                  <button type="button" class="btn-serving-minus" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.04);border:1px solid var(--glass-border);color:var(--text-primary);font-size:1.1rem;font-weight:700;">-</button>
                  <input type="number" step="0.1" min="0.1" class="serving-qty-input" value="1.0" style="width:58px;height:36px;text-align:center;background:rgba(255,255,255,0.06);border:1px solid var(--glass-border);border-radius:6px;color:var(--text-primary);font-weight:700;font-size:0.95rem;outline:none;" />
                  <button type="button" class="btn-serving-plus" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.04);border:1px solid var(--glass-border);color:var(--text-primary);font-size:1.1rem;font-weight:700;">+</button>
                </div>
              </div>

              <div style="height:1px;background:var(--glass-border);"></div>

              <div>
                <label style="font-size:0.7rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:8px;">Meal Section</label>
                <div style="display:flex;gap:6px;">
                  ${['breakfast','lunch','dinner','snacks'].map(type => `
                    <button type="button" class="meal-chip-conf ${type === selectedMealType ? 'active' : ''}" data-type="${type}"
                      style="flex:1;padding:8px 0;border-radius:var(--radius-md);font-size:0.75rem;font-weight:600;border:1px solid ${type === selectedMealType ? 'var(--accent-teal)' : 'var(--glass-border)'};background:${type === selectedMealType ? 'rgba(0,206,201,0.12)' : 'transparent'};color:${type === selectedMealType ? 'var(--accent-teal)' : 'var(--text-secondary)'};outline:none;transition:all 0.2s;">
                      ${type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Macros Card layout -->
            <h3 class="font-display" style="font-size:0.95rem;font-weight:850;color:var(--text-primary);margin:20px 0 10px;display:flex;align-items:center;gap:6px;">
              <i data-lucide="scale" style="width:16px;height:16px;color:var(--accent-pink);"></i>
              Calculated Nutrients
            </h3>

            <!-- Calories Main Badge -->
            <div class="card glass-card" style="padding:16px;border:1px solid var(--glass-border);margin-bottom:12px;background:linear-gradient(135deg,rgba(255,255,255,0.015),rgba(253,121,168,0.03));display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span style="font-size:0.75rem;color:var(--text-secondary);font-weight:650;">CALORIES</span>
                <span class="usda-source-badge" style="display:block;font-size:0.6rem;color:var(--text-tertiary);margin-top:2px;">USDA Verified</span>
              </div>
              <div class="font-display" style="font-size:1.8rem;font-weight:900;color:var(--accent-pink);">
                <span class="macro-calories-val">0</span> <span style="font-size:0.95rem;font-weight:600;color:var(--text-secondary);">kcal</span>
              </div>
            </div>

            <!-- Macros Grid -->
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
              <div class="card glass-card" style="padding:12px;text-align:center;border:1px solid rgba(0,206,201,0.15);background:rgba(0,206,201,0.01);">
                <span style="font-size:0.65rem;color:var(--text-secondary);font-weight:700;display:block;margin-bottom:4px;">Protein</span>
                <span class="font-display macro-protein-val" style="font-size:1.15rem;font-weight:900;color:var(--accent-teal);">0g</span>
              </div>
              <div class="card glass-card" style="padding:12px;text-align:center;border:1px solid rgba(253,203,110,0.15);background:rgba(253,203,110,0.01);">
                <span style="font-size:0.65rem;color:var(--text-secondary);font-weight:700;display:block;margin-bottom:4px;">Carbs</span>
                <span class="font-display macro-carbs-val" style="font-size:1.15rem;font-weight:900;color:var(--accent-yellow);">0g</span>
              </div>
              <div class="card glass-card" style="padding:12px;text-align:center;border:1px solid rgba(162,155,254,0.15);background:rgba(162,155,254,0.01);">
                <span style="font-size:0.65rem;color:var(--text-secondary);font-weight:700;display:block;margin-bottom:4px;">Fat</span>
                <span class="font-display macro-fat-val" style="font-size:1.15rem;font-weight:900;color:var(--accent-purple-light);">0g</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Confirm log floating actions footer -->
        <div class="nv-results-footer" style="display:none;flex-shrink:0;position:sticky;bottom:0;left:0;right:0;background:rgba(10,10,15,0.85);backdrop-filter:blur(24px);border-top:1px solid var(--glass-border);padding:14px 16px 24px 16px;z-index:10;">
          <button class="nv-btn-primary btn-save-confirmed-meal" type="button" style="width:100%;height:48px;">
            <i data-lucide="plus-circle" style="width:18px;height:18px;margin-right:6px;"></i>
            Confirm & Save to Diary
          </button>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Variables to track parsed USDA macros
    let baseNutrition = null;
    let currentScale = 1.0;

    // Back click handler
    container.querySelector('.btn-restart-conf').addEventListener('click', () => {
      // If we had top predictions list, go back to Picker; else viewfinder
      if (allPredictions && allPredictions.length > 1 && selectedFood.confidence < LOW_CONFIDENCE_THRESHOLD) {
        renderPredictionPicker(allPredictions, description);
      } else {
        capturedImageDataUrl = null;
        renderCameraState();
      }
    });

    // Recalculates and displays updated macros in the UI
    function updateMacrosUI() {
      if (!baseNutrition) return;

      const scaledCal = Math.round(baseNutrition.calories * currentScale);
      const scaledP = Math.round(baseNutrition.protein * currentScale * 10) / 10;
      const scaledC = Math.round(baseNutrition.carbs * currentScale * 10) / 10;
      const scaledF = Math.round(baseNutrition.fat * currentScale * 10) / 10;

      container.querySelector('.macro-calories-val').textContent = scaledCal;
      container.querySelector('.macro-protein-val').textContent = `${scaledP}g`;
      container.querySelector('.macro-carbs-val').textContent = `${scaledC}g`;
      container.querySelector('.macro-fat-val').textContent = `${scaledF}g`;
    }

    // USDA API key request lookups
    (async () => {
      try {
        const nut = await getNutritionForConfirmedFood(selectedFood.name);
        baseNutrition = nut;

        // Hide loader, show details
        container.querySelector('#nutrition-loading-container').style.display = 'none';
        container.querySelector('#nutrition-details-container').style.display = 'block';
        container.querySelector('.nv-results-footer').style.display = 'flex';

        // Update labels
        container.querySelector('.serving-unit-label').textContent = nut.servingUnit || 'serving';
        if (nut.nutritionSource?.provider) {
          container.querySelector('.usda-source-badge').textContent = `USDA Database Verified · fdcId: ${nut.fdcId || ''}`;
        }

        updateMacrosUI();
      } catch (err) {
        console.error('[NutritionLookup]', err);
        container.querySelector('#nutrition-loading-container').innerHTML = `
          <div style="width:48px;height:48px;border-radius:50%;background:rgba(253,121,168,0.1);display:flex;align-items:center;justify-content:center;color:var(--accent-pink);margin:0 auto 12px;">
            <i data-lucide="alert-triangle" style="width:22px;height:22px;"></i>
          </div>
          <h4 class="font-display" style="font-size:0.9rem;font-weight:800;color:var(--text-primary);margin:0 0 6px;">Nutrition Lookup Failed</h4>
          <p style="font-size:0.75rem;color:var(--text-secondary);line-height:1.4;margin:0 0 16px;">
            ${err.message || 'Could not query the trusted USDA database.'}
          </p>
          <button class="btn btn-sm btn-retry-conf" style="background:rgba(255,255,255,0.04);border:1px solid var(--glass-border);color:var(--text-primary);padding:8px 16px;">Retry</button>
        `;
        if (window.lucide) window.lucide.createIcons();

        container.querySelector('.btn-retry-conf')?.addEventListener('click', () => {
          renderConfirmationScreen(selectedFood, description, allPredictions);
        });
      }
    })();

    // Serving Adjusters
    const qtyInput = container.querySelector('.serving-qty-input');
    const plusBtn = container.querySelector('.btn-serving-plus');
    const minusBtn = container.querySelector('.btn-serving-minus');

    if (qtyInput && plusBtn && minusBtn) {
      qtyInput.addEventListener('input', () => {
        let val = parseFloat(qtyInput.value);
        if (Number.isFinite(val) && val > 0) {
          currentScale = val;
          updateMacrosUI();
        }
      });

      plusBtn.addEventListener('click', () => {
        let val = parseFloat(qtyInput.value) || 1.0;
        val = Math.round((val + 0.1) * 10) / 10;
        qtyInput.value = val.toFixed(1);
        currentScale = val;
        updateMacrosUI();
      });

      minusBtn.addEventListener('click', () => {
        let val = parseFloat(qtyInput.value) || 1.0;
        if (val > 0.1) {
          val = Math.round((val - 0.1) * 10) / 10;
          qtyInput.value = val.toFixed(1);
          currentScale = val;
          updateMacrosUI();
        }
      });
    }

    // Category chips
    container.querySelectorAll('.meal-chip-conf').forEach(chip => {
      chip.addEventListener('click', () => {
        container.querySelectorAll('.meal-chip-conf').forEach(c => {
          c.classList.remove('active');
          c.style.borderColor = 'var(--glass-border)';
          c.style.background = 'transparent';
          c.style.color = 'var(--text-secondary)';
        });
        chip.classList.add('active');
        selectedMealType = chip.getAttribute('data-type');
        chip.style.borderColor = 'var(--accent-teal)';
        chip.style.background = 'rgba(0,206,201,0.12)';
        chip.style.color = 'var(--accent-teal)';
      });
    });

    // Save/Log Food Button
container.querySelector('.btn-save-confirmed-meal')?.addEventListener('click', async () => {

    if (!baseNutrition) {
        showToast({ message: 'Nutrition data is not loaded yet.', type: 'warning' });
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    const logType = selectedMealType || 'lunch';

    const finalCalories = Math.round(baseNutrition.calories * currentScale);
    const finalProtein  = Math.round(baseNutrition.protein  * currentScale * 10) / 10;
    const finalCarbs    = Math.round(baseNutrition.carbs    * currentScale * 10) / 10;
    const finalFat      = Math.round(baseNutrition.fat      * currentScale * 10) / 10;
    const finalServingAmt = Math.round((baseNutrition.serving * currentScale) * 10) / 10;

    const imageHash  = getStringHash(capturedImageDataUrl);
    const capturedAt = new Date().toISOString();

    const confirmedFood = {
        id:             baseNutrition.fdcId ? `usda_${baseNutrition.fdcId}` : `confirmed_${Date.now()}`,
        name:           baseNutrition.name,
        category:       'meal',
        calories:       finalCalories,
        protein:        finalProtein,
        carbs:          finalCarbs,
        fat:            finalFat,
        serving:        finalServingAmt,
        servingUnit:    baseNutrition.servingUnit,
        servingText:    `${finalServingAmt} ${baseNutrition.servingUnit}`,
        icon:           selectedFood.icon || '🍲',
        confidence:     selectedFood.confidence,
        imageId:        capturedImageMeta?.imageId   || null,
        thumbDataUrl:   capturedImageMeta?.thumbDataUrl || null,
        imageHash,
        capturedAt,
        fdcId:          baseNutrition.fdcId || null,
        nutritionSource: baseNutrition.nutritionSource
    };

    try {
        // ── 1. Check currentUser ──────────────────────────────
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("Current User:", currentUser);

        if (!currentUser?.id) {
            showToast({ message: 'Please login first', type: 'error' });
            return;
        }

        // ── 2. Build & log payload ────────────────────────────
        const payload = {
            user_id:        currentUser.id,
            food_name:      confirmedFood.name,
            calories:       confirmedFood.calories,
            protein:        confirmedFood.protein,
            carbs:          confirmedFood.carbs,
            fat:            confirmedFood.fat,
            meal_type:      logType,
            serving:        confirmedFood.serving,
            serving_unit:   confirmedFood.servingUnit,
            icon:           confirmedFood.icon,
            thumb_data_url: confirmedFood.thumbDataUrl || null
        };
        console.log("Payload:", payload);

        // ── 3. POST to backend ────────────────────────────────
        const response = await fetch('http://localhost:5000/addMeal', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(payload)
        });

        const data = await response.json();
        console.log("Backend Response:", data);

        if (data.success) {
            // ── 4. Sync localStorage store (powers home page) ─
            try {
                store.addMeal(today, logType, [confirmedFood]);
                console.log('[Save] store.addMeal OK');
            } catch (dupErr) {
                // Duplicate in localStorage is fine — DB already saved
                console.warn('[Save] store.addMeal skipped (duplicate):', dupErr.message);
            }

            showToast({ message: '✅ Meal saved successfully!', type: 'success' });
            router.navigate('diary');
        } else {
            console.error('[Save] Backend returned failure:', data);
            showToast({
                message: `Save failed: ${data.error || data.message || 'Unknown error'}`,
                type: 'error'
            });
        }

    } catch (err) {
        console.error('[Save] Exception:', err);
        showToast({ message: `Error: ${err.message}`, type: 'error' });
    }

}); // closes addEventListener

} // closes renderConfirmationScreen

renderCameraState();

} // closes render()

export function onEnter() {}

export function onLeave() {
    analysisAborted = true;
    stopCamera();
}

