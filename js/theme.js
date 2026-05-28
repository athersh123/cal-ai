// theme.js — Theme management (dark/light modes)
import { store } from './store.js';

export const theme = {
  init() {
    const savedTheme = store.getTheme() || 'dark';
    this.set(savedTheme);
  },

  toggle() {
    const current = this.getCurrent();
    const next = current === 'dark' ? 'light' : 'dark';
    this.set(next);
    store.setTheme(next);
    return next;
  },

  set(themeName) {
    // Add transitioning class for smooth transition
    document.documentElement.classList.add('theme-transitioning');
    
    document.documentElement.setAttribute('data-theme', themeName);
    
    // Set theme color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeName === 'dark' ? '#0a0a0f' : '#f5f5f7');
    }

    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 400);
  },

  isDark() {
    return this.getCurrent() === 'dark';
  },

  getCurrent() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }
};
