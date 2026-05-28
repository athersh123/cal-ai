// onboarding.js — 3-step animated onboarding flow
import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';

export function render(container) {
  let currentStep = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  const steps = [
    {
      id: 'scan',
      title: 'Scan Your Meals',
      subtitle: 'with AI Vision',
      desc: 'Point your camera at any food. Our AI instantly identifies ingredients and estimates full nutritional data in seconds.',
      gradient: 'linear-gradient(135deg, #ff6b9d, #c0392b)',
      accentColor: '#ff6b9d',
      bgGlow: 'rgba(255,107,157,0.15)',
      icon: '📸',
      features: [
        { icon: '⚡', text: 'Instant food recognition' },
        { icon: '🎯', text: '95%+ accuracy rate' },
        { icon: '📚', text: '500+ foods in database' },
      ]
    },
    {
      id: 'track',
      title: 'Track Macros',
      subtitle: 'Effortlessly',
      desc: 'Watch your animated rings fill up as you log meals. Monitor calories, protein, carbs and fat with beautiful real-time charts.',
      gradient: 'linear-gradient(135deg, #00cec9, #0984e3)',
      accentColor: '#00cec9',
      bgGlow: 'rgba(0,206,201,0.15)',
      icon: '📊',
      features: [
        { icon: '💧', text: 'Water intake tracking' },
        { icon: '📈', text: 'Weekly progress charts' },
        { icon: '🔥', text: 'Calorie goals & streaks' },
      ]
    },
    {
      id: 'goals',
      title: 'Customize',
      subtitle: 'Your Goals',
      desc: 'Set your personal targets. Our AI tailors your macro ratios based on your goal — lose fat, build muscle, or maintain.',
      gradient: 'linear-gradient(135deg, #fdcb6e, #e17055)',
      accentColor: '#fdcb6e',
      bgGlow: 'rgba(253,203,110,0.15)',
      icon: '🏆',
      features: []
    }
  ];

  function renderSlides() {
    const step = steps[currentStep];
    const isLast = currentStep === 2;

    container.innerHTML = `
      <div class="onboarding-screen" style="display:flex;flex-direction:column;height:100dvh;background:var(--bg-primary);overflow:hidden;position:relative;">
        
        <!-- Background ambient glow -->
        <div style="position:absolute;inset:0;pointer-events:none;z-index:0;">
          <div style="position:absolute;top:-80px;left:50%;transform:translateX(-50%);width:400px;height:400px;background:${step.bgGlow};border-radius:50%;filter:blur(80px);opacity:0.8;transition:background 0.6s ease;"></div>
        </div>

        <!-- Top bar -->
        <div style="position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:52px 24px 0;">
          <div style="display:flex;align-items:center;gap:7px;">
            <div style="width:28px;height:28px;border-radius:8px;background:${step.gradient};display:flex;align-items:center;justify-content:center;font-size:0.85rem;box-shadow:0 4px 12px ${step.bgGlow};">✦</div>
            <span class="font-display" style="font-size:1rem;font-weight:800;color:var(--text-primary);">NutriVision <span style="background:${step.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">AI</span></span>
          </div>
          ${currentStep < 2 ? `
            <button class="btn-skip" style="font-size:0.82rem;font-weight:600;color:var(--text-tertiary);padding:5px 10px;border-radius:var(--radius-full);background:rgba(255,255,255,0.04);border:1px solid var(--glass-border);">Skip →</button>
          ` : ''}
        </div>

        <!-- Main slide content -->
        <div class="onboarding-slides-container" style="position:relative;z-index:2;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 28px;overflow:hidden;">
          
          ${isLast ? renderGoalStep(step) : renderInfoStep(step)}

        </div>

        <!-- Footer -->
        <div style="position:relative;z-index:2;padding:0 24px calc(28px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;align-items:center;gap:16px;">
          
          <!-- Step dots -->
          <div style="display:flex;align-items:center;gap:8px;">
            ${steps.map((_, i) => `
              <div style="height:6px;border-radius:var(--radius-full);background:${i === currentStep ? step.gradient : 'rgba(255,255,255,0.12)'};width:${i === currentStep ? '28px' : '6px'};transition:all 0.35s cubic-bezier(0.4,0,0.2,1);"></div>
            `).join('')}
          </div>

          <!-- CTA button -->
          <button class="btn-next" style="width:100%;height:54px;border-radius:var(--radius-full);background:${step.gradient};border:none;color:white;font-family:var(--font-display);font-size:1rem;font-weight:700;letter-spacing:0.3px;box-shadow:0 8px 28px ${step.bgGlow};display:flex;align-items:center;justify-content:center;gap:8px;transition:transform 0.15s ease,box-shadow 0.15s ease;cursor:pointer;">
            ${isLast ? `<i data-lucide="rocket" style="width:18px;height:18px;"></i> Get Started` : `Continue <i data-lucide="arrow-right" style="width:16px;height:16px;"></i>`}
          </button>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Attach range listener for step 3
    if (isLast) {
      const range = container.querySelector('.calorie-range');
      const valLabel = container.querySelector('.calorie-val');
      const goalBtns = container.querySelectorAll('.goal-btn');

      if (range && valLabel) {
        range.addEventListener('input', (e) => {
          const v = parseInt(e.target.value);
          valLabel.textContent = `${v.toLocaleString()} kcal`;
          // Update fill width
          const pct = ((v - 1200) / (4000 - 1200)) * 100;
          const fill = container.querySelector('.range-fill');
          if (fill) fill.style.width = pct + '%';
        });
        // Set initial fill
        const initPct = ((parseInt(range.value) - 1200) / (4000 - 1200)) * 100;
        const fill = container.querySelector('.range-fill');
        if (fill) fill.style.width = initPct + '%';
      }

      if (goalBtns) {
        goalBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            goalBtns.forEach(b => {
              b.style.borderColor = 'var(--glass-border)';
              b.style.background = 'rgba(255,255,255,0.03)';
              b.querySelector('.goal-check').style.opacity = '0';
            });
            btn.style.borderColor = step.accentColor;
            btn.style.background = `${step.bgGlow}`;
            btn.querySelector('.goal-check').style.opacity = '1';
            btn.dataset.selected = 'true';
          });
        });
        // Select first by default
        if (goalBtns[0]) goalBtns[0].click();
      }
    }

    // Next / Get Started
    const nextBtn = container.querySelector('.btn-next');
    nextBtn.addEventListener('mousedown', () => { nextBtn.style.transform = 'scale(0.97)'; });
    nextBtn.addEventListener('mouseup', () => { nextBtn.style.transform = 'scale(1)'; });
    nextBtn.addEventListener('touchstart', () => { nextBtn.style.transform = 'scale(0.97)'; }, { passive: true });
    nextBtn.addEventListener('touchend', () => { nextBtn.style.transform = 'scale(1)'; }, { passive: true });

    nextBtn.addEventListener('click', () => {
      if (currentStep < 2) {
        currentStep++;
        renderSlides();
      } else {
        completeOnboarding();
      }
    });

    // Skip
    const skipBtn = container.querySelector('.btn-skip');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        currentStep = 2;
        renderSlides();
      });
    }

    // Swipe gestures
    const slidesContainer = container.querySelector('.onboarding-slides-container');
    slidesContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    slidesContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const delta = touchEndX - touchStartX;
      if (delta < -55 && currentStep < 2) { currentStep++; renderSlides(); }
      if (delta > 55 && currentStep > 0) { currentStep--; renderSlides(); }
    }, { passive: true });
  }

  function renderInfoStep(step) {
    return `
      <div class="animate-fadeIn" style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:0;width:100%;">
        
        <!-- Hero illustration card -->
        <div style="position:relative;margin-bottom:32px;">
          <!-- Orbit rings -->
          <div style="position:absolute;inset:-24px;border-radius:50%;border:1px dashed rgba(255,255,255,0.07);animation:spin 18s linear infinite;"></div>
          <div style="position:absolute;inset:-12px;border-radius:50%;border:1px dashed rgba(255,255,255,0.05);animation:spin 12s linear infinite reverse;"></div>
          
          <!-- Main icon circle -->
          <div style="width:110px;height:110px;border-radius:50%;background:${step.gradient};display:flex;align-items:center;justify-content:center;font-size:3.2rem;box-shadow:0 16px 48px ${step.bgGlow},0 0 0 8px rgba(255,255,255,0.05);filter:drop-shadow(0 8px 20px ${step.bgGlow});animation:float 4s ease-in-out infinite;">
            ${step.icon}
          </div>

          <!-- Floating accent dots -->
          <div style="position:absolute;top:-4px;right:-8px;width:18px;height:18px;border-radius:50%;background:${step.gradient};opacity:0.7;animation:float 3s ease-in-out infinite 0.5s;"></div>
          <div style="position:absolute;bottom:4px;left:-12px;width:10px;height:10px;border-radius:50%;background:${step.gradient};opacity:0.5;animation:float 3.5s ease-in-out infinite 1s;"></div>
        </div>

        <!-- Text content -->
        <h2 class="font-display animate-slideUp" style="font-size:2rem;font-weight:900;color:var(--text-primary);line-height:1.1;margin-bottom:6px;">
          ${step.title}
        </h2>
        <h2 class="font-display animate-slideUp" style="font-size:2rem;font-weight:900;line-height:1.1;margin-bottom:18px;background:${step.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
          ${step.subtitle}
        </h2>
        <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.65;max-width:300px;margin-bottom:28px;">
          ${step.desc}
        </p>

        <!-- Feature pills -->
        <div style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:300px;">
          ${step.features.map((f, i) => `
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(255,255,255,0.03);border:1px solid var(--glass-border);border-radius:var(--radius-md);animation:slideUp 0.4s ease both;animation-delay:${0.1 + i * 0.08}s;">
              <span style="font-size:1rem;">${f.icon}</span>
              <span style="font-size:0.83rem;color:var(--text-secondary);font-weight:500;">${f.text}</span>
              <i data-lucide="check" style="width:13px;height:13px;color:${step.accentColor};margin-left:auto;opacity:0.8;"></i>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderGoalStep(step) {
    const goals = [
      { value: 'lose', label: 'Lose Weight', sub: 'Fat loss & calorie deficit', icon: '🔥' },
      { value: 'maintain', label: 'Stay Balanced', sub: 'Maintain current weight', icon: '⚖️' },
      { value: 'gain', label: 'Build Muscle', sub: 'Bulk & muscle growth', icon: '💪' },
    ];

    return `
      <div class="animate-fadeIn" style="display:flex;flex-direction:column;align-items:center;width:100%;gap:0;">

        <!-- Header -->
        <div style="text-align:center;margin-bottom:24px;">
          <div style="font-size:3rem;margin-bottom:12px;animation:float 3s ease-in-out infinite;">🏆</div>
          <h2 class="font-display" style="font-size:1.75rem;font-weight:900;color:var(--text-primary);line-height:1.1;margin-bottom:4px;">
            Your <span style="background:${step.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Goal</span>
          </h2>
          <p style="font-size:0.82rem;color:var(--text-secondary);">We'll set your personalized macro targets</p>
        </div>

        <!-- Name input -->
        <div style="width:100%;max-width:340px;margin-bottom:14px;">
          <label style="font-size:0.72rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:6px;">Your Name</label>
          <input type="text" class="input-field name-input" value="Alex" placeholder="Enter your name"
            style="width:100%;padding:13px 14px;border-radius:var(--radius-lg);background:rgba(255,255,255,0.04);border:1px solid var(--glass-border);color:var(--text-primary);font-size:0.92rem;outline:none;transition:border-color 0.2s;box-sizing:border-box;"
            onfocus="this.style.borderColor='${step.accentColor}'" onblur="this.style.borderColor='var(--glass-border)'" />
        </div>

        <!-- Goal selection buttons -->
        <div style="width:100%;max-width:340px;display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">
          ${goals.map((g, i) => `
            <button class="goal-btn" data-goal="${g.value}" data-selected="false"
              style="display:flex;align-items:center;gap:12px;width:100%;padding:12px 14px;border-radius:var(--radius-lg);background:rgba(255,255,255,0.03);border:1px solid var(--glass-border);text-align:left;cursor:pointer;transition:all 0.2s;animation:slideUp 0.4s ease both;animation-delay:${0.05 + i * 0.07}s;">
              <div style="width:40px;height:40px;border-radius:var(--radius-md);background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;">${g.icon}</div>
              <div style="flex:1;">
                <div class="font-display" style="font-size:0.9rem;font-weight:700;color:var(--text-primary);">${g.label}</div>
                <div style="font-size:0.74rem;color:var(--text-secondary);margin-top:1px;">${g.sub}</div>
              </div>
              <div class="goal-check" style="width:20px;height:20px;border-radius:50%;background:${step.gradient};display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.2s;flex-shrink:0;">
                <i data-lucide="check" style="width:11px;height:11px;color:white;"></i>
              </div>
            </button>
          `).join('')}
        </div>

        <!-- Calorie target slider -->
        <div style="width:100%;max-width:340px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <label style="font-size:0.72rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;">Daily Calorie Target</label>
            <span class="calorie-val font-display" style="font-size:0.95rem;font-weight:800;color:${step.accentColor};">2,200 kcal</span>
          </div>
          <!-- Custom track -->
          <div style="position:relative;height:6px;border-radius:var(--radius-full);background:rgba(255,255,255,0.08);margin-bottom:6px;">
            <div class="range-fill" style="position:absolute;left:0;top:0;height:100%;border-radius:var(--radius-full);background:${step.gradient};width:36%;transition:width 0.1s;"></div>
          </div>
          <input type="range" class="calorie-range" min="1200" max="4000" step="50" value="2200"
            style="width:100%;accent-color:${step.accentColor};margin-top:-14px;opacity:0;height:24px;cursor:pointer;position:relative;z-index:2;" />
          <div style="display:flex;justify-content:space-between;margin-top:2px;">
            <span style="font-size:0.68rem;color:var(--text-tertiary);">1,200</span>
            <span style="font-size:0.68rem;color:var(--text-tertiary);">4,000 kcal</span>
          </div>
        </div>
      </div>
    `;
  }

  function completeOnboarding() {
    const nameInput = container.querySelector('.name-input');
    const calorieRange = container.querySelector('.calorie-range');
    const activeGoalBtn = container.querySelector('.goal-btn[data-selected="true"]');

    const name = nameInput ? nameInput.value.trim() || 'Alex' : 'Alex';
    const goal = activeGoalBtn ? activeGoalBtn.getAttribute('data-goal') : 'maintain';
    const calories = calorieRange ? parseInt(calorieRange.value) : 2200;

    let pRatio = 0.28, cRatio = 0.45, fRatio = 0.27;
    if (goal === 'lose') { pRatio = 0.35; cRatio = 0.35; fRatio = 0.30; }
    else if (goal === 'gain') { pRatio = 0.25; cRatio = 0.50; fRatio = 0.25; }

    const protein = Math.round((calories * pRatio) / 4);
    const carbs = Math.round((calories * cRatio) / 4);
    const fat = Math.round((calories * fRatio) / 9);

    store.setProfile({ name, goal });
    store.setGoals({ calories, protein, carbs, fat });
    store.completeOnboarding();

    showToast({ message: `Welcome, ${name}! 🎉 Let's reach your goals!`, type: 'success' });
    router.navigate('home', { transition: 'fade' });
  }

  renderSlides();
}
