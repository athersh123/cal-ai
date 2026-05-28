// water-tracker.js — Interactive liquid tracker with animated wave fills
import { store } from '../store.js';
import { showToast } from './toast.js';
import { showModal } from './modal.js';

const WAVE_SVG_ENCODED = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">' +
    '<path d="M0,0 C150,90 350,90 500,0 L500,120 L0,120 Z" fill="#0984e3" opacity="0.5"/>' +
  '</svg>'
);

export function createWaterTracker({ current = 0, goal = 2500, onAdd }) {
  const container = document.createElement('div');
  container.className = 'water-tracker card glass-card';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '16px';
  container.style.padding = '20px';

  const percentage = Math.min(Math.round((current / goal) * 100), 100);

  container.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: var(--accent-blue); display: flex; align-items: center;">
          <i data-lucide="droplets" style="width: 20px; height: 20px;"></i>
        </div>
        <div>
          <h4 class="font-display" style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin:0;">Water Intake</h4>
          <p style="font-size: 0.75rem; color: var(--text-secondary); margin:0;">Goal: ${goal} ml</p>
        </div>
      </div>
      <span class="font-display" style="font-size: 1.1rem; font-weight: 800; color: var(--accent-blue);">${current} <span style="font-size: 0.75rem; font-weight: 500; color: var(--text-secondary);">ml</span></span>
    </div>

    <!-- Liquid display glass container -->
    <div style="display: flex; align-items: center; gap: 20px;">
      <div class="water-glass-container" style="flex: 1; height: 110px; background: rgba(255,255,255,0.03); border: 2px solid rgba(9, 132, 227, 0.2); border-radius: var(--radius-md) var(--radius-md) var(--radius-lg) var(--radius-lg); position: relative; overflow: hidden;">
        <!-- Wave Fill background element -->
        <div class="water-wave-fill" style="position: absolute; bottom: 0; left: 0; width: 100%; height: ${percentage}%; background: linear-gradient(180deg, rgba(9, 132, 227, 0.6) 0%, rgba(0, 206, 201, 0.4) 100%); transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden;">
          <div class="wave-wave" style="position: absolute; top: -5px; left: 0; width: 200%; height: 10px; background-image: url(data:image/svg+xml,${WAVE_SVG_ENCODED}); background-repeat: repeat-x; background-size: 50% 100%; animation: waveFlow 4s linear infinite;"></div>
        </div>
        
        <!-- Center percentage badge -->
        <div style="position: absolute; inset:0; display: flex; align-items: center; justify-content: center; z-index: 3; pointer-events: none;">
          <span class="font-display" style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); text-shadow: 0 2px 4px rgba(0,0,0,0.4);">${percentage}%</span>
        </div>
      </div>

      <!-- Control Button Panel -->
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <button class="btn btn-sm btn-water-add" data-amount="250" style="padding: 10px 14px; background: rgba(9, 132, 227, 0.1); border: 1px solid rgba(9, 132, 227, 0.25); color: var(--accent-blue); border-radius: var(--radius-md); font-size: 0.8rem; font-weight: 700; white-space: nowrap; display: flex; align-items: center; gap: 4px; transition: all var(--transition-fast);">
          <i data-lucide="plus" style="width: 12px; height: 12px;"></i> +250 ml
        </button>
        <button class="btn btn-sm btn-water-add" data-amount="500" style="padding: 10px 14px; background: rgba(9, 132, 227, 0.15); border: 1px solid rgba(9, 132, 227, 0.3); color: var(--accent-blue); border-radius: var(--radius-md); font-size: 0.8rem; font-weight: 700; white-space: nowrap; display: flex; align-items: center; gap: 4px; transition: all var(--transition-fast);">
          <i data-lucide="plus" style="width: 12px; height: 12px;"></i> +500 ml
        </button>
        <button class="btn btn-sm btn-water-custom" style="padding: 8px 12px; border: 1px solid var(--glass-border); border-radius: var(--radius-md); font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); display: flex; align-items: center; justify-content: center; gap: 4px; transition: all var(--transition-fast);">
          Custom
        </button>
      </div>
    </div>
  `;

  // Bind clicks
  container.querySelectorAll('.btn-water-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const amount = parseInt(btn.getAttribute('data-amount'));
      onAdd(amount);
    });
  });

  container.querySelector('.btn-water-custom').addEventListener('click', () => {
    // Show custom modal
    const inputHtml = `
      <div style="padding: 8px 4px 16px 4px;">
        <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 8px;">Enter amount of water in ml</label>
        <div class="input-group" style="display: flex; gap: 8px;">
          <input type="number" class="input-field water-custom-input" placeholder="250" value="250" min="50" max="2000" style="flex:1; padding: 12px 16px; background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); font-size: 1rem;" />
          <button class="btn btn-primary btn-save-custom-water" style="padding: 0 20px; font-size:0.9rem;">Add</button>
        </div>
      </div>
    `;

    const modal = showModal({
      title: 'Log Custom Water',
      content: inputHtml,
      onClose: () => {}
    });

    const modalEl = document.getElementById('modal-container');
    const saveBtn = modalEl.querySelector('.btn-save-custom-water');
    const input = modalEl.querySelector('.water-custom-input');

    saveBtn.addEventListener('click', () => {
      const amt = parseInt(input.value);
      if (amt && amt > 0) {
        onAdd(amt);
        modal.close();
      } else {
        showToast({ message: 'Please enter a valid positive number', type: 'error' });
      }
    });
  });

  return container;
}
