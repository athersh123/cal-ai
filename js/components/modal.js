// modal.js — Fully viewport-safe modal sheets & center dialogs
export function showModal({ title, content, onClose, showHandle = true, variant = 'sheet' }) {
  const container = document.getElementById('modal-container');
  if (!container) return { close: () => {} };

  // Clear any existing modal
  _clearModal(container);
  container.classList.add('active');

  // Backdrop
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.cssText = `
    position: fixed; inset: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.7); backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px); z-index: 9001;
    animation: fadeIn 0.25s ease both;
  `;

  // Sheet
  const sheet = document.createElement('div');
  sheet.className = 'modal-sheet';

  // Handle
  if (showHandle) {
    const handle = document.createElement('div');
    handle.className = 'modal-handle';
    handle.style.cssText = `
      flex-shrink: 0; width: 40px; height: 4px;
      background: rgba(255,255,255,0.2); border-radius: 10px;
      margin: 10px auto 4px auto; cursor: grab;
    `;
    sheet.appendChild(handle);
  }

  // Title
  if (title) {
    const titleEl = document.createElement('div');
    titleEl.className = 'modal-title font-display';
    titleEl.style.cssText = `
      padding: 12px 24px 8px; font-size: 1.2rem; font-weight: 800;
      color: var(--text-primary); flex-shrink: 0;
      font-family: var(--font-display);
    `;
    titleEl.textContent = title;
    sheet.appendChild(titleEl);
  }

  // Scrollable content area
  const contentArea = document.createElement('div');
  contentArea.className = 'modal-content';
  contentArea.style.cssText = `
    flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain; min-height: 0;
    padding: 8px 24px calc(24px + env(safe-area-inset-bottom, 16px));
  `;

  if (typeof content === 'string') {
    contentArea.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    contentArea.appendChild(content);
  }

  sheet.appendChild(contentArea);
  container.appendChild(overlay);
  container.appendChild(sheet);

  // Init lucide icons inside modal
  if (window.lucide) {
    window.lucide.createIcons({ rootElement: sheet });
  }

  function close() {
    sheet.style.animation = 'sheetSlideDown 0.25s ease both';
    overlay.style.animation = 'fadeOut 0.2s ease both';
    setTimeout(() => {
      _clearModal(container);
      if (onClose) onClose();
    }, 260);
  }

  overlay.addEventListener('click', close);

  // Drag-to-dismiss
  const handleEl = sheet.querySelector('.modal-handle');
  if (handleEl) {
    let startY = 0, currentY = 0, dragging = false;

    handleEl.addEventListener('pointerdown', (e) => {
      startY = e.clientY;
      dragging = true;
      sheet.style.transition = 'none';
      handleEl.setPointerCapture(e.pointerId);
    });

    handleEl.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      currentY = e.clientY;
      const delta = currentY - startY;
      if (delta > 0) {
        sheet.style.transform = `translateX(-50%) translateY(${delta}px)`;
      }
    });

    handleEl.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      sheet.style.transition = 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
      const delta = currentY - startY;
      if (delta > 100) {
        close();
      } else {
        sheet.style.transform = 'translateX(-50%) translateY(0)';
      }
    });
  }

  return { close };
}

export function showSheet({ content, onClose }) {
  return showModal({ content, onClose, showHandle: true });
}

function _clearModal(container) {
  container.innerHTML = '';
  container.classList.remove('active');
}
