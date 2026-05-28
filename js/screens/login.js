// login.js — Sleek, futuristic auth sign-in interface
import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';

export function render(container) {
  container.innerHTML = `
    <div class="nv-auth login-screen">
      <div class="nv-auth-orb" style="top:-120px;left:-80px;width:320px;height:320px;background:rgba(108,92,231,0.35);"></div>
      <div class="nv-auth-orb" style="bottom:-100px;right:-60px;width:280px;height:280px;background:rgba(253,121,168,0.25);animation-delay:2s;"></div>
      
      <!-- Animated floating particles background -->
      <div class="floating-particles" style="position: absolute; inset:0; pointer-events:none; z-index: 2; overflow:hidden;"></div>

      <div style="width: 100%; max-width: 360px; z-index: 3; display: flex; flex-direction: column; align-items: center;">
        
        <!-- Logo Branding Header -->
        <div style="text-align: center; margin-bottom: 36px; animation: float 3s ease-in-out infinite;">
          <div style="width: 72px; height: 72px; border-radius: var(--radius-xl); background: var(--gradient-primary); border: 2px solid var(--glass-border); display: flex; align-items: center; justify-content: center; color: white; margin: 0 auto 16px auto; box-shadow: 0 10px 30px rgba(108, 92, 231, 0.35);">
            <i data-lucide="sparkles" style="width: 36px; height: 36px;"></i>
          </div>
          <h1 class="font-display" style="font-size: 2.1rem; font-weight: 900; color: var(--text-primary); margin:0; line-height: 1.15; letter-spacing: -0.5px;">
            NutriVision <span class="text-gradient" style="background: var(--gradient-protein); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">AI</span>
          </h1>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 6px;">Your Intelligent Food Recognition Companion</p>
        </div>

        <!-- Credentials Card -->
        <div class="nv-auth-card nv-glass nv-glow-border login-form-card" style="margin-bottom: 24px;">
          <h3 class="font-display" style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px;">Welcome Back</h3>
          
          <form id="login-form" style="display: flex; flex-direction: column; gap: 16px;">
            
            <div class="input-group">
              <label style="font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 6px; letter-spacing: 0.5px;">Username</label>
              <div style="position: relative; display: flex; align-items: center;">
                <i data-lucide="user" style="position: absolute; left: 14px; width: 16px; height: 16px; color: var(--text-secondary);"></i>
                <input type="text" id="login-username" required placeholder="alex" style="width:100%; padding: 12px 12px 12px 42px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); outline: none; font-size: 0.9rem; transition: all var(--transition-fast);" />
              </div>
            </div>

            <div class="input-group" style="margin-bottom: 4px;">
              <label style="font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 6px; letter-spacing: 0.5px;">Password</label>
              <div style="position: relative; display: flex; align-items: center;">
                <i data-lucide="lock" style="position: absolute; left: 14px; width: 16px; height: 16px; color: var(--text-secondary);"></i>
                <input type="password" id="login-password" required placeholder="••••••••" style="width:100%; padding: 12px 12px 12px 42px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); outline: none; font-size: 0.9rem; transition: all var(--transition-fast);" />
              </div>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; height: 50px; font-size: 0.95rem; font-weight: 700; justify-content: center; box-shadow: var(--shadow-glow); margin-top: 10px;">
              Sign In
            </button>

          </form>
        </div>

        <!-- Footer Redirection Links -->
        <p style="font-size: 0.85rem; color: var(--text-secondary); text-align: center; margin-bottom: 16px;">
          Don't have an account? 
          <a href="#signup" style="color: var(--accent-teal); font-weight: 700; transition: color var(--transition-fast);" id="go-signup">Sign Up</a>
        </p>

        <button class="btn btn-ghost btn-guest-login" style="font-size: 0.8rem; font-weight: 600; color: var(--text-tertiary); text-decoration: underline; padding: 4px 8px;">
          Continue as Guest
        </button>

      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Draw floating particles dynamically for premium interactive backdrop
  const particlesContainer = container.querySelector('.floating-particles');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.style.position = 'absolute';
    p.style.width = `${Math.random() * 8 + 4}px`;
    p.style.height = p.style.width;
    p.style.borderRadius = '50%';
    p.style.background = Math.random() > 0.5 ? 'var(--accent-teal)' : 'var(--accent-pink)';
    p.style.opacity = (Math.random() * 0.15 + 0.05).toString();
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.animation = `float ${Math.random() * 5 + 4}s ease-in-out infinite`;
    particlesContainer.appendChild(p);
  }

  // Focus effect for inputs
  const inputs = container.querySelectorAll('.input-field');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = 'var(--accent-teal)';
      input.style.background = 'rgba(0, 206, 201, 0.04)';
      input.style.boxShadow = '0 0 10px rgba(0, 206, 201, 0.15)';
    });

    input.addEventListener('blur', () => {
      input.style.borderColor = 'var(--glass-border)';
      input.style.background = 'rgba(255,255,255,0.03)';
      input.style.boxShadow = 'none';
    });
  });

  // Handle Form Submission
  const form = container.querySelector('#login-form');
  const formCard = container.querySelector('.login-form-card');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = container.querySelector('#login-username').value.trim();
    const p = container.querySelector('#login-password').value;

    const success = store.login(u, p);
    if (success) {
      showToast({ message: `Successfully logged in as ${u}!`, type: 'success' });
      // Redirect based on whether user is onboarded
      if (!store.isOnboarded()) {
        router.navigate('onboarding', { transition: 'fade' });
      } else {
        router.navigate('home', { transition: 'fade' });
      }
    } else {
      // Shaking card animation for error feedback
      formCard.classList.add('animate-shake');
      showToast({ message: 'Incorrect username or password. Try registering first!', type: 'error' });
      setTimeout(() => {
        formCard.classList.remove('animate-shake');
      }, 500);
    }
  });

  // Guest login
  container.querySelector('.btn-guest-login').addEventListener('click', () => {
    store.setState({ session: 'Guest' });
    showToast({ message: 'Welcome as Guest!', type: 'info' });
    if (!store.isOnboarded()) {
      router.navigate('onboarding', { transition: 'fade' });
    } else {
      router.navigate('home', { transition: 'fade' });
    }
  });

  // Nav helper link
  container.querySelector('#go-signup').addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate('signup', { transition: 'slide-left' });
  });
}
