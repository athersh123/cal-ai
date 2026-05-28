// streaks.js — Gamification view featuring streak counters achievements grids and milestones
import { store } from '../store.js';
import { router } from '../router.js';
import { achievements } from '../data/achievements.js';
import { motivationalMessages } from '../data/tips.js';
import { showModal } from '../components/modal.js';

export function render(container) {
  
  function getMotivationalQuote() {
    const quoteIndex = Math.floor(Math.random() * motivationalMessages.length);
    return motivationalMessages[quoteIndex] || 'Your health is an investment, not an expense.';
  }

  function getBadgeStatus(badgeId) {
    const unlocked = store.getUnlockedAchievements();
    const found = unlocked.find(a => a.id === badgeId);
    return found ? { unlocked: true, date: found.unlockedAt } : { unlocked: false };
  }

  function updateStreaksView() {
    const state = store.getState();
    const streak = store.getStreak();
    const unlockedList = store.getUnlockedAchievements();
    
    // Pick daily challenge based on day
    const dayIndex = new Date().getDay();
    const challenges = [
      { text: 'Drink 2,000ml of water today', target: 2000, current: store.getWater(), unit: 'ml', icon: 'droplets', key: 'water' },
      { text: 'Log 3 meals into your diary', target: 3, current: Object.values(store.getTodayMeals()).flat().length, unit: 'items', icon: 'utensils', key: 'meals' },
      { text: 'Stay under your calorie target', target: state.goals.calories, current: store.getTodayTotals().calories, unit: 'kcal', icon: 'target', key: 'calories', isUnder: true },
      { text: 'Hit your protein goal', target: state.goals.protein, current: store.getTodayTotals().protein, unit: 'g', icon: 'sparkles', key: 'protein' }
    ];

    const activeChallenge = challenges[dayIndex % challenges.length];
    let isChallengeCompleted = false;

    if (activeChallenge.isUnder) {
      isChallengeCompleted = activeChallenge.current > 0 && activeChallenge.current <= activeChallenge.target;
    } else {
      isChallengeCompleted = activeChallenge.current >= activeChallenge.target;
    }

    container.innerHTML = `
      <div class="streaks-screen animate-fadeIn" style="padding: 20px 16px 40px 16px;">
        
        <!-- Header -->
        <div style="margin-bottom: 24px;">
          <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Gamification</span>
          <h1 class="font-display" style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin:0;">Streaks & Awards</h1>
        </div>

        <!-- Giant Flame Hero section -->
        <div class="streaks-hero card glass-card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 28px 24px; text-align: center; margin-bottom: 20px; position:relative; overflow:hidden;">
          <div class="glow-bg" style="position: absolute; width: 180px; height: 180px; background: radial-gradient(circle, rgba(225, 112, 85, 0.2) 0%, rgba(0,0,0,0) 70%); pointer-events: none; z-index:1;"></div>
          
          <span class="streaks-flame animate-float" style="font-size: 5rem; margin-bottom: 12px; display:inline-block; filter: drop-shadow(0 15px 30px rgba(225, 112, 85, 0.4));">🔥</span>
          <h2 class="font-display" style="font-size: 3rem; font-weight: 900; color: var(--text-primary); line-height: 1.1; margin:0;">
            ${streak.current || 0}
          </h2>
          <p style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 4px 0 0 0;">
            Day Streak
          </p>
          
          <div style="display: flex; gap: 8px; margin-top: 16px; font-size: 0.75rem; color: var(--text-secondary); background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); padding: 6px 12px; border-radius: var(--radius-full); z-index:2;">
            <span>Best Streak: <strong>${streak.best || 0} days</strong></span>
          </div>
        </div>

        <!-- AI Motivation quote box -->
        <div class="streaks-message card glass-card" style="display:flex; gap:12px; align-items:center; padding: 14px 16px; margin-bottom: 20px; border-left: 4px solid var(--accent-pink);">
          <span style="color: var(--accent-pink); font-size: 1.25rem;">✨</span>
          <p style="font-size: 0.8rem; color: var(--text-secondary); font-style:italic; line-height: 1.45; margin:0;">
            "${getMotivationalQuote()}"
          </p>
        </div>

        <!-- Daily Challenge Box -->
        <div class="streaks-challenge card glass-card" style="padding: 16px; border: 1.5px solid ${isChallengeCompleted ? 'var(--accent-teal)' : 'var(--glass-border)'}; margin-bottom: 24px; position:relative; overflow:hidden;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
            <span style="font-size:0.7rem; font-weight: 700; color: ${isChallengeCompleted ? 'var(--accent-teal)' : 'var(--text-secondary)'}; text-transform: uppercase; display:flex; align-items:center; gap: 4px;">
              <i data-lucide="${isChallengeCompleted ? 'check' : 'zap'}" style="width:12px; height:12px;"></i> Daily Challenge
            </span>
            ${isChallengeCompleted ? `<span class="badge" style="background: rgba(0, 206, 201, 0.15); color: var(--accent-teal); font-size:0.65rem; font-weight:700; padding:2px 6px; border-radius: var(--radius-full);">COMPLETED</span>` : ''}
          </div>
          
          <h4 class="font-display" style="font-size: 0.9rem; font-weight: 750; color: var(--text-primary); margin:0 0 10px 0;">
            ${activeChallenge.text}
          </h4>

          <!-- Challenge indicator progress -->
          <div style="display:flex; align-items:center; gap: 10px;">
            <div style="flex:1; height: 5px; background: rgba(255,255,255,0.06); border-radius:10px; overflow:hidden;">
              <div style="width: ${isChallengeCompleted ? 100 : Math.min(Math.round((activeChallenge.current / activeChallenge.target) * 100), 100)}%; height: 100%; background: ${isChallengeCompleted ? 'var(--gradient-protein)' : 'var(--gradient-calories)'}; border-radius:10px;"></div>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-secondary); font-weight:600; white-space:nowrap;">
              ${activeChallenge.current} / ${activeChallenge.target} ${activeChallenge.unit}
            </span>
          </div>
        </div>

        <!-- Achievements Badge Grid -->
        <div style="margin-bottom: 24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px;">
            <h3 class="font-display" style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin:0;">Achievements</h3>
            <span style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 600;">${unlockedList.length} / ${achievements.length} Unlocked</span>
          </div>

          <div class="streaks-badges-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            ${achievements.map(a => {
              const status = getBadgeStatus(a.id);
              const colorMap = { gold: '#f39c12', silver: '#bdc3c7', bronze: '#cd7f32' };
              const tierColor = colorMap[a.tier] || '#6c5ce7';

              return `
                <div class="card glass-card badge-item" data-badge-id="${a.id}" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px 8px; text-align: center; cursor: pointer; border: 1.5px solid ${status.unlocked ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)'}; opacity: ${status.unlocked ? '1' : '0.45'}; transition: all var(--transition-fast);">
                  <div class="badge-icon-circle" style="width: 46px; height: 46px; border-radius: 50%; background: ${status.unlocked ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)'}; display:flex; align-items:center; justify-content:center; font-size: 1.6rem; margin-bottom: 8px; border: 1.5px solid ${status.unlocked ? tierColor : 'rgba(255,255,255,0.05)'}; box-shadow: ${status.unlocked ? `0 4px 15px ${tierColor}30` : 'none'}; position:relative;">
                    ${status.unlocked ? a.icon : '🔒'}
                  </div>
                  <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-primary); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:80px; margin-bottom:2px;">${a.name}</span>
                  <span style="font-size: 0.6rem; color: var(--text-secondary); text-transform:uppercase; font-weight:700; letter-spacing:0.3px;">${a.tier}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Attach click listeners to achievements for modal details
    container.querySelectorAll('.badge-item').forEach(item => {
      item.addEventListener('click', () => {
        const bId = item.getAttribute('data-badge-id');
        const badge = achievements.find(a => a.id === bId);
        const status = getBadgeStatus(bId);

        if (!badge) return;

        const detailHtml = `
          <div style="text-align: center; padding: 12px 16px 24px 16px;">
            <div style="font-size: 3.5rem; margin-bottom: 16px;">
              ${status.unlocked ? badge.icon : '🔒'}
            </div>
            
            <h3 class="font-display" style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">
              ${badge.name}
            </h3>
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: ${badge.tier === 'gold' ? '#f39c12' : badge.tier === 'silver' ? '#bdc3c7' : '#cd7f32'}; margin-bottom: 16px; display:block;">
              ${badge.tier} Tier Medal
            </span>

            <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0 auto 24px auto; max-width: 250px; line-height: 1.5;">
              ${badge.description}
            </p>

            ${status.unlocked ? `
              <div style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 16px; background: rgba(0, 206, 201, 0.08); border: 1px solid rgba(0, 206, 201, 0.2); border-radius: var(--radius-full); color: var(--accent-teal); font-size: 0.75rem; font-weight:700;">
                <i data-lucide="check" style="width: 14px; height: 14px;"></i> Unlocked on ${status.date}
              </div>
            ` : `
              <div style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-full); color: var(--text-secondary); font-size: 0.75rem; font-weight:700;">
                Locked
              </div>
            `}
          </div>
        `;

        showModal({
          title: 'Achievement Details',
          content: detailHtml,
          onClose: () => {}
        });
      });
    });
  }

  updateStreaksView();
}
