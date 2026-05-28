// nav-bar.js — Premium bottom navigation bar with glow FAB camera button
import { router } from '../router.js';

export function createNavBar(activeTab = 'home') {
  const nav = document.createElement('nav');
  nav.className = 'nav-bar';

  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'diary', label: 'Diary', icon: 'book-open' },
    { id: 'scanner', label: 'Scan', icon: 'camera', isFab: true },
    { id: 'analytics', label: 'Trends', icon: 'bar-chart-3' },
    { id: 'profile', label: 'Profile', icon: 'user' }
  ];

  tabs.forEach(tab => {
    if (tab.isFab) {
      const fabBtn = document.createElement('button');
      fabBtn.className = 'nav-fab';
      fabBtn.setAttribute('aria-label', 'Scan food with AI camera');
      fabBtn.innerHTML = `
        <div class="fab-circle">
          <i data-lucide="${tab.icon}"></i>
        </div>
      `;
      fabBtn.addEventListener('click', () => {
        router.navigate('scanner', { transition: 'slide-up' });
      });
      nav.appendChild(fabBtn);
    } else {
      const btn = document.createElement('button');
      btn.className = `nav-item ${activeTab === tab.id ? 'active' : ''}`;
      btn.innerHTML = `
        <i data-lucide="${tab.icon}"></i>
        <span>${tab.label}</span>
      `;
      btn.addEventListener('click', () => {
        let transition = 'fade';
        if (activeTab === 'home' && tab.id === 'profile') transition = 'slide-left';
        if (activeTab === 'profile' && tab.id === 'home') transition = 'slide-right';
        router.navigate(tab.id, { transition });
      });
      nav.appendChild(btn);
    }
  });

  return nav;
}
