// progress-ring.js — Custom SVG Progress Ring with gradient support and count-up labels
export function createProgressRing({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = '#6c5ce7',
  gradientColors = null, // array of [startColor, endColor]
  label = '',
  sublabel = '',
  showPercentage = false,
  animate = true,
  duration = 1000
}) {
  const container = document.createElement('div');
  container.className = 'progress-ring-container';
  container.style.position = 'relative';
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Unique gradient ID
  const gradientId = `ring-grad-${Math.random().toString(36).substring(2, 9)}`;

  const percentage = max > 0 ? Math.min(value / max, 1.2) : 0; // limit visual fill to 120%
  const offset = circumference - (percentage * circumference);

  let gradientHtml = '';
  if (gradientColors && gradientColors.length >= 2) {
    gradientHtml = `
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${gradientColors[0]}" />
          <stop offset="100%" stop-color="${gradientColors[1]}" />
        </linearGradient>
      </defs>
    `;
  }

  const strokeColor = gradientColors ? `url(#${gradientId})` : color;

  container.innerHTML = `
    <svg width="${size}" height="${size}" style="transform: rotate(-90deg); position: absolute; top:0; left:0;">
      ${gradientHtml}
      <!-- Background circle -->
      <circle 
        class="progress-ring-bg" 
        stroke="var(--glass-border)" 
        fill="transparent" 
        stroke-width="${strokeWidth}" 
        r="${radius}" 
        cx="${size / 2}" 
        cy="${size / 2}" 
      />
      <!-- Progress circle -->
      <circle 
        class="progress-ring-circle" 
        stroke="${strokeColor}" 
        fill="transparent" 
        stroke-width="${strokeWidth}" 
        stroke-dasharray="${circumference} ${circumference}" 
        stroke-dashoffset="${circumference}" 
        stroke-linecap="round"
        r="${radius}" 
        cx="${size / 2}" 
        cy="${size / 2}"
        style="transition: stroke-dashoffset ${animate ? duration : 0}ms cubic-bezier(0.4, 0, 0.2, 1);"
      />
    </svg>
    <div class="progress-ring-text" style="display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 2; text-align: center; pointer-events: none;">
      <span class="progress-ring-value font-display" style="font-weight: 700; color: var(--text-primary); line-height: 1.1;">
        ${showPercentage ? '0%' : (label || '0')}
      </span>
      ${sublabel ? `<span class="progress-ring-sublabel" style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px; font-weight: 500;">${sublabel}</span>` : ''}
    </div>
  `;

  const circle = container.querySelector('.progress-ring-circle');
  const valueLabel = container.querySelector('.progress-ring-value');

  // Trigger animation after append
  requestAnimationFrame(() => {
    // Set stroke dashoffset
    circle.style.strokeDashoffset = offset;

    // Animate label counting up
    if (animate) {
      let start = 0;
      const end = showPercentage ? Math.round(percentage * 100) : (typeof label === 'number' ? label : parseInt(label) || 0);
      const startTime = performance.now();

      function updateNumber(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing outQuad
        const ease = progress * (2 - progress);
        const currentVal = Math.round(start + ease * (end - start));
        
        if (valueLabel) {
          valueLabel.textContent = showPercentage ? `${currentVal}%` : currentVal.toLocaleString();
        }

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          // ensure precision at end
          if (valueLabel) {
            valueLabel.textContent = showPercentage ? `${end}%` : (label || end.toLocaleString());
          }
        }
      }

      if (end > 0) {
        requestAnimationFrame(updateNumber);
      }
    }
  });

  return container;
}
