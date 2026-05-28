// profile.js — Profile editor containing macro target configurations weight trends and settings
import { store } from '../store.js';
import { router } from '../router.js';
import { theme } from '../theme.js';
import { createLineChart } from '../components/chart.js';
import { showModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { getOpenAiApiKey, setOpenAiApiKey, hasVisionApi } from '../services/food-vision.js';

let unsubscribeStore = null;
let weightChartInstance = null;

export function render(container) {
  
  function updateProfileView() {
    const state = store.getState();
    const profile = store.getProfile();
    const goals = store.getGoals();
    const weightHistory = store.getWeightHistory();
    const streak = store.getStreak();

    // Health Score Algorithm (0-100)
    // 40% streak consistency, 30% water target compliance, 30% calorie target compliance
    const totals = store.getTodayTotals();
    const calTargetComp = goals.calories > 0 ? Math.min((totals.calories / goals.calories) * 100, 100) : 0;
    const waterComp = goals.water > 0 ? Math.min((store.getWater() / goals.water) * 100, 100) : 0;
    
    // streak weight: max 7 days = 100%
    const streakWeight = Math.min((streak.current / 7) * 100, 100);

    const healthScore = Math.round((streakWeight * 0.4) + (waterComp * 0.3) + (calTargetComp * 0.3)) || 65;

    // BMI Calculation
    const heightM = (profile.height || 175) / 100;
    const bmiVal = ((profile.weight || 72) / (heightM * heightM)).toFixed(1);

    container.innerHTML = `
      <div class="profile-screen animate-fadeIn" style="padding: 20px 16px 40px 16px;">
        
        <!-- Header -->
        <div style="margin-bottom: 24px; text-align: center; display: flex; flex-direction: column; align-items: center; position: relative;">
          <div style="position: absolute; right:0; top:0;">
            <button class="btn-edit-profile" style="width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">
              <i data-lucide="edit-2" style="width: 14px; height: 14px;"></i>
            </button>
          </div>

          <div class="profile-avatar" style="width: 84px; height: 84px; border-radius: 50%; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; color: white; border: 3px solid var(--glass-border); box-shadow: 0 10px 25px rgba(108, 92, 231, 0.25); margin-bottom: 12px;">
            ${((profile.name || state.session || 'A')[0] || 'A').toUpperCase()}
          </div>
          
          <h2 class="font-display name-title-label" style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin:0;">
            ${profile.name || state.session || 'Alex'}
          </h2>
          <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 4px 0 0 0; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">
            Goal: ${profile.goal === 'lose' ? 'Fat Loss' : profile.goal === 'gain' ? 'Gain Weight / Muscle' : 'Maintain Weight'}
          </p>
        </div>

        <!-- 3 Stats cards -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px;">
          <div class="card glass-card" style="padding: 12px 6px; text-align: center; display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 0.65rem; color: var(--text-secondary); font-weight: 600;">Weight</span>
            <span class="font-display" style="font-size: 1rem; font-weight: 800; color: var(--text-primary);">${profile.weight || 72} <span style="font-size:0.7rem; font-weight: 500; color: var(--text-secondary);">kg</span></span>
          </div>
          <div class="card glass-card" style="padding: 12px 6px; text-align: center; display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 0.65rem; color: var(--text-secondary); font-weight: 600;">Health Score</span>
            <span class="font-display" style="font-size: 1rem; font-weight: 800; color: var(--accent-teal);">${healthScore} <span style="font-size:0.7rem; font-weight: 500; color: var(--text-secondary);">/100</span></span>
          </div>
          <div class="card glass-card" style="padding: 12px 6px; text-align: center; display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 0.65rem; color: var(--text-secondary); font-weight: 600;">BMI Index</span>
            <span class="font-display" style="font-size: 1rem; font-weight: 800; color: var(--accent-yellow);">${bmiVal}</span>
          </div>
        </div>

        <!-- Daily Target Goals editor list -->
        <div class="card glass-card" style="padding: 18px; margin-bottom: 24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px;">
            <h3 class="font-display" style="font-size: 0.95rem; font-weight: 850; color: var(--text-primary); margin:0;">Daily Target Goals</h3>
            <button class="btn-edit-goals" style="font-size: 0.75rem; font-weight: 600; color: var(--accent-pink);">Configure</button>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display:flex; align-items:center; justify-content:space-between; border-bottom: 1px solid var(--glass-border); padding-bottom: 8px;">
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Calories</span>
              <span class="font-display" style="font-size: 0.85rem; font-weight:700; color: var(--accent-pink);">${goals.calories} kcal</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; border-bottom: 1px solid var(--glass-border); padding-bottom: 8px;">
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Protein</span>
              <span class="font-display" style="font-size: 0.85rem; font-weight:700; color: var(--accent-teal);">${goals.protein} g</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; border-bottom: 1px solid var(--glass-border); padding-bottom: 8px;">
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Carbohydrates</span>
              <span class="font-display" style="font-size: 0.85rem; font-weight:700; color: var(--accent-yellow);">${goals.carbs} g</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; border-bottom: 1px solid var(--glass-border); padding-bottom: 8px;">
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Fat</span>
              <span class="font-display" style="font-size: 0.85rem; font-weight:700; color: var(--accent-purple-light);">${goals.fat} g</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Water Goal</span>
              <span class="font-display" style="font-size: 0.85rem; font-weight:700; color: var(--accent-blue);">${goals.water} ml</span>
            </div>
          </div>
        </div>

        <!-- Weight Progress Canvas Chart -->
        <div class="card glass-card" style="padding: 16px; margin-bottom: 24px; display:flex; flex-direction:column; gap: 12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 class="font-display" style="font-size: 0.95rem; font-weight: 850; color: var(--text-primary); margin:0;">Weight History</h3>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin:0;">Progress over past week</p>
            </div>
            <button class="btn btn-sm btn-log-weight-profile" style="padding: 6px 12px; background: rgba(0, 206, 201, 0.1); border: 1px solid rgba(0, 206, 201, 0.2); color: var(--accent-teal); border-radius: var(--radius-md); font-size: 0.75rem; font-weight: 700;">
              Log
            </button>
          </div>
          <div id="weight-chart-mount" style="width: 100%;"></div>
        </div>

        <!-- AI Vision API -->
        <div class="card glass-card nv-glow-border" style="padding: 18px; margin-bottom: 20px;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
            <div style="width:40px;height:40px;border-radius:12px;background:var(--gradient-protein);display:flex;align-items:center;justify-content:center;">
              <i data-lucide="sparkles" style="width:20px;height:20px;color:white;"></i>
            </div>
            <div>
              <h3 class="font-display" style="font-size:0.95rem;font-weight:800;color:var(--text-primary);margin:0;">AI Food Vision</h3>
              <p style="font-size:0.72rem;color:var(--text-secondary);margin:2px 0 0;">${hasVisionApi() ? '✓ Accurate mode active' : 'Demo mode — add API key'}</p>
            </div>
          </div>
          <p style="font-size:0.78rem;color:var(--text-secondary);line-height:1.5;margin:0 0 12px;">
            Connect OpenAI for real photo analysis (identifies what's actually on your plate).
          </p>
          <input type="password" class="nv-ai-key-input profile-openai-key" placeholder="sk-..." value="${getOpenAiApiKey() ? '••••••••••••' + getOpenAiApiKey().slice(-6) : ''}" autocomplete="off" />
          <div style="display:flex;gap:8px;margin-top:10px;">
            <button class="btn btn-primary btn-save-ai-key" style="flex:1;height:42px;font-size:0.82rem;">Save API Key</button>
            <button class="btn btn-ghost btn-clear-ai-key" style="height:42px;font-size:0.82rem;padding:0 14px;">Clear</button>
          </div>
        </div>

        <!-- Setting Options List -->
        <div class="card glass-card" style="padding: 12px; margin-bottom: 24px; display: flex; flex-direction: column; gap: 4px;">
          <!-- Theme selector toggle -->
          <div class="setting-item" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 8px; border-bottom: 1px solid var(--glass-border); cursor: pointer;" id="toggle-theme-row">
            <div style="display:flex; align-items:center; gap: 10px;">
              <div style="color: var(--accent-purple-light); display:flex;"><i data-lucide="${theme.isDark() ? 'moon' : 'sun'}" style="width: 18px; height: 18px;"></i></div>
              <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">Dark Theme Mode</span>
            </div>
            <!-- Switch UI -->
            <div class="switch" style="width: 44px; height: 24px; border-radius: 20px; background: ${theme.isDark() ? 'var(--gradient-primary)' : 'rgba(255,255,255,0.1)'}; position:relative; transition: background 0.3s;">
              <div class="switch-handle" style="width: 18px; height: 18px; border-radius: 50%; background:white; position:absolute; top:3px; left: ${theme.isDark() ? '23px' : '3px'}; transition: left 0.3s;"></div>
            </div>
          </div>

          <!-- Achievements Navigation link -->
          <div class="setting-item" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 8px; border-bottom: 1px solid var(--glass-border); cursor: pointer;" onclick="window.location.hash = '#streaks'">
            <div style="display:flex; align-items:center; gap: 10px;">
              <div style="color: var(--accent-yellow); display:flex;"><i data-lucide="trophy" style="width: 18px; height: 18px;"></i></div>
              <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">Achievements & Badges</span>
            </div>
            <div style="color: var(--text-tertiary);"><i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i></div>
          </div>

          <!-- Reset Profile Store Option -->
          <div class="setting-item btn-reset-store-row" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 8px; cursor: pointer;">
            <div style="display:flex; align-items:center; gap: 10px;">
              <div style="color: var(--accent-red); display:flex;"><i data-lucide="trash-2" style="width: 18px; height: 18px;"></i></div>
              <span style="font-size: 0.85rem; font-weight: 600; color: var(--accent-red);">Reset App Data</span>
            </div>
            <div style="color: var(--text-tertiary);"><i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i></div>
          </div>
        </div>

        <!-- Info tagline footer -->
        <p style="font-size: 0.7rem; color: var(--text-tertiary); text-align: center; margin: 0;">
          NutriVision AI v1.0.0 — Build #2026<br/>
          Made with ❤️ and Intelligent Neural Models
        </p>

        <div style="margin-top: 18px;">
          <button class="btn btn-danger btn-block btn-logout" style="height: 46px; font-size: 0.9rem;">
            <i data-lucide="log-out" style="width: 18px; height: 18px;"></i>
            Logout
          </button>
        </div>

      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Logout
    container.querySelector('.btn-logout')?.addEventListener('click', () => {
      store.logout();
      router.navigate('login', { transition: 'fade' });
      showToast({ message: 'Logged out', type: 'success' });
    });

    // Mount Canvas Line Chart
    const wtLabels = weightHistory.map(w => {
      const dNum = new Date(w.date + 'T12:00:00').getDate();
      const mNum = new Date(w.date + 'T12:00:00').getMonth() + 1;
      return `${mNum}/${dNum}`;
    });
    const wtValues = weightHistory.map(w => w.weight);

    if (weightChartInstance && typeof weightChartInstance.cleanup === 'function') {
      weightChartInstance.cleanup();
    }

    weightChartInstance = createLineChart({
      data: wtValues,
      labels: wtLabels,
      color: 'var(--accent-teal)',
      height: 140,
      animate: true,
      showDots: true,
      smooth: true
    });
    container.querySelector('#weight-chart-mount').appendChild(weightChartInstance);

    // Bind Edit Profile handler
    container.querySelector('.btn-edit-profile').addEventListener('click', () => {
      const editHtml = `
        <div style="padding: 4px 4px 16px 4px; display:flex; flex-direction:column; gap:16px;">
          <div class="input-group">
            <label style="font-size: 0.75rem; font-weight:700; color: var(--text-secondary); text-transform:uppercase; display:block; margin-bottom: 6px;">Your Name</label>
            <input type="text" class="input-field modal-profile-name" value="${profile.name}" style="width:100%; padding:12px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius-md); color:var(--text-primary);" />
          </div>
          <div class="input-group">
            <label style="font-size: 0.75rem; font-weight:700; color: var(--text-secondary); text-transform:uppercase; display:block; margin-bottom: 6px;">Height (cm)</label>
            <input type="number" class="input-field modal-profile-height" value="${profile.height || 175}" style="width:100%; padding:12px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius-md); color:var(--text-primary);" />
          </div>
          <button class="btn btn-primary btn-save-modal-profile" style="width:100%; padding:14px; font-size:0.95rem;">Save Changes</button>
        </div>
      `;

      const modal = showModal({
        title: 'Edit Personal Details',
        content: editHtml,
        onClose: () => {}
      });

      const modalEl = document.getElementById('modal-container');
      modalEl.querySelector('.btn-save-modal-profile').addEventListener('click', () => {
        const n = modalEl.querySelector('.modal-profile-name').value.trim();
        const h = parseInt(modalEl.querySelector('.modal-profile-height').value);
        
        if (n && h > 100 && h < 250) {
          store.setProfile({ name: n, height: h });
          showToast({ message: 'Profile updated successfully!', type: 'success' });
          modal.close();
        } else {
          showToast({ message: 'Please enter valid entries', type: 'error' });
        }
      });
    });

    // Configure daily targets
    container.querySelector('.btn-edit-goals').addEventListener('click', () => {
      const targetHtml = `
        <div style="padding: 4px 4px 16px 4px; display:flex; flex-direction:column; gap:12px; max-height: 380px; overflow-y:auto;">
          <div class="input-group">
            <label style="font-size: 0.7rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">Daily Calories (kcal)</label>
            <input type="number" class="input-field goal-c" value="${goals.calories}" style="width:100%; padding:10px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius-md); color:var(--text-primary);" />
          </div>
          <div class="input-group">
            <label style="font-size: 0.7rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">Protein (g)</label>
            <input type="number" class="input-field goal-p" value="${goals.protein}" style="width:100%; padding:10px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius-md); color:var(--text-primary);" />
          </div>
          <div class="input-group">
            <label style="font-size: 0.7rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">Carbohydrates (g)</label>
            <input type="number" class="input-field goal-ch" value="${goals.carbs}" style="width:100%; padding:10px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius-md); color:var(--text-primary);" />
          </div>
          <div class="input-group">
            <label style="font-size: 0.7rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">Fat (g)</label>
            <input type="number" class="input-field goal-f" value="${goals.fat}" style="width:100%; padding:10px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius-md); color:var(--text-primary);" />
          </div>
          <div class="input-group">
            <label style="font-size: 0.7rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">Water Target (ml)</label>
            <input type="number" class="input-field goal-w" value="${goals.water}" style="width:100%; padding:10px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius-md); color:var(--text-primary);" />
          </div>
          <button class="btn btn-primary btn-save-goals-modal" style="width:100%; padding:12px; margin-top:8px;">Update Targets</button>
        </div>
      `;

      const modal = showModal({
        title: 'Configure Daily Targets',
        content: targetHtml,
        onClose: () => {}
      });

      const modalEl = document.getElementById('modal-container');
      modalEl.querySelector('.btn-save-goals-modal').addEventListener('click', () => {
        const calVal = parseInt(modalEl.querySelector('.goal-c').value);
        const pVal = parseInt(modalEl.querySelector('.goal-p').value);
        const chVal = parseInt(modalEl.querySelector('.goal-ch').value);
        const fVal = parseInt(modalEl.querySelector('.goal-f').value);
        const wVal = parseInt(modalEl.querySelector('.goal-w').value);

        if (calVal > 500 && pVal > 10 && chVal > 10 && fVal > 5 && wVal > 200) {
          store.setGoals({ calories: calVal, protein: pVal, carbs: chVal, fat: fVal, water: wVal });
          showToast({ message: 'Nutrition targets successfully updated!', type: 'success' });
          modal.close();
        } else {
          showToast({ message: 'Please enter valid nutrition values', type: 'error' });
        }
      });
    });

    const saveAiKeyBtn = container.querySelector('.btn-save-ai-key');
    const clearAiKeyBtn = container.querySelector('.btn-clear-ai-key');
    const aiKeyInput = container.querySelector('.profile-openai-key');

    if (saveAiKeyBtn && aiKeyInput) {
      saveAiKeyBtn.addEventListener('click', () => {
        let key = aiKeyInput.value.trim();
        if (key.startsWith('••••')) {
          showToast({ message: 'Enter your full API key (sk-...)', type: 'info' });
          return;
        }
        if (!key.startsWith('sk-')) {
          showToast({ message: 'Invalid key format. Should start with sk-', type: 'error' });
          return;
        }
        setOpenAiApiKey(key);
        showToast({ message: 'AI Vision enabled! Scan food for accurate results.', type: 'success' });
        updateProfileView();
      });
      aiKeyInput.addEventListener('focus', () => {
        if (aiKeyInput.value.startsWith('••••')) aiKeyInput.value = '';
      });
    }

    if (clearAiKeyBtn) {
      clearAiKeyBtn.addEventListener('click', () => {
        setOpenAiApiKey('');
        showToast({ message: 'API key removed', type: 'info' });
        updateProfileView();
      });
    }

    // Theme Toggle Click Row
    container.querySelector('#toggle-theme-row').addEventListener('click', () => {
      theme.toggle();
      updateProfileView();
      showToast({ message: `Switched to ${theme.getCurrent()} mode!`, type: 'info', duration: 1000 });
    });

    // Reset store data
    container.querySelector('.btn-reset-store-row').addEventListener('click', () => {
      if (confirm('Are you absolutely sure you want to reset all data and history? This action is permanent.')) {
        store.resetState();
        showToast({ message: 'App reset successfully!', type: 'warning' });
        router.navigate('onboarding', { transition: 'fade' });
      }
    });

    // Log Weight trigger
    container.querySelector('.btn-log-weight-profile').addEventListener('click', () => {
      const curWeight = profile.weight || 70;
      const contentHtml = `
        <div style="padding: 8px 4px 16px 4px;">
          <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 8px;">Enter current weight in kg</label>
          <div class="input-group" style="display: flex; gap: 8px;">
            <input type="number" step="0.1" class="input-field weight-custom-input" placeholder="${curWeight}" value="${curWeight}" style="flex:1; padding: 12px 16px; background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); font-size: 1rem;" />
            <button class="btn btn-primary btn-save-custom-weight" style="padding: 0 20px; font-size:0.9rem;">Log</button>
          </div>
        </div>
      `;
      
      const modal = showModal({
        title: 'Log Weight Progress',
        content: contentHtml,
        onClose: () => {}
      });

      const modalEl = document.getElementById('modal-container');
      const saveBtn = modalEl.querySelector('.btn-save-custom-weight');
      const input = modalEl.querySelector('.weight-custom-input');

      saveBtn.addEventListener('click', () => {
        const wt = parseFloat(input.value);
        if (wt && wt > 20 && wt < 300) {
          store.logWeight(wt);
          store.setProfile({ weight: wt });
          showToast({ message: `Weight logged: ${wt} kg! ⚖️`, type: 'success' });
          modal.close();
        } else {
          showToast({ message: 'Please enter a valid weight between 20 and 300 kg', type: 'error' });
        }
      });
    });
  }

  // Draw Profile
  updateProfileView();

  unsubscribeStore = store.subscribe(() => {
    if (router.getCurrentRoute() === 'profile') {
      updateProfileView();
    }
  });
}

export function onEnter() {
  // Sync
}

export function onLeave() {
  if (unsubscribeStore) {
    unsubscribeStore();
    unsubscribeStore = null;
  }
  if (weightChartInstance && typeof weightChartInstance.cleanup === 'function') {
    weightChartInstance.cleanup();
  }
}
