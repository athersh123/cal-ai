// analytics.js — Analytical visualization representing calorie bars, macros, and streak matrices
import { store } from '../store.js';
import { router } from '../router.js';
import { createBarChart } from '../components/chart.js';

let activeTab = 'week'; // 'week' | 'month'
let chartInstance = null;

export function render(container) {
  
  function updateAnalyticsView() {
    const state = store.getState();
    const goals = store.getGoals();
    const weekData = store.getWeekData();
    const monthData = store.getMonthData();
    const streak = store.getStreak();
    const hasData = store.hasAnyData(30);

    // Show empty state if no real food data exists
    if (!hasData) {
      container.innerHTML = `
        <div class="analytics-screen animate-fadeIn" style="padding: 20px 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70vh; gap: 0;">
          <div style="text-align: center; padding: 20px;">
            <div style="width: 100px; height: 100px; border-radius: 50%; background: rgba(253,121,168,0.1); display: flex; align-items: center; justify-content: center; font-size: 3rem; margin: 0 auto 24px; border: 2px dashed rgba(253,121,168,0.25);">
              📊
            </div>
            <h2 class="font-display" style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary); margin: 0 0 10px;">No Data Yet</h2>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin: 0 0 28px; max-width: 260px;">
              Start logging meals with AI to unlock beautiful charts, weekly trends, and personalized insights.
            </p>
            <button class="btn btn-primary" style="padding: 12px 32px; font-size: 0.9rem; border-radius: var(--radius-full);" onclick="window.location.hash='#scanner'">
              <i data-lucide="camera" style="width: 16px; height: 16px;"></i>
              &nbsp;Scan First Meal
            </button>
          </div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // Calculate averages & metrics
    const dataSet = activeTab === 'week' ? weekData : monthData;
    let totalCal = 0, totalP = 0, totalC = 0, totalF = 0;
    let loggedDays = 0;

    dataSet.forEach(d => {
      totalCal += d.calories || 0;
      totalP += d.protein || 0;
      totalC += d.carbs || 0;
      totalF += d.fat || 0;
      if (d.calories > 0) loggedDays++;
    });

    const avgCal = Math.round(totalCal / dataSet.length);
    const avgP = Math.round(totalP / dataSet.length);
    const avgC = Math.round(totalC / dataSet.length);
    const avgF = Math.round(totalF / dataSet.length);
    const consistencyPercent = Math.round((loggedDays / dataSet.length) * 100);
    container.innerHTML = `
      <div class="analytics-screen animate-fadeIn" style="padding: 20px 16px 0 16px;">
        
        <!-- Header -->
        <div style="margin-bottom: 20px;">
          <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Analytics</span>
          <h1 class="font-display" style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin:0;">Progress Trends</h1>
        </div>

        <!-- Weekly / Monthly Tab Selector -->
        <div class="analytics-tabs" style="display: flex; gap: 6px; padding: 4px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-full); margin-bottom: 20px;">
          <button class="btn-tab-toggle tab-week ${activeTab === 'week' ? 'active' : ''}" style="flex:1; text-align:center; padding: 8px 0; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 600; color: ${activeTab === 'week' ? 'white' : 'var(--text-secondary)'}; background: ${activeTab === 'week' ? 'var(--gradient-primary)' : 'transparent'}; transition: all var(--transition-fast);">
            Weekly View
          </button>
          <button class="btn-tab-toggle tab-month ${activeTab === 'month' ? 'active' : ''}" style="flex:1; text-align:center; padding: 8px 0; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 600; color: ${activeTab === 'month' ? 'white' : 'var(--text-secondary)'}; background: ${activeTab === 'month' ? 'var(--gradient-primary)' : 'transparent'}; transition: all var(--transition-fast);">
            Monthly View
          </button>
        </div>

        <!-- Calorie Bar Chart Card -->
        <div class="card glass-card" style="padding: 16px; margin-bottom: 20px; display:flex; flex-direction:column; gap: 12px;">
          <div>
            <h3 class="font-display" style="font-size: 0.95rem; font-weight: 850; color: var(--text-primary); margin:0;">Calorie Intake</h3>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin:0;">Average: ${avgCal} kcal / day</p>
          </div>
          
          <div id="calorie-chart-mount" style="width:100%;"></div>
        </div>

        <!-- Macro Breakdown Card -->
        <div class="card glass-card" style="padding: 18px; margin-bottom: 20px; display:flex; flex-direction:column; gap: 14px;">
          <div>
            <h3 class="font-display" style="font-size: 0.95rem; font-weight: 850; color: var(--text-primary); margin:0;">Macro Targets (Averages)</h3>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin:0;">Avg distribution over this period</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <!-- Protein Bar -->
            <div>
              <div style="display:flex; justify-content:space-between; font-size: 0.75rem; margin-bottom: 4px;">
                <span style="font-weight: 600; color: var(--text-primary);">Protein</span>
                <span style="color: var(--text-secondary);">${avgP}g / ${goals.protein}g</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 10px; overflow:hidden;">
                <div style="width: ${Math.min((avgP / goals.protein) * 100, 100)}%; height: 100%; background: var(--gradient-protein); border-radius: 10px;"></div>
              </div>
            </div>
            
            <!-- Carbs Bar -->
            <div>
              <div style="display:flex; justify-content:space-between; font-size: 0.75rem; margin-bottom: 4px;">
                <span style="font-weight: 600; color: var(--text-primary);">Carbs</span>
                <span style="color: var(--text-secondary);">${avgC}g / ${goals.carbs}g</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 10px; overflow:hidden;">
                <div style="width: ${Math.min((avgC / goals.carbs) * 100, 100)}%; height: 100%; background: var(--gradient-carbs); border-radius: 10px;"></div>
              </div>
            </div>

            <!-- Fat Bar -->
            <div>
              <div style="display:flex; justify-content:space-between; font-size: 0.75rem; margin-bottom: 4px;">
                <span style="font-weight: 600; color: var(--text-primary);">Fat</span>
                <span style="color: var(--text-secondary);">${avgF}g / ${goals.fat}g</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 10px; overflow:hidden;">
                <div style="width: ${Math.min((avgF / goals.fat) * 100, 100)}%; height: 100%; background: var(--gradient-fat); border-radius: 10px;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2x2 Stats Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <div class="card glass-card" style="padding: 14px; display: flex; flex-direction: column; gap: 6px;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(253, 121, 168, 0.1); color: var(--accent-pink); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="sparkles" style="width: 14px; height: 14px;"></i>
            </div>
            <span style="font-size: 0.7rem; color: var(--text-secondary); font-weight:600;">Avg Intake</span>
            <span class="font-display" style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">${avgCal} kcal</span>
          </div>

          <div class="card glass-card" style="padding: 14px; display: flex; flex-direction: column; gap: 6px;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(0, 206, 201, 0.1); color: var(--accent-teal); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="flame" style="width: 14px; height: 14px;"></i>
            </div>
            <span style="font-size: 0.7rem; color: var(--text-secondary); font-weight:600;">Current Streak</span>
            <span class="font-display" style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">${streak.current} days</span>
          </div>

          <div class="card glass-card" style="padding: 14px; display: flex; flex-direction: column; gap: 6px;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(253, 203, 110, 0.1); color: var(--accent-yellow); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="target" style="width: 14px; height: 14px;"></i>
            </div>
            <span style="font-size: 0.7rem; color: var(--text-secondary); font-weight:600;">Consistency</span>
            <span class="font-display" style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">${consistencyPercent}%</span>
          </div>

          <div class="card glass-card" style="padding: 14px; display: flex; flex-direction: column; gap: 6px;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(108, 92, 231, 0.1); color: var(--accent-purple-light); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="utensils" style="width: 14px; height: 14px;"></i>
            </div>
            <span style="font-size: 0.7rem; color: var(--text-secondary); font-weight:600;">Meals Logged</span>
            <span class="font-display" style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">${store.getTotalMealsLogged()} meals</span>
          </div>
        </div>

        <!-- Contribution Matrix Streak Calendar -->
        <div class="card glass-card" style="padding: 16px; margin-bottom: 20px;">
          <div>
            <h3 class="font-display" style="font-size: 0.95rem; font-weight: 850; color: var(--text-primary); margin-bottom: 12px;">Activity Map</h3>
          </div>
          <!-- Grid representation of 28 day boxes -->
          <div class="analytics-streak-calendar" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; justify-items: center;">
            ${buildActivityMatrix()}
          </div>
          <div style="display:flex; justify-content:space-between; font-size: 0.65rem; color: var(--text-secondary); margin-top: 10px; padding: 0 4px;">
            <span>28 days ago</span>
            <span>Today</span>
          </div>
        </div>


      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Mount Canvas Bar Chart — use the correct dataset based on active tab
    const chartData = activeTab === 'week' ? weekData : monthData;
    const chartLabels = activeTab === 'week'
      ? chartData.map(d => d.label)
      : chartData.map(d => {
          const dt = new Date(d.date + 'T12:00:00');
          return `${dt.getMonth() + 1}/${dt.getDate()}`;
        });
    const chartValues = chartData.map(d => d.calories);

    if (chartInstance && typeof chartInstance.cleanup === 'function') {
      chartInstance.cleanup();
    }

    chartInstance = createBarChart({
      data: chartValues,
      labels: chartLabels,
      colors: ['#fd79a8', '#e17055'],
      height: 160,
      barRadius: 4,
      animate: true,
      showValues: true,
      gradient: true
    });
    
    container.querySelector('#calorie-chart-mount').appendChild(chartInstance);

    // Bind Tab click toggles
    container.querySelector('.tab-week').addEventListener('click', () => {
      activeTab = 'week';
      updateAnalyticsView();
    });
    container.querySelector('.tab-month').addEventListener('click', () => {
      activeTab = 'month';
      updateAnalyticsView();
    });
  }

  function buildActivityMatrix() {
    const boxes = [];
    const today = new Date();
    
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const meals = store.getMeals(dateStr);
      
      const hasLogged = 
        meals.breakfast.length +
        meals.lunch.length +
        meals.dinner.length +
        meals.snacks.length > 0;

      // Color weights based on calorie counts
      let background = 'rgba(255,255,255,0.03)';
      let border = '1px solid rgba(255,255,255,0.06)';
      if (hasLogged) {
        background = 'var(--gradient-protein)';
        border = 'none';
      }

      boxes.push(`
        <div style="width: 32px; height: 32px; border-radius: var(--radius-sm); background: ${background}; border: ${border}; position:relative; display:flex; align-items:center; justify-content:center;" title="${dateStr}">
          <span style="font-size: 0.6rem; font-weight:700; color: ${hasLogged ? '#0a0a0f' : 'var(--text-tertiary)'};">${d.getDate()}</span>
        </div>
      `);
    }

    return boxes.join('');
  }

  updateAnalyticsView();
}

export function onEnter() {
  // Re-load
}

export function onLeave() {
  if (chartInstance && typeof chartInstance.cleanup === 'function') {
    chartInstance.cleanup();
  }
}
