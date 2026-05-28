import { store } from './store.js';
import { router } from './router.js';
import { theme } from './theme.js';
import { createNavBar } from './components/nav-bar.js';

// Import all screens
import * as login from './screens/login.js';
import * as signup from './screens/signup.js';
import * as onboarding from './screens/onboarding.js';
import * as home from './screens/home.js';
import * as scanner from './screens/scanner.js';
import * as diary from './screens/diary.js';
import * as analytics from './screens/analytics.js';
import * as profile from './screens/profile.js';
import * as streaks from './screens/streaks.js';

function initApp() {
  theme.init();
  
  const screenContainer = document.getElementById('screen-container');
  const navContainer = document.getElementById('nav-container');
  
  router.init(screenContainer);
  
  // Register routes
  router.register('login', { render: login.render, hideNav: true });
  router.register('signup', { render: signup.render, hideNav: true });
  router.register('onboarding', { render: onboarding.render, hideNav: true });
  router.register('home', { render: home.render, onEnter: home.onEnter });
  router.register('scanner', { render: scanner.render, onEnter: scanner.onEnter, onLeave: scanner.onLeave, hideNav: true });
  router.register('diary', { render: diary.render, onEnter: diary.onEnter });
  router.register('analytics', { render: analytics.render, onEnter: analytics.onEnter });
  router.register('profile', { render: profile.render });
  router.register('streaks', { render: streaks.render });
  
  // Nav bar management
  router.onNavigate = (route) => {
    const routeConfig = router.routes[route];
    if (routeConfig?.hideNav) {
      navContainer.innerHTML = '';
      navContainer.style.display = 'none';
    } else {
      navContainer.innerHTML = '';
      navContainer.style.display = 'block';
      navContainer.appendChild(createNavBar(route));
    }
    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };
  
  // Initial route routing
  if (!store.isAuthenticated()) {
    router.navigate('login');
  } else if (!store.isOnboarded()) {
    router.navigate('onboarding');
  } else {
    const hash = window.location.hash.slice(1) || 'home';
    if (['login', 'signup', 'onboarding', 'home', 'scanner', 'diary', 'analytics', 'profile', 'streaks'].includes(hash)) {
      router.navigate(hash);
    } else {
      router.navigate('home');
    }
  }
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
