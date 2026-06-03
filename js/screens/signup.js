// signup.js — Premium registration screen
import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';

export function render(container) {
  container.innerHTML = `
    <div class="nv-auth signup-screen" id="signup-screen-root">
      <!-- Ambient orbs -->
      <div class="nv-auth-orb" style="top:-100px;right:-80px;width:340px;height:340px;background:rgba(0,206,201,0.28);"></div>
      <div class="nv-auth-orb" style="bottom:-140px;left:-60px;width:320px;height:320px;background:rgba(108,92,231,0.22);animation-delay:2s;"></div>

      <canvas id="auth-particles-signup" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.5;"></canvas>

      <div class="nv-auth-inner" style="z-index:3;">

        <!-- Logo -->
        <div class="auth-logo-section animate-fadeInDown" style="margin-bottom:24px;">
          <div class="auth-logo-icon" style="background:linear-gradient(135deg,#00cec9,#55efc4);">
            <i data-lucide="user-plus" style="width:36px;height:36px;"></i>
          </div>
          <h1 class="auth-title">
            Join <span class="text-gradient" style="background:var(--gradient-protein);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">NutriVision</span>
          </h1>
          <p class="auth-subtitle">Start your health transformation today</p>
        </div>

        <!-- Signup card -->
        <div class="auth-card signup-form-card animate-fadeInUp" style="animation-delay:100ms;">
          <h3 class="auth-card-title">Create Account ✨</h3>

          <form id="signup-form" autocomplete="on" novalidate>
            <div class="auth-input-group">
              <label class="auth-input-label" for="signup-email">Email</label>
              <div class="auth-input-wrapper">
                <i data-lucide="mail" class="auth-input-icon"></i>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  class="auth-input"
                  placeholder="alex@example.com"
                  autocomplete="email"
                  autocorrect="off"
                  autocapitalize="none"
                  spellcheck="false"
                  required
                />
              </div>
            </div>

            <div class="auth-input-group">
              <label class="auth-input-label" for="signup-password">Password</label>
              <div class="auth-input-wrapper">
                <i data-lucide="lock" class="auth-input-icon"></i>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  class="auth-input"
                  placeholder="min 6 characters"
                  autocomplete="new-password"
                  required
                  minlength="6"
                />
                <button type="button" class="btn-toggle-pw" style="position:absolute;right:14px;background:none;border:none;color:var(--text-secondary);cursor:pointer;padding:4px;" data-target="signup-password">
                  <i data-lucide="eye" class="pw-eye-icon" style="width:16px;height:16px;pointer-events:none;"></i>
                </button>
              </div>
            </div>

            <div class="auth-input-group" style="margin-bottom:20px;">
              <label class="auth-input-label" for="signup-confirm">Confirm Password</label>
              <div class="auth-input-wrapper">
                <i data-lucide="shield-check" class="auth-input-icon"></i>
                <input
                  type="password"
                  id="signup-confirm"
                  name="confirm"
                  class="auth-input"
                  placeholder="repeat password"
                  autocomplete="new-password"
                  required
                />
              </div>
            </div>

            <!-- Password strength indicator -->
            <div id="pw-strength-bar" style="margin-bottom:16px;display:none;">
              <div style="display:flex;gap:4px;margin-bottom:4px;">
                <div class="pw-seg" style="height:3px;flex:1;border-radius:2px;background:var(--glass-border);transition:background 0.3s;"></div>
                <div class="pw-seg" style="height:3px;flex:1;border-radius:2px;background:var(--glass-border);transition:background 0.3s;"></div>
                <div class="pw-seg" style="height:3px;flex:1;border-radius:2px;background:var(--glass-border);transition:background 0.3s;"></div>
              </div>
              <p class="pw-strength-label" style="font-size:0.7rem;color:var(--text-tertiary);margin:0;"></p>
            </div>

            <button type="submit" class="auth-submit-btn" id="signup-submit-btn" style="background:linear-gradient(135deg,#00cec9,#55efc4);box-shadow:0 8px 28px rgba(0,206,201,0.35);">
              <i data-lucide="user-plus" style="width:18px;height:18px;"></i>
              Create Account
            </button>
          </form>
        </div>

        <!-- Footer -->
        <p class="auth-footer-text" style="animation-delay:250ms;">
          Already have an account?
          <span class="auth-link" id="go-login-link" role="button" tabindex="0">Sign In →</span>
        </p>

      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();

  // Particles
  _initParticles(container.querySelector('#auth-particles-signup'));

  // Input focus effects
  container.querySelectorAll('.auth-input').forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = 'var(--accent-teal)';
      input.style.background = 'rgba(0,206,201,0.05)';
      input.style.boxShadow = '0 0 0 3px rgba(0,206,201,0.12)';
    });
    input.addEventListener('blur', () => {
      input.style.borderColor = 'rgba(255,255,255,0.1)';
      input.style.background = 'rgba(255,255,255,0.05)';
      input.style.boxShadow = 'none';
    });
  });

  // Password toggle
  container.querySelectorAll('.btn-toggle-pw').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target') || 'signup-password';
      const input = container.querySelector(`#${targetId}`);
      if (!input) return;
      const isText = input.type === 'text';
      input.type = isText ? 'password' : 'text';
      const icon = btn.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', isText ? 'eye' : 'eye-off');
        if (window.lucide) window.lucide.createIcons({ rootElement: btn });
      }
    });
  });

  // Password strength
  const pwInput = container.querySelector('#signup-password');
  const strengthBar = container.querySelector('#pw-strength-bar');
  const segs = container.querySelectorAll('.pw-seg');
  const strengthLabel = container.querySelector('.pw-strength-label');

  pwInput?.addEventListener('input', () => {
    const val = pwInput.value;
    if (!val) { strengthBar.style.display = 'none'; return; }
    strengthBar.style.display = 'block';
    const strength = _getPasswordStrength(val);
    const colors = ['var(--accent-red)', 'var(--accent-yellow)', 'var(--accent-green)'];
    const labels = ['Weak', 'Fair', 'Strong'];
    segs.forEach((seg, i) => {
      seg.style.background = i < strength ? colors[strength - 1] : 'var(--glass-border)';
    });
    if (strengthLabel) strengthLabel.textContent = labels[strength - 1];
    strengthLabel.style.color = colors[strength - 1];
  });

  // Form submit
  const form = container.querySelector('#signup-form');
  const formCard = container.querySelector('.signup-form-card');
  const submitBtn = container.querySelector('#signup-submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = container.querySelector('#signup-email').value.trim();
    const p = container.querySelector('#signup-password').value;
    const cp = container.querySelector('#signup-confirm').value;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast({ message: 'Please enter a valid email address', type: 'warning' });
      return;
    }
    if (p.length < 6) {
      showToast({ message: 'Password must be at least 6 characters', type: 'warning' });
      return;
    }
    if (p !== cp) {
      _shakeCard(formCard);
      showToast({ message: 'Passwords do not match!', type: 'error' });
      return;
    }

    // Loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span style="width:18px;height:18px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:rotate 0.6s linear infinite;display:inline-block;"></span> Creating account…`;

    await new Promise(r => setTimeout(r, 400));

    try {
      const username = email.split('@')[0].slice(0, 24) || 'user';

      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password: p }),
      });

      if (!response.ok) {
        throw new Error(`Signup failed (${response.status})`);
      }

      const data = await response.json().catch(() => ({}));
      submitBtn.innerHTML = `<i data-lucide="check" style="width:18px;height:18px;"></i> Account created!`;
      submitBtn.style.background = 'linear-gradient(135deg, #00b894, #55efc4)';
      if (window.lucide) window.lucide.createIcons({ rootElement: submitBtn });
      showToast({ message: data.message || `Account created! Welcome! 🎉`, type: 'success' });
      setTimeout(() => {
        router.navigate('onboarding', { transition: 'fade' });
      }, 500);
    } catch (e2) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i data-lucide="user-plus" style="width:18px;height:18px;"></i> Create Account`;
      if (window.lucide) window.lucide.createIcons({ rootElement: submitBtn });
      _shakeCard(formCard);
      showToast({ message: e2?.message || 'Signup failed', type: 'error' });
    }
  });

  // Navigation
  container.querySelector('#go-login-link')?.addEventListener('click', () => {
    router.navigate('login', { transition: 'slide-right' });
  });
  container.querySelector('#go-login-link')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') router.navigate('login', { transition: 'slide-right' });
  });
}

function _shakeCard(el) {
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = 'shake 0.5s ease-in-out';
  setTimeout(() => { el.style.animation = ''; }, 500);
}

function _getPasswordStrength(pw) {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) || /[0-9]/.test(pw) || /[^a-zA-Z0-9]/.test(pw)) score++;
  return Math.max(1, Math.min(3, score));
}

function _initParticles(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let W = canvas.offsetWidth || 360;
  let H = canvas.offsetHeight || 700;
  canvas.width = W;
  canvas.height = H;

  const COLORS = ['#00cec9', '#6c5ce7', '#fd79a8', '#55efc4', '#a29bfe'];
  const particles = Array.from({ length: 24 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 3 + 1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.35,
    alpha: Math.random() * 0.3 + 0.07,
  }));

  let animId;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });
    ctx.globalAlpha = 1;
    animId = requestAnimationFrame(draw);
  }
  draw();

  const observer = new MutationObserver(() => {
    if (!document.contains(canvas)) {
      cancelAnimationFrame(animId);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
