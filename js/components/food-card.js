// food-card.js — Premium card item with swipe gesture to reveal delete action
export function createFoodCard({ food, onDelete, onEdit, onTap, showDelete = true }) {
  const container = document.createElement('div');
  container.className = 'food-card-wrapper';
  container.style.position = 'relative';
  container.style.overflow = 'hidden';
  container.style.borderRadius = 'var(--radius-lg)';
  container.style.marginBottom = '12px';

  // Background action (Delete button)
  const actionBg = document.createElement('div');
  actionBg.className = 'food-card-action-bg';
  actionBg.style.position = 'absolute';
  actionBg.style.right = '0';
  actionBg.style.top = '0';
  actionBg.style.height = '100%';
  actionBg.style.width = '70px';
  actionBg.style.background = 'var(--accent-red)';
  actionBg.style.display = 'flex';
  actionBg.style.alignItems = 'center';
  actionBg.style.justifyContent = 'center';
  actionBg.style.borderRadius = '0 var(--radius-lg) var(--radius-lg) 0';
  actionBg.style.cursor = 'pointer';
  actionBg.style.zIndex = '1';
  actionBg.innerHTML = `<i data-lucide="trash-2" style="color: white; width: 20px; height: 20px;"></i>`;

  // Foreground card
  const card = document.createElement('div');
  card.className = 'food-card-item card glass-card';
  card.style.position = 'relative';
  card.style.zIndex = '2';
  card.style.transition = 'transform 0.25s ease';
  card.style.cursor = onTap ? 'pointer' : 'default';

  const emoji = food.icon || '🍲';
  const confidencePercent = food.confidence ? Math.round(food.confidence * 100) : null;

  card.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
      <div class="food-emoji" style="font-size: 1.8rem; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.06); border-radius: var(--radius-md); border: 1px solid var(--glass-border);">
        ${emoji}
      </div>
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <h4 class="font-display" style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">
            ${food.name}
          </h4>
          <span class="food-calories font-display" style="font-size: 1rem; font-weight: 700; color: var(--accent-pink);">
            ${Math.round(food.calories)} <span style="font-size: 0.75rem; font-weight: 500; color: var(--text-secondary);">kcal</span>
          </span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 8px;">
          <span>${food.serving} ${food.servingUnit}</span>
          ${confidencePercent ? `
            <span style="display: inline-flex; align-items: center; gap: 3px; color: var(--accent-teal); font-weight: 600;">
              <i data-lucide="sparkles" style="width: 10px; height: 10px;"></i>
              ${confidencePercent}% match
            </span>
          ` : ''}
        </div>
        <!-- Macros -->
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          <span class="macro-pill p-pill" style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: var(--radius-full); font-size: 0.7rem; font-weight: 600; background: rgba(0, 206, 201, 0.08); color: var(--accent-teal);">
            P: ${Math.round(food.protein)}g
          </span>
          <span class="macro-pill c-pill" style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: var(--radius-full); font-size: 0.7rem; font-weight: 600; background: rgba(253, 203, 110, 0.08); color: var(--accent-yellow);">
            C: ${Math.round(food.carbs)}g
          </span>
          <span class="macro-pill f-pill" style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: var(--radius-full); font-size: 0.7rem; font-weight: 600; background: rgba(108, 92, 231, 0.08); color: var(--accent-purple-light);">
            F: ${Math.round(food.fat)}g
          </span>
        </div>
      </div>
    </div>
  `;

  container.appendChild(actionBg);
  container.appendChild(card);

  if (onTap) {
    card.addEventListener('click', (e) => {
      // Don't trigger tap if swiped out or clicking trash
      if (card.style.transform === 'translateX(-70px)') {
        card.style.transform = 'translateX(0)';
        return;
      }
      onTap(food);
    });
  }

  // Handle delete action
  if (showDelete && onDelete) {
    actionBg.addEventListener('click', (e) => {
      e.stopPropagation();
      // Animate card removal
      container.style.transition = 'all 0.3s ease';
      container.style.transform = 'translateX(-100%)';
      container.style.opacity = '0';
      container.style.height = '0';
      container.style.marginBottom = '0';
      container.style.padding = '0';
      
      setTimeout(() => {
        onDelete(food.mealId || food.id);
      }, 300);
    });

    // Touch Swipe gestures (left to delete)
    let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    card.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
      card.style.transition = 'none';
    }, { passive: true });

    card.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      
      // Swipe left only, maximum 70px
      if (diff < 0) {
        const transX = Math.max(diff, -70);
        card.style.transform = `translateX(${transX}px)`;
      } else {
        // If swiping right when already swiped left, return to 0
        const transX = Math.min(diff - 70, 0);
        card.style.transform = `translateX(${transX}px)`;
      }
    }, { passive: true });

    card.addEventListener('touchend', () => {
      if (!isSwiping) return;
      isSwiping = false;
      card.style.transition = 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
      
      const diff = currentX - startX;
      if (diff < -35) {
        card.style.transform = 'translateX(-70px)';
      } else {
        card.style.transform = 'translateX(0)';
      }
    });

    // Click outside to collapse swipe
    document.addEventListener('touchstart', (e) => {
      if (!container.contains(e.target) && card.style.transform === 'translateX(-70px)') {
        card.style.transform = 'translateX(0)';
      }
    }, { passive: true });
  }

  return container;
}
