// scanner.js — Premium AI food scanner with OpenAI Vision + manual correction
import { store } from '../store.js';
import { router } from '../router.js';
import { recognizeFood, getRandomMeal } from '../data/food-db.js';
import { analyzeFoodWithVision, hasVisionApi } from '../services/food-vision.js';
import { showToast } from '../components/toast.js';
import { createFoodCard } from '../components/food-card.js';

let stream = null;
let capturedImageDataUrl = null;
let sessionDetectedFoods = [];
let processingTimer = null;
let stepInterval = null;
let analysisAborted = false;
let lastAnalysisMeta = { source: 'estimate', message: null, confidence: 75, description: '' };

function clearAnalysisTimers() {
  if (processingTimer) { clearTimeout(processingTimer); processingTimer = null; }
  if (stepInterval) { clearInterval(stepInterval); stepInterval = null; }
}

function stopCamera() {
  stream?.getTracks().forEach(t => t.stop());
  stream = null;
}

export function render(container) {
  let isFlashOn = false;
  let currentMealType = null;

  function computeTotals(foods) {
    const t = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    foods.forEach(f => {
      t.calories += Number(f.calories) || 0;
      t.protein += Number(f.protein) || 0;
      t.carbs += Number(f.carbs) || 0;
      t.fat += Number(f.fat) || 0;
    });
    return {
      calories: Math.round(t.calories),
      protein: Math.round(t.protein * 10) / 10,
      carbs: Math.round(t.carbs * 10) / 10,
      fat: Math.round(t.fat * 10) / 10,
    };
  }

  function renderCameraState() {
    const visionReady = hasVisionApi();
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
            <div style="position:absolute;top:14px;left:50%;transform:translateX(-50%);" class="nv-badge ${visionReady ? 'nv-badge--vision' : 'nv-badge--estimate'}">
              ${visionReady ? '● AI Vision ON' : '○ Demo mode'}
            </div>
          </div>
          <div id="camera-fallback" style="display:none;position:absolute;inset:0;background:#0a0a0f;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;text-align:center;">
            <span style="font-size:3rem;">📷</span>
            <p style="color:rgba(255,255,255,0.7);font-size:0.9rem;max-width:260px;line-height:1.5;">Camera unavailable. Upload a photo from your gallery.</p>
            <button class="nv-btn-primary btn-upload-fallback" style="width:auto;padding:0 24px;">Choose Photo</button>
          </div>
        </div>

        <p style="text-align:center;font-size:0.72rem;color:rgba(255,255,255,0.35);padding:8px 20px 0;">
          ${visionReady ? 'GPT-4 Vision analyzes your actual meal' : 'Add API key in Profile for accurate AI'}
        </p>

        <div class="nv-scanner-controls">
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
        showToast({ message: 'Use Gallery if camera is not ready', type: 'info' });
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
    stopCamera();
    clearAnalysisTimers();

    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) currentMealType = 'breakfast';
    else if (hour >= 10 && hour < 15) currentMealType = 'lunch';
    else if (hour >= 17 && hour < 22) currentMealType = 'dinner';
    else currentMealType = 'snacks';

    const previewSrc = capturedImageDataUrl;

    container.innerHTML = `
      <div class="scanner-processing-page animate-fadeIn" style="height:100dvh;background:var(--bg-primary);display:flex;flex-direction:column;">
        <div style="height:42%;position:relative;overflow:hidden;background:#111;">
          ${previewSrc ? `<img src="${previewSrc}" alt="Your meal" style="width:100%;height:100%;object-fit:cover;" />` : '<div style="height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;">🍽️</div>'}
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(10,10,15,0.8));"></div>
          <div class="scanner-line" style="position:absolute;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent,#00cec9,transparent);animation:scanLine 1.6s linear infinite;"></div>
          <div style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);" class="nv-badge nv-badge--vision">
            <span style="width:6px;height:6px;border-radius:50%;background:var(--accent-teal);animation:pulse 1s infinite;"></span>
            ${hasVisionApi() ? 'GPT-4 Vision analyzing...' : 'Analyzing image...'}
          </div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;gap:20px;text-align:center;">
          <div style="width:88px;height:88px;border-radius:50%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;box-shadow:0 12px 40px rgba(108,92,231,0.5);">
            <i data-lucide="brain" style="width:40px;height:40px;color:#fff;" class="animate-pulse"></i>
          </div>
          <div>
            <h2 class="font-display" style="font-size:1.35rem;font-weight:800;color:var(--text-primary);margin:0 0 8px;">Reading Your Meal</h2>
            <p class="processing-text" style="font-size:0.85rem;color:var(--text-secondary);margin:0;min-height:22px;">Identifying foods and nutrients...</p>
          </div>
          <div id="progress-steps" style="width:100%;max-width:300px;display:flex;flex-direction:column;gap:8px;"></div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    const stepsEl = container.querySelector('#progress-steps');
    const steps = ['Detecting food items', 'Estimating portions', 'Calculating macros'];
    steps.forEach((label, i) => {
      const el = document.createElement('div');
      el.className = 'nv-glass';
      el.style.cssText = 'padding:10px 14px;display:flex;align-items:center;gap:10px;opacity:0.35;font-size:0.8rem;color:var(--text-secondary);transition:all 0.3s;';
      el.innerHTML = `<i data-lucide="loader" style="width:14px;height:14px;"></i><span>${label}</span>`;
      el.dataset.step = i;
      stepsEl.appendChild(el);
    });
    if (window.lucide) window.lucide.createIcons();

    const txtEl = container.querySelector('.processing-text');
    let stepIdx = 0;
    stepInterval = setInterval(() => {
      const stepEls = container.querySelectorAll('#progress-steps > div');
      if (stepIdx < stepEls.length) {
        stepEls[stepIdx].style.opacity = '1';
        stepEls[stepIdx].style.borderColor = 'rgba(0,206,201,0.4)';
        stepIdx++;
      }
    }, 700);

    processingTimer = setTimeout(async () => {
      clearAnalysisTimers();
      if (analysisAborted) return;

      try {
        const result = await analyzeFoodWithVision(capturedImageDataUrl, currentMealType);
        lastAnalysisMeta = result;
        sessionDetectedFoods = result.foods?.length ? [...result.foods] : getRandomMeal(currentMealType === 'snacks' ? 'snack' : currentMealType);

        if (!analysisAborted) {
          if (result.message && result.source !== 'vision') {
            showToast({ message: result.message, type: 'info', duration: 4000 });
          }
          renderResults(sessionDetectedFoods);
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

  function bindCorrectionSearch() {
    const input = container.querySelector('.nv-correction-input');
    const dropdown = container.querySelector('.nv-search-dropdown');
    if (!input || !dropdown) return;

    input.addEventListener('input', () => {
      const q = input.value.trim();
      if (q.length < 2) {
        dropdown.classList.remove('open');
        dropdown.innerHTML = '';
        return;
      }
      const matches = recognizeFood(q);
      if (!matches.length) {
        dropdown.innerHTML = '<div style="padding:12px;font-size:0.8rem;color:var(--text-secondary);text-align:center;">No matches</div>';
        dropdown.classList.add('open');
        return;
      }
      dropdown.innerHTML = '';
      matches.forEach(food => {
        const row = document.createElement('div');
        row.className = 'nv-search-item';
        row.innerHTML = `
          <span style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:1.2rem;">${food.icon || '🍲'}</span>
            <span style="font-size:0.85rem;font-weight:600;color:var(--text-primary);">${food.name}</span>
          </span>
          <span style="font-size:0.8rem;font-weight:700;color:var(--accent-pink);">${food.calories} kcal</span>
        `;
        row.addEventListener('click', () => {
          sessionDetectedFoods.push({
            ...food,
            mealId: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
          });
          input.value = '';
          dropdown.classList.remove('open');
          renderResults(sessionDetectedFoods);
          showToast({ message: `Added ${food.name}`, type: 'success', duration: 1200 });
        });
        dropdown.appendChild(row);
      });
      dropdown.classList.add('open');
    });
  }

  function renderResults(foods) {
    if (!foods?.length) {
      foods = sessionDetectedFoods.length ? sessionDetectedFoods : getRandomMeal('lunch');
    }
    sessionDetectedFoods = foods.map(f => ({ ...f, mealId: f.mealId || Date.now().toString(36) }));

    const mealType = currentMealType || 'lunch';
    const totals = computeTotals(sessionDetectedFoods);
    const previewSrc = capturedImageDataUrl;
    const meta = lastAnalysisMeta;
    const isVision = meta.source === 'vision';
    const badgeClass = isVision ? 'nv-badge--vision' : 'nv-badge--estimate';
    const badgeText = isVision ? `AI Vision · ${meta.confidence}%` : 'Estimated · add API key in Profile';

    container.innerHTML = `
      <div class="nv-results animate-fadeIn">
        <div class="nv-results-hero">
          ${previewSrc ? `<img src="${previewSrc}" alt="Scanned meal" />` : '<div style="height:100%;background:linear-gradient(135deg,#1a1a2e,#0a0a0f);"></div>'}
          <div class="nv-results-hero-overlay"></div>
          <div style="position:absolute;top:16px;left:16px;right:16px;display:flex;justify-content:space-between;align-items:center;z-index:2;">
            <button class="btn-back nv-btn-ghost" type="button" style="padding:8px 12px;background:rgba(0,0,0,0.5);border:none;color:#fff;">
              <i data-lucide="arrow-left" style="width:18px;height:18px;"></i>
            </button>
            <button class="btn-restart nv-btn-ghost" type="button" style="padding:8px 12px;background:rgba(0,0,0,0.5);border:none;color:#fff;font-size:0.78rem;">
              <i data-lucide="scan" style="width:14px;height:14px;"></i> Rescan
            </button>
          </div>
          <div class="nv-results-hero-content">
            <span class="nv-badge ${badgeClass}" style="margin-bottom:10px;">${badgeText}</span>
            ${meta.description ? `<p style="font-size:0.78rem;color:var(--text-secondary);margin:0 0 8px;line-height:1.4;">${meta.description}</p>` : ''}
            <div style="display:flex;align-items:baseline;gap:6px;">
              <span class="nv-calorie-hero">${totals.calories}</span>
              <span style="font-size:1.1rem;color:var(--text-secondary);font-weight:600;">kcal total</span>
            </div>
            <div class="nv-macro-row">
              <div class="nv-macro-chip nv-glass" style="border:1px solid rgba(0,206,201,0.2);">
                <div class="nv-macro-chip-label">Protein</div>
                <div class="nv-macro-chip-value" style="color:var(--accent-teal);">${totals.protein}g</div>
              </div>
              <div class="nv-macro-chip nv-glass" style="border:1px solid rgba(253,203,110,0.2);">
                <div class="nv-macro-chip-label">Carbs</div>
                <div class="nv-macro-chip-value" style="color:var(--accent-yellow);">${totals.carbs}g</div>
              </div>
              <div class="nv-macro-chip nv-glass" style="border:1px solid rgba(162,155,254,0.2);">
                <div class="nv-macro-chip-label">Fat</div>
                <div class="nv-macro-chip-value" style="color:var(--accent-purple-light);">${totals.fat}g</div>
              </div>
            </div>
          </div>
        </div>

        <div class="nv-results-body">
          <div class="nv-correction-bar">
            <input type="text" class="nv-correction-input" placeholder="Wrong item? Search to add correct food..." />
            <button class="nv-btn-ghost btn-fix-results" type="button" style="white-space:nowrap;padding:12px 14px;">
              <i data-lucide="search" style="width:16px;height:16px;"></i>
            </button>
          </div>
          <div class="nv-search-dropdown"></div>

          <h3 class="font-display" style="font-size:0.9rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;display:flex;align-items:center;gap:6px;">
            <i data-lucide="list-checks" style="width:16px;height:16px;color:var(--accent-teal);"></i>
            Detected Items (${sessionDetectedFoods.length})
          </h3>
          <div class="results-ingredients-list"></div>

          <div class="nv-glass" style="padding:14px;margin-top:14px;">
            <label style="font-size:0.7rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:10px;">Log as</label>
            <div class="meal-type-chips" style="display:flex;gap:6px;">
              ${['breakfast','lunch','dinner','snacks'].map(type => `
                <button type="button" class="meal-chip ${type === mealType ? 'active' : ''}" data-type="${type}"
                  style="flex:1;padding:10px 0;border-radius:var(--radius-md);font-size:0.75rem;font-weight:600;border:1px solid ${type === mealType ? 'var(--accent-teal)' : 'var(--glass-border)'};background:${type === mealType ? 'rgba(0,206,201,0.12)' : 'transparent'};color:${type === mealType ? 'var(--accent-teal)' : 'var(--text-secondary)'};">
                  ${type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="nv-results-footer">
          <button class="nv-btn-primary btn-save-meal" type="button">
            <i data-lucide="plus-circle" style="width:18px;height:18px;"></i>
            Add ${totals.calories} kcal to Diary
          </button>
          <button class="nv-btn-ghost btn-cancel-results" type="button" style="width:100%;margin-top:8px;justify-content:center;">Discard</button>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    const listEl = container.querySelector('.results-ingredients-list');
    sessionDetectedFoods.forEach(food => {
      const card = createFoodCard({
        food,
        showDelete: true,
        onDelete: (id) => {
          const idx = sessionDetectedFoods.findIndex(f => (f.mealId || f.id) === id);
          if (idx >= 0) sessionDetectedFoods.splice(idx, 1);
          if (!sessionDetectedFoods.length) {
            showToast({ message: 'Add foods via search or rescan', type: 'info' });
            renderCameraState();
            return;
          }
          renderResults(sessionDetectedFoods);
        },
      });
      listEl.appendChild(card);
    });

    bindCorrectionSearch();
    container.querySelector('.nv-correction-input')?.focus();

    container.querySelector('.btn-back')?.addEventListener('click', () => router.back());
    container.querySelector('.btn-restart')?.addEventListener('click', () => {
      capturedImageDataUrl = null;
      sessionDetectedFoods = [];
      renderCameraState();
    });
    container.querySelector('.btn-cancel-results')?.addEventListener('click', () => {
      capturedImageDataUrl = null;
      router.navigate('home');
    });

    container.querySelector('.btn-save-meal')?.addEventListener('click', () => {
      if (!sessionDetectedFoods.length) {
        showToast({ message: 'No items to save', type: 'warning' });
        return;
      }
      const logType = container.querySelector('.meal-chip.active')?.getAttribute('data-type') || 'lunch';
      store.addMeal(new Date().toISOString().split('T')[0], logType, sessionDetectedFoods);
      store.incrementScanCount();
      capturedImageDataUrl = null;
      sessionDetectedFoods = [];
      showToast({ message: `Logged to ${logType}!`, type: 'success' });
      router.navigate('diary', { transition: 'slide-left' });
    });

    container.querySelectorAll('.meal-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        container.querySelectorAll('.meal-chip').forEach(c => {
          c.classList.remove('active');
          c.style.borderColor = 'var(--glass-border)';
          c.style.background = 'transparent';
          c.style.color = 'var(--text-secondary)';
        });
        chip.classList.add('active');
        chip.style.borderColor = 'var(--accent-teal)';
        chip.style.background = 'rgba(0,206,201,0.12)';
        chip.style.color = 'var(--accent-teal)';
      });
    });
  }

  renderCameraState();
}

export function onEnter() {}

export function onLeave() {
  analysisAborted = true;
  clearAnalysisTimers();
  stopCamera();
}
