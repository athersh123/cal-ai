// modal.js — Slide-up bottom sheets with backdrop blur overlay
export function showModal({ title, content, onClose, showHandle = true }) {
  const container = document.getElementById('modal-container');
  if (!container) return { close: () => {} };

  container.innerHTML = '';
  container.classList.add('active');

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay animate-fadeIn';
  
  const sheet = document.createElement('div');
  sheet.className = 'modal-sheet animate-slideUp';

  let handleHtml = '';
  if (showHandle) {
    handleHtml = `<div class="modal-handle" style="width: 40px; height: 5px; background: rgba(255,255,255,0.2); border-radius: 10px; margin: 8px auto 16px auto; cursor: grab;"></div>`;
  }

  const titleHtml = title ? `<h3 class="modal-title font-display" style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; padding: 0 4px;">${title}</h3>` : '';

  sheet.innerHTML = `
    ${handleHtml}
    ${titleHtml}
    <div class="modal-content" style="max-height: 70dvh; overflow-y: auto; -webkit-overflow-scrolling: touch; padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));"></div>
  `;

  const contentArea = sheet.querySelector('.modal-content');
  if (typeof content === 'string') {
    contentArea.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    contentArea.appendChild(content);
  }

  container.appendChild(overlay);
  container.appendChild(sheet);

  if (window.lucide) {
    window.lucide.createIcons();
  }

  function close() {
    overlay.classList.remove('animate-fadeIn');
    overlay.classList.add('animate-fadeOut');
    sheet.classList.remove('animate-slideUp');
    sheet.classList.add('animate-slideDown');

    setTimeout(() => {
      container.innerHTML = '';
      container.classList.remove('active');
      if (onClose) onClose();
    }, 250);
  }

  overlay.addEventListener('click', close);
  
  // Drag to dismiss handler
  const handle = sheet.querySelector('.modal-handle');
  if (handle) {
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    handle.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      isDragging = true;
      sheet.style.transition = 'none';
    });

    handle.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      if (deltaY > 0) {
        sheet.style.transform = `translateY(${deltaY}px)`;
      }
    });

    handle.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      sheet.style.transition = 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
      const deltaY = currentY - startY;
      if (deltaY > 100) {
        close();
      } else {
        sheet.style.transform = 'translateY(0)';
      }
    });
  }

  return { close };
}

export function showSheet({ content, onClose }) {
  return showModal({ content, onClose, showHandle: true });
}
