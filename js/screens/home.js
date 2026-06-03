// home.js — Dashboard featuring custom progress rings, water tracking, and smart tips
import { store } from '../store.js';
import { router } from '../router.js';
import { createProgressRing } from '../components/progress-ring.js';
import { createWaterTracker } from '../components/water-tracker.js';
import { showModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
let unsubscribeStore = null;

export function render(container) {
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 21) return 'Good evening';
    return 'Good night';
  }


  async function updateDashboard() {
    const goals   = store.getGoals();
    const profile = store.getProfile();
    const streak  = store.getStreak();
    const state   = store.getState();
    const displayName = profile.name || state.session || 'there';

    // ── Fetch TODAY's meals from MySQL (server filters by CURDATE()) ────
    let dbMeals = [];
    let totals  = { calories: 0, protein: 0, carbs: 0, fat: 0 };

    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser?.id) {
        const res = await fetch(`http://localhost:5000/meals/${currentUser.id}/today`);
        dbMeals   = await res.json();
        if (!Array.isArray(dbMeals)) dbMeals = [];

        dbMeals.forEach(m => {
          totals.calories += Number(m.calories || 0);
          totals.protein  += Number(m.protein  || 0);
          totals.carbs    += Number(m.carbs    || 0);
          totals.fat      += Number(m.fat      || 0);
        });
        totals.calories = Math.round(totals.calories);
        totals.protein  = Math.round(totals.protein);
        totals.carbs    = Math.round(totals.carbs);
        totals.fat      = Math.round(totals.fat);
        console.log('[Home] Today totals from DB:', totals, '| meals count:', dbMeals.length);
      }
    } catch (e) {
      console.warn('[Home] DB fetch failed, using store fallback:', e.message);
      totals = store.getTodayTotals();
    }


    const remainingCal = Math.max(goals.calories - totals.calories, 0);
    

        container.innerHTML = `
      <div class="nv-home home-screen animate-fadeIn">
        
        <div class="nv-home-hero nv-glass nv-glow-border">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <p class="nv-home-greeting">${getGreeting()}</p>
            <div style="display:flex;gap:8px;">
              <div class="nv-stat-pill" style="cursor:pointer;" onclick="window.location.hash='#streaks'">🔥 ${streak.current || 0}</div>
              <div class="nv-stat-pill" style="width:36px;height:36px;padding:0;justify-content:center;cursor:pointer;background:var(--gradient-primary);border:none;" onclick="window.location.hash='#profile'">${(displayName)[0].toUpperCase()}</div>
            </div>
          </div>
          <h1 class="nv-home-title">Hey <span>${displayName}</span></h1>
          <p style="font-size:0.82rem;color:var(--text-secondary);margin:0;line-height:1.5;">${remainingCal > 0 ? `${remainingCal} kcal left today` : 'Daily goal reached! 🎉'}</p>
        </div>

        <!-- Main Calorie Progress Ring Section -->
        <div class="calorie-ring-section nv-glass" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 20px; margin-bottom: 20px; text-align: center; position: relative; overflow: hidden;">
          <div class="glow-bg" style="position: absolute; top: -50px; left: 50%; transform: translateX(-50%); width: 250px; height: 250px; background: radial-gradient(circle, rgba(253, 121, 168, 0.15) 0%, rgba(0,0,0,0) 70%); pointer-events: none; z-index: 1;"></div>
          <div id="main-calorie-ring-mount" style="position: relative; z-index: 2; margin-bottom: 16px;"></div>
          <div style="z-index: 2; display: flex; gap: 24px; margin-top: 8px; width: 100%; border-top: 1px solid var(--glass-border); padding-top: 16px;">
            <div style="flex:1;">
              <span style="font-size: 0.75rem; color: var(--text-secondary); display: block; margin-bottom: 2px;">Logged</span>
              <span class="font-display" style="font-size: 1.15rem; font-weight: 800; color: var(--accent-pink);">${totals.calories} <span style="font-size:0.75rem; font-weight:500; color:var(--text-secondary);">kcal</span></span>
            </div>
            <div style="width: 1px; background: var(--glass-border);"></div>
            <div style="flex:1;">
              <span style="font-size: 0.75rem; color: var(--text-secondary); display: block; margin-bottom: 2px;">Daily Goal</span>
              <span class="font-display" style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">${goals.calories} <span style="font-size:0.75rem; font-weight:500; color:var(--text-secondary);">kcal</span></span>
            </div>
          </div>
        </div>

        <!-- Macro Rings Row -->
        <div class="nv-macro-grid macro-rings-row">
          <div class="nv-macro-tile nv-macro-tile--protein nv-glass" style="display: flex; flex-direction: column; align-items: center; padding: 16px 8px;">
            <div id="protein-ring-mount" style="margin-bottom: 8px;"></div>
            <span style="font-size: 0.7rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase;">Protein</span>
            <span class="font-display" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-teal); margin-top: 2px;">${totals.protein}g / ${goals.protein}g</span>
          </div>
          <div class="nv-macro-tile nv-macro-tile--carbs nv-glass" style="display: flex; flex-direction: column; align-items: center; padding: 16px 8px;">
            <div id="carbs-ring-mount" style="margin-bottom: 8px;"></div>
            <span style="font-size: 0.7rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase;">Carbs</span>
            <span class="font-display" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-yellow); margin-top: 2px;">${totals.carbs}g / ${goals.carbs}g</span>
          </div>
          <div class="nv-macro-tile nv-macro-tile--fat nv-glass" style="display: flex; flex-direction: column; align-items: center; padding: 16px 8px;">
            <div id="fat-ring-mount" style="margin-bottom: 8px;"></div>
            <span style="font-size: 0.7rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase;">Fats</span>
            <span class="font-display" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-purple-light); margin-top: 2px;">${totals.fat}g / ${goals.fat}g</span>
          </div>
        </div>

      

        <!-- Quick Actions Panel -->
        <div style="margin-bottom: 24px;">
          <h3 class="font-display" style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 12px;">Quick Log</h3>
          <div class="nv-quick-grid">
            <button class="nv-quick-btn nv-glass btn-action-log" data-action="scan">
              <div class="nv-quick-icon" style="background:rgba(253,121,168,0.15);color:var(--accent-pink);"><i data-lucide="camera" style="width:20px;height:20px;"></i></div>
              <span style="font-size:0.75rem;font-weight:600;color:var(--text-primary);">Scan Food</span>
            </button>
            <button class="nv-quick-btn nv-glass btn-action-log" data-action="water">
              <div class="nv-quick-icon" style="background:rgba(9,132,227,0.15);color:var(--accent-blue);"><i data-lucide="droplets" style="width:20px;height:20px;"></i></div>
              <span style="font-size:0.75rem;font-weight:600;color:var(--text-primary);">Water</span>
            </button>
            <button class="nv-quick-btn nv-glass btn-action-log" data-action="weight">
              <div class="nv-quick-icon" style="background:rgba(0,206,201,0.15);color:var(--accent-teal);"><i data-lucide="scale" style="width:20px;height:20px;"></i></div>
              <span style="font-size:0.75rem;font-weight:600;color:var(--text-primary);">Weight</span>
            </button>
          </div>
        </div>

        <!-- Today's Meals Section -->
        <div class="today-meals-section" style="margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 class="font-display" style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin:0;">Today's Meals</h3>
            <button style="font-size: 0.75rem; font-weight: 600; color: var(--accent-pink); padding: 4px 8px;" onclick="window.location.hash = '#diary'">See Diary</button>
          </div>
          <div class="today-meals-list" style="display: flex; flex-direction: column; gap: 8px;">
            <!-- Appended dynamically -->
          </div>
        </div>

        <!-- Water Tracker Widget Widget Mount -->
        <div id="water-tracker-mount" style="margin-bottom: 32px;"></div>
      </div>
    `;

    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Mount Calorie Progress Rings
    const calorieRing = createProgressRing({
      value: totals.calories,
      max: goals.calories,
      size: 180,
      strokeWidth: 12,
      gradientColors: ['#fd79a8', '#e17055'],
      label: remainingCal,
      sublabel: 'kcal left',
      showPercentage: false,
      animate: true
    });
    container.querySelector('#main-calorie-ring-mount').appendChild(calorieRing);

    // Mount smaller macro progress rings
    const proteinRing = createProgressRing({
      value: totals.protein,
      max: goals.protein,
      size: 60,
      strokeWidth: 6,
      gradientColors: ['#00cec9', '#55efc4'],
      showPercentage: true,
      animate: true
    });
    container.querySelector('#protein-ring-mount').appendChild(proteinRing);

    const carbsRing = createProgressRing({
      value: totals.carbs,
      max: goals.carbs,
      size: 60,
      strokeWidth: 6,
      gradientColors: ['#fdcb6e', '#f39c12'],
      showPercentage: true,
      animate: true
    });
    container.querySelector('#carbs-ring-mount').appendChild(carbsRing);

    const fatRing = createProgressRing({
      value: totals.fat,
      max: goals.fat,
      size: 60,
      strokeWidth: 6,
      gradientColors: ['#6c5ce7', '#a29bfe'],
      showPercentage: true,
      animate: true
    });
    container.querySelector('#fat-ring-mount').appendChild(fatRing);

    // Render compact list of today's meals from DB
    const mealsList = container.querySelector('.today-meals-list');

    // Build flat list from DB meals (show today's meals by meal_type)
    const flatMeals = dbMeals.map(m => ({
      name:     m.food_name,
      calories: Number(m.calories || 0),
      mealType: m.meal_type,
      icon:     m.icon || '🍲'
    }));

    if (flatMeals.length === 0) {
      mealsList.innerHTML = `
        <div class="card glass-card" style="padding: 28px 20px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; border: 1px dashed rgba(253,121,168,0.3); background: rgba(253,121,168,0.03);">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(253,121,168,0.12); display: flex; align-items: center; justify-content: center; font-size: 1.75rem;">
            📸
          </div>
          <div>
            <p class="font-display" style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px;">No meals logged today</p>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin: 0; line-height: 1.5;">Scan your food with AI to instantly get<br/>calories, protein, carbs &amp; fat.</p>
          </div>
          <button class="btn-empty-scan" style="padding: 10px 24px; border-radius: var(--radius-full); background: var(--gradient-primary); color: white; font-size: 0.82rem; font-weight: 700; border: none; cursor: pointer; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="camera" style="width: 14px; height: 14px;"></i> Scan First Meal
          </button>
        </div>
      `;
      const emptyBtn = mealsList.querySelector('.btn-empty-scan');
      if (emptyBtn) {
        emptyBtn.addEventListener('click', () => router.navigate('scanner', { transition: 'slide-up' }));
      }
      if (window.lucide) window.lucide.createIcons();

    } else {
      flatMeals.slice(0, 3).forEach(f => {
        const item = document.createElement('div');
        item.className = 'card glass-card';
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.justifyContent = 'space-between';
        item.style.padding = '12px 16px';
        
        item.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
            <span style="font-size: 1.4rem;">${f.icon || '🍲'}</span>
            <div style="min-width:0;">
              <h4 class="font-display" style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin:0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 160px;">${f.name}</h4>
              <span style="font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase;">${f.mealType}</span>
            </div>
          </div>
          <span class="font-display" style="font-size: 0.9rem; font-weight: 700; color: var(--accent-pink);">${f.calories} kcal</span>
        `;
        mealsList.appendChild(item);
      });

      if (flatMeals.length > 3) {
        const moreBtn = document.createElement('button');
        moreBtn.className = 'btn btn-ghost btn-sm';
        moreBtn.style.color = 'var(--text-secondary)';
        moreBtn.style.fontSize = '0.75rem';
        moreBtn.style.textAlign = 'center';
        moreBtn.style.padding = '4px 0';
        moreBtn.textContent = `+ ${flatMeals.length - 3} more items in your diary`;
        moreBtn.addEventListener('click', () => { router.navigate('diary'); });
        mealsList.appendChild(moreBtn);
      }
    }

    // Mount Water Tracker Widget
    const waterTracker = createWaterTracker({
      current: store.getWater(),
      goal: goals.water,
      onAdd: (ml) => {
        store.addWater(ml);
        showToast({ message: `Logged +${ml}ml water! 💧`, type: 'success', duration: 1500 });
      }
    });
    container.querySelector('#water-tracker-mount').appendChild(waterTracker);

    // Bind Quick Action clicks
    container.querySelectorAll('.btn-action-log').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        if (action === 'scan') {
          router.navigate('scanner', { transition: 'slide-up' });
        } else if (action === 'water') {
          // Log standard glass
          store.addWater(250);
          showToast({ message: 'Added 250ml water! 💧', type: 'success', duration: 1500 });
        } else if (action === 'weight') {
          // Log weight modal
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
              showToast({ message: `Successfully logged weight: ${wt} kg! ⚖️`, type: 'success' });
              modal.close();
            } else {
              showToast({ message: 'Please enter a valid weight between 20 and 300 kg', type: 'error' });
            }
          });
        }
      });
    });
  }

  // Draw dashboard initially
  updateDashboard();

  // Re-render when store changes (fires after store.addMeal from scanner)
  unsubscribeStore = store.subscribe(() => {
    if (router.getCurrentRoute() === 'home') {
      updateDashboard();
    }
  });
}

export function onEnter() {
  // Check streaks
  store.updateStreak();
}

export function onLeave() {
  if (unsubscribeStore) {
    unsubscribeStore();
    unsubscribeStore = null;
  }
}
