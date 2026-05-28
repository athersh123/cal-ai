// diary.js — Timeline-based daily tracker with meal sections and search modals
import { store } from '../store.js';
import { router } from '../router.js';
import { createFoodCard } from '../components/food-card.js';
import { showToast } from '../components/toast.js';
import { showModal } from '../components/modal.js';
import { foodDatabase, recognizeFood } from '../data/food-db.js';

let selectedDate = new Date().toISOString().split('T')[0];
let unsubscribeStore = null;

export function render(container) {
  
  function getDayLabel(daysAgo) {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
  }

  function getDayNameAbbr(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return dayNames[d.getDay()];
  }

  function updateDiaryView() {
    const state = store.getState();
    const dayTotals = store.getDayTotals(selectedDate);
    const goals = store.getGoals();
    const meals = store.getMeals(selectedDate);

    const calPercent = Math.min(Math.round((dayTotals.calories / goals.calories) * 100), 100);

    // List of 7 days (today + last 6 days)
    const datePillsHtml = [];
    for (let i = 6; i >= 0; i--) {
      const dateStr = getDayLabel(i);
      const isSelected = dateStr === selectedDate;
      const isToday = dateStr === new Date().toISOString().split('T')[0];
      const dNum = new Date(dateStr + 'T12:00:00').getDate();

      datePillsHtml.push(`
        <button class="date-pill ${isSelected ? 'active' : ''}" data-date="${dateStr}" style="flex-shrink: 0; width: 50px; height: 68px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: var(--radius-md); border: 1px solid ${isSelected ? 'var(--accent-pink)' : 'var(--glass-border)'}; background: ${isSelected ? 'var(--gradient-calories)' : 'rgba(255,255,255,0.02)'}; color: ${isSelected ? 'white' : 'var(--text-secondary)'}; transition: all var(--transition-fast);">
          <span style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">${getDayNameAbbr(dateStr)}</span>
          <span class="font-display" style="font-size: 1.15rem; font-weight: 800; color: ${isSelected ? 'white' : 'var(--text-primary)'};">${dNum}</span>
          ${isToday && !isSelected ? `<div style="width: 4px; height: 4px; border-radius: 50%; background: var(--accent-pink); margin-top: 3px;"></div>` : ''}
        </button>
      `);
    }

    container.innerHTML = `
      <div class="diary-screen animate-fadeIn" style="padding: 20px 16px 0 16px;">
        
        <!-- Header -->
        <div class="section-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <div>
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Diary</span>
            <h1 class="font-display" style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin:0;">Daily Log</h1>
          </div>
          
          <button class="btn-scan-fab" style="width: 38px; height: 38px; border-radius: 50%; background: var(--gradient-primary); color: white; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-glow);">
            <i data-lucide="camera" style="width: 16px; height: 16px;"></i>
          </button>
        </div>

        <!-- Date Selector list -->
        <div class="diary-date-selector scroll-horizontal" style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 20px; -webkit-overflow-scrolling: touch;">
          ${datePillsHtml.join('')}
        </div>

        <!-- Day totals summary box -->
        <div class="card glass-card" style="padding: 16px; margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 0.8rem; color: var(--text-secondary); font-weight: 600;">Calorie Target Progress</span>
            <span class="font-display" style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary);">${dayTotals.calories} / ${goals.calories} kcal</span>
          </div>
          <div class="progress-bar-bg" style="width:100%; height: 6px; background: rgba(255,255,255,0.06); border-radius: var(--radius-full); overflow:hidden;">
            <div class="progress-bar-fill" style="width: ${calPercent}%; height: 100%; background: var(--gradient-calories); border-radius: var(--radius-full); transition: width 0.5s ease;"></div>
          </div>
        </div>

        <!-- Meal sections list -->
        <div class="diary-meals-list" style="display: flex; flex-direction: column; gap: 20px; padding-bottom: 110px;">
          ${['breakfast', 'lunch', 'dinner', 'snacks'].map(type => {
            const sectionMeals = meals[type] || [];
            let sectionCal = 0;
            sectionMeals.forEach(f => { sectionCal += f.calories; });
            
            const emojis = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snacks: '🍿' };

            return `
              <div class="diary-meal-section" data-meal-type="${type}">
                <div class="diary-meal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid var(--glass-border); padding-bottom: 8px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.25rem;">${emojis[type]}</span>
                    <div>
                      <h3 class="font-display" style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin:0; text-transform: capitalize;">${type}</h3>
                      <span style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 600;">${sectionCal} kcal</span>
                    </div>
                  </div>
                  
                  <button class="btn-add-food-section" data-type="${type}" style="width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; color: var(--text-primary); transition: all var(--transition-fast);">
                    <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
                  </button>
                </div>
                
                <div class="diary-meal-items-container-${type}">
                  <!-- Dynamic cards -->
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Sticky Bottom Totals bar -->
        <div class="diary-total glass-card" style="position: fixed; bottom: calc(var(--nav-height) + 12px); left: 50%; transform: translateX(-50%); width: calc(100% - 32px); max-width: 398px; z-index: 10; display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; border-radius: var(--radius-xl); box-shadow: 0 10px 30px rgba(0,0,0,0.3); background: rgba(18, 18, 26, 0.85); backdrop-filter: blur(24px); border: 1px solid var(--glass-border);">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 600;">DAILY TOTALS</span>
            <div style="display:flex; gap: 10px; margin-top: 4px;">
              <span class="font-display" style="font-size: 0.8rem; font-weight: 700; color: var(--accent-teal);">P: ${dayTotals.protein}g</span>
              <span class="font-display" style="font-size: 0.8rem; font-weight: 700; color: var(--accent-yellow);">C: ${dayTotals.carbs}g</span>
              <span class="font-display" style="font-size: 0.8rem; font-weight: 700; color: var(--accent-purple-light);">F: ${dayTotals.fat}g</span>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 600; display:block;">CONSUMED</span>
            <span class="font-display" style="font-size: 1.15rem; font-weight: 800; color: var(--accent-pink);">${dayTotals.calories} <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">kcal</span></span>
          </div>
        </div>

      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Append food card items dynamically
    ['breakfast', 'lunch', 'dinner', 'snacks'].forEach(type => {
      const parent = container.querySelector(`.diary-meal-items-container-${type}`);
      const sectionMeals = meals[type] || [];

      if (sectionMeals.length === 0) {
        parent.innerHTML = `
          <p style="font-size: 0.75rem; color: var(--text-tertiary); margin: 0; padding: 4px 8px; font-style: italic;">No items logged. Tap + to search.</p>
        `;
      } else {
        sectionMeals.forEach(food => {
          const card = createFoodCard({
            food,
            showDelete: true,
            onDelete: (mealId) => {
              store.removeMeal(selectedDate, type, mealId);
              showToast({ message: 'Item removed from diary', type: 'info', duration: 1500 });
            }
          });
          parent.appendChild(card);
        });
      }
    });

    // Date Switch actions
    container.querySelectorAll('.date-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        selectedDate = pill.getAttribute('data-date');
        updateDiaryView();
      });
    });

    // Quick camera navigation
    container.querySelector('.btn-scan-fab').addEventListener('click', () => {
      router.navigate('scanner', { transition: 'slide-up' });
    });

    // Bind Add Food Buttons
    container.querySelectorAll('.btn-add-food-section').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');
        openSearchFoodModal(type);
      });
    });
  }

  function openSearchFoodModal(mealType) {
    const contentHtml = `
      <div style="padding: 0 4px 16px 4px;">
        <!-- Search bar input -->
        <div class="input-group" style="display: flex; align-items: center; background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 8px 12px; margin-bottom: 16px; gap: 8px;">
          <i data-lucide="search" style="width: 16px; height: 16px; color: var(--text-secondary);"></i>
          <input type="text" class="modal-search-input" placeholder="Search foods... (e.g. apple, salmon, burger)" style="flex:1; border:none; background:transparent; outline:none; color: var(--text-primary); font-size: 0.85rem;" />
        </div>

        <div style="max-height: 250px; overflow-y: auto;" class="search-results-list">
          <p style="font-size: 0.75rem; color: var(--text-secondary); margin:0; text-align: center; padding: 12px 0;">Start typing to search the food database...</p>
        </div>
      </div>
    `;

    const modal = showModal({
      title: `Log ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`,
      content: contentHtml,
      onClose: () => {}
    });

    const modalEl = document.getElementById('modal-container');
    const input = modalEl.querySelector('.modal-search-input');
    const resultsContainer = modalEl.querySelector('.search-results-list');

    if (window.lucide) {
      window.lucide.createIcons();
    }

    input.focus();

    input.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      if (!q) {
        resultsContainer.innerHTML = '<p style="font-size: 0.75rem; color: var(--text-secondary); margin:0; text-align: center; padding: 12px 0;">Start typing to search...</p>';
        return;
      }

      const matches = recognizeFood(q);
      if (matches.length === 0) {
        resultsContainer.innerHTML = '<p style="font-size: 0.75rem; color: var(--text-secondary); margin:0; text-align: center; padding: 12px 0;">No matching foods found. Try "chicken", "apple", or "rice".</p>';
      } else {
        resultsContainer.innerHTML = '';
        matches.forEach(food => {
          const item = document.createElement('div');
          item.className = 'card';
          item.style.display = 'flex';
          item.style.alignItems = 'center';
          item.style.justifyContent = 'space-between';
          item.style.padding = '10px 12px';
          item.style.marginBottom = '8px';
          item.style.cursor = 'pointer';
          item.style.background = 'rgba(255,255,255,0.02)';
          item.style.border = '1px solid var(--glass-border)';

          item.innerHTML = `
            <div style="display:flex; align-items:center; gap: 10px;">
              <span style="font-size: 1.4rem;">${food.icon || '🍲'}</span>
              <div>
                <h4 style="font-size: 0.85rem; font-weight:600; color: var(--text-primary); margin:0;">${food.name}</h4>
                <span style="font-size: 0.7rem; color: var(--text-secondary);">${food.serving} ${food.servingUnit}</span>
              </div>
            </div>
            <div style="text-align: right; display:flex; align-items:center; gap: 12px;">
              <span class="font-display" style="font-size: 0.85rem; font-weight:700; color: var(--accent-pink);">${food.calories} kcal</span>
              <div style="color: var(--accent-teal);"><i data-lucide="plus" style="width: 14px; height:14px;"></i></div>
            </div>
          `;
          
          item.addEventListener('click', () => {
            store.addMeal(selectedDate, mealType, [food]);
            showToast({ message: `Added ${food.name} to ${mealType}!`, type: 'success', duration: 1500 });
            modal.close();
          });

          resultsContainer.appendChild(item);
        });

        if (window.lucide) {
          window.lucide.createIcons();
        }
      }
    });
  }

  // Draw view
  updateDiaryView();

  // Sub for updates
  unsubscribeStore = store.subscribe(() => {
    if (router.getCurrentRoute() === 'diary') {
      updateDiaryView();
    }
  });
}

export function onEnter() {
  // Sync view
}

export function onLeave() {
  if (unsubscribeStore) {
    unsubscribeStore();
    unsubscribeStore = null;
  }
}
