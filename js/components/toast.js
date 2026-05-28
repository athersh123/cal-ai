// toast.js — Elegant stackable micro-interaction notification system
export function showToast({ message, type = 'success', duration = 3000, icon = null }) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type} glass-card animate-fadeInDown`;
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '12px';
  toast.style.padding = '12px 16px';
  toast.style.borderRadius = 'var(--radius-md)';
  toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
  toast.style.pointerEvents = 'auto';

  // Default icons mapping
  const icons = {
    success: 'check',
    error: 'x',
    warning: 'alert-triangle',
    info: 'info'
  };

  const activeIcon = icon || icons[type] || 'info';

  // Define accent border color dynamically based on type
  let color = 'var(--accent-teal)';
  if (type === 'error') color = 'var(--accent-red)';
  if (type === 'warning') color = 'var(--accent-yellow)';
  if (type === 'info') color = 'var(--accent-blue)';

  toast.style.borderLeft = `4px solid ${color}`;

  toast.innerHTML = `
    <div class="toast-icon-circle" style="color: ${color}; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.05);">
      <i data-lucide="${activeIcon}" style="width: 14px; height: 14px;"></i>
    </div>
    <span class="toast-message" style="font-size: 0.85rem; font-weight: 500; color: var(--text-primary); flex: 1;">
      ${message}
    </span>
    <button class="toast-close" style="color: var(--text-secondary); opacity: 0.6; display: flex; align-items: center;" aria-label="Close notification">
      <i data-lucide="x" style="width: 14px; height: 14px;"></i>
    </button>
  `;

  container.appendChild(toast);

  if (window.lucide) {
    window.lucide.createIcons();
  }

  function dismiss() {
    toast.classList.remove('animate-fadeInDown');
    toast.classList.add('animate-fadeOut');
    toast.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      if (toast.parentNode === container) {
        container.removeChild(toast);
      }
    }, 300);
  }

  // Auto dismiss
  const timer = setTimeout(dismiss, duration);

  // Close button click
  toast.querySelector('.toast-close').addEventListener('click', (e) => {
    e.stopPropagation();
    clearTimeout(timer);
    dismiss();
  });
}
