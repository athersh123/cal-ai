// router.js — Hash-based SPA Router with Animated Screen Transitions
import { store } from './store.js';

export const router = {
  routes: {},
  currentRoute: null,
  previousRoute: null,
  container: null,
  onNavigate: null,

  init(container) {
    this.container = container;
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1) || 'home';
      this.navigate(hash);
    });
  },

  register(path, { render, onEnter, onLeave, hideNav }) {
    this.routes[path] = { render, onEnter, onLeave, hideNav };
  },

  navigate(path, options = {}) {
    const routeConfig = this.routes[path];
    if (!routeConfig) {
      console.warn(`[Router] Route not found: ${path}`);
      return;
    }

    if (this.currentRoute === path) return;

    this.previousRoute = this.currentRoute;
    this.currentRoute = path;

    // Trigger onLeave on the old route
    if (this.previousRoute && this.routes[this.previousRoute]?.onLeave) {
      try {
        this.routes[this.previousRoute].onLeave();
      } catch (e) {
        console.error(`[Router] Error in onLeave for route: ${this.previousRoute}`, e);
      }
    }

    const defaultTransition = options.transition || 'fade';
    
    // We animate transitions by applying classes to the container
    if (this.container.firstElementChild) {
      const activeEl = this.container.firstElementChild;
      activeEl.classList.remove('screen-enter');
      activeEl.classList.add('screen-exit');
      
      // Wait for exit transition (matching CSS duration of ~250ms)
      setTimeout(() => {
        this._renderNewRoute(path, routeConfig, defaultTransition);
      }, 200);
    } else {
      this._renderNewRoute(path, routeConfig, defaultTransition);
    }

    // Sync hash
    if (window.location.hash.slice(1) !== path) {
      window.history.pushState(null, '', `#${path}`);
    }
  },

  _renderNewRoute(path, routeConfig, transition) {
    this.container.innerHTML = '';
    
    // Create new screen wrapper
    const screenWrapper = document.createElement('div');
    screenWrapper.className = `screen screen-${path} screen-enter screen-transition-${transition}`;
    
    // Render the content into it
    routeConfig.render(screenWrapper);
    this.container.appendChild(screenWrapper);
    
    // Trigger onNavigate callbacks
    if (this.onNavigate) {
      this.onNavigate(path);
    }

    // Trigger onEnter
    if (routeConfig.onEnter) {
      try {
        routeConfig.onEnter();
      } catch (e) {
        console.error(`[Router] Error in onEnter for route: ${path}`, e);
      }
    }
    
    // Render Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  back() {
    if (this.previousRoute) {
      this.navigate(this.previousRoute, { transition: 'slide-right' });
    } else {
      this.navigate('home');
    }
  },

  getCurrentRoute() {
    return this.currentRoute;
  }
};
