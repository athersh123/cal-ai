// signup.js — Premium registration page
import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';

export function render(container) {
  container.innerHTML = `
    <div class="signup-screen" style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100dvh; background: var(--bg-primary); padding: 24px; position: relative; overflow: hidden;">
      
      <!-- Glowing decorative ambient orbs -->
      <div style="position: absolute; top: -150px; right: -50px; width: 350px; height: 350px; background: radial-gradient(circle, rgba(0, 206, 201, 0.25) 0%, rgba(0,0,0,0) 70%); pointer-events: none; z-index: 1; animation: breathe 8s ease-in-out infinite;"></div>
      <div style="position: absolute; bottom: -120px; left: -50px; width: 320px; height: 320px; background: radial-gradient(circle, rgba(108, 92, 231, 0.2) 0%, rgba(0,0,0,0) 70%); pointer-events: none; z-index: 1; animation: breathe 8s ease-in-out infinite 3s;"></div>
      
      <!-- Animated floating particles background -->
      <div class="floating-particles" style="position: absolute; inset:0; pointer-events:none; z-index: 2; overflow:hidden;"></div>

      <div style="width: 100%; max-width: 360px; z-index: 3; display: flex; flex-direction: column; align-items: center;">
        
        <!-- Logo Branding Header -->
        <div style="text-align: center; margin-bottom: 28px; animation: float 3s ease-in-out infinite;">
          <div style="width: 72px; height: 72px; border-radius: var(--radius-xl); background: var(--gradient-primary); border: 2px solid var(--glass-border); display: flex; align-items: center; justify-content: center; color: white; margin: 0 auto 16px auto; box-shadow: 0 10px 30px rgba(108, 92, 231, 0.35);">
            <i data-lucide="sparkles" style="width: 36px; height: 36px;"></i>
          </div>
          <h1 class="font-display" style="font-size: 2.1rem; font-weight: 900; color: var(--text-primary); margin:0; line-height: 1.15; letter-spacing: -0.5px;">
            NutriVision <span class="text-gradient" style="background: var(--gradient-protein); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">AI</span>
          </h1>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 6px;">Create your account to start tracking meals</p>
        </div>

        <!-- Registration Card -->
        <div class="card glass-card signup-form-card" style="width: 100%; padding: 24px; border-radius: var(--radius-xl); box-shadow: 0 20px 40px rgba(0,0,0,0.3); border: 1px solid var(--glass-border); margin-bottom: 24px;">
          <h3 class="font-display" style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 16px;">Sign Up</h3>
          
          <form id="signup-form" style="display: flex; flex-direction: column; gap: 14px;">
            
            <div class="input-group">
              <label style="font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 4px; letter-spacing: 0.5px;">Username</label>
              <div style="position: relative; display: flex; align-items: center;">
                <i data-lucide="user" style="position: absolute; left: 14px; width: 16px; height: 16px; color: var(--text-secondary);"></i>
                <input type="text" id="signup-username" required placeholder="alex" style="width:100%; padding: 10px 12px 10px 42px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); outline: none; font-size: 0.9rem; transition: all var(--transition-fast);" />
              </div>
            </div>

            <div class="input-group">
              <label style="font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 4px; letter-spacing: 0.5px;">Password</label>
              <div style="position: relative; display: flex; align-items: center;">
                <i data-lucide="lock" style="position: absolute; left: 14px; width: 16px; height: 16px; color: var(--text-secondary);"></i>
                <input type="password" id="signup-password" required placeholder="••••••••" style="width:100%; padding: 10px 12px 10px 42px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); outline: none; font-size: 0.9rem; transition: all var(--transition-fast);" />
              </div>
            </div>

            <div class="input-group" style="margin-bottom: 4px;">
              <label style="font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 4px; letter-spacing: 0.5px;">Confirm Password</label>
              <div style="position: relative; display: flex; align-items: center;">
                <i data-lucide="lock" style="position: absolute; left: 14px; width: 16px; height: 16px; color: var(--text-secondary);"></i>
                <input type="password" id="signup-confirm-password" required placeholder="••••••••" style="width:100%; padding: 10px 12px 10px 42px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); outline: none; font-size: 0.9rem; transition: all var(--transition-fast);" />
              </div>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; height: 48px; font-size: 0.95rem; font-weight: 700; justify-content: center; box-shadow: var(--shadow-glow); margin-top: 8px;">
              Create Account
            </button>

          </form>
        </div>

        <!-- Redirect back to Sign In -->
        <p style="font-size: 0.85rem; color: var(--text-secondary); text-align: center; margin: 0;">
          Already have an account? 
          <a href="#login" style="color: var(--accent-teal); font-weight: 700; transition: color var(--transition-fast);" id="go-login">Sign In</a>
        </p>

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
  const form = container.querySelector('#signup-form');
  const formCard = container.querySelector('.signup-form-card');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = container.querySelector('#signup-username').value.trim();
    const p = container.querySelector('#signup-password').value;
    const cp = container.querySelector('#signup-confirm-password').value;

    if (p !== cp) {
      formCard.classList.add('animate-shake');
      showToast({ message: 'Passwords do not match!', type: 'error' });
      setTimeout(() => {
        formCard.classList.remove('animate-shake');
      }, 500);
      return;
    }

    if (u.length < 3) {
      showToast({ message: 'Username must be at least 3 characters.', type: 'warning' });
      return;
    }

    const success = store.signup(u, p);
    if (success) {
      showToast({ message: `Successfully registered account: ${u}!`, type: 'success' });
      // Redirect to onboarding to set up goals
      router.navigate('onboarding', { transition: 'fade' });
    } else {
      formCard.classList.add('animate-shake');
      showToast({ message: `Username "${u}" is already taken!`, type: 'error' });
      setTimeout(() => {
        formCard.classList.remove('animate-shake');
      }, 500);
    }
  });

  // Nav helper link
  container.querySelector('#go-login').addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate('login', { transition: 'slide-right' });
  });
}
