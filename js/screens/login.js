// login.js — Premium futuristic auth screen with floating particles & glassmorphism
import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';

export function render(container) {
  container.innerHTML = `
    <div class="nv-auth login-screen" id="login-screen-root">
      <!-- Floating ambient orbs -->
      <div class="nv-auth-orb" style="top:-140px;left:-100px;width:360px;height:360px;background:rgba(108,92,231,0.3);"></div>
      <div class="nv-auth-orb" style="bottom:-120px;right:-80px;width:300px;height:300px;background:rgba(253,121,168,0.22);animation-delay:3s;"></div>
      <div class="nv-auth-orb" style="top:40%;left:-60px;width:200px;height:200px;background:rgba(0,206,201,0.15);animation-delay:1.5s;"></div>

      <!-- Floating particles canvas -->
      <canvas id="auth-particles" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.6;"></canvas>

      <div class="nv-auth-inner" style="z-index:3;">

        <!-- Logo -->
        <div class="auth-logo-section animate-fadeInDown">
          <div class="auth-logo-icon">
            <i data-lucide="sparkles" style="width:38px;height:38px;"></i>
          </div>
          <h1 class="auth-title">
            Nutri<span class="text-gradient" style="background:var(--gradient-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Vision AI</span>
          </h1>
          <p class="auth-subtitle">Your Intelligent Nutrition Companion</p>
        </div>

        <!-- Login Card -->
        <div class="auth-card login-form-card animate-fadeInUp" style="animation-delay:100ms;">
          <h3 class="auth-card-title">Welcome Back 👋</h3>

          <form id="login-form" autocomplete="on" novalidate>
            <div class="auth-input-group" style="margin-bottom:14px;">
              <label class="auth-input-label" for="login-email">Email</label>
              <div class="auth-input-wrapper">
                <i data-lucide="mail" class="auth-input-icon"></i>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  class="auth-input"
                  placeholder="alex@example.com"
                  autocomplete="email"
                  required
                />
              </div>
            </div>

            <div class="auth-input-group" style="margin-bottom:20px;">
              <label class="auth-input-label" for="login-password">Password</label>
              <div class="auth-input-wrapper">
                <i data-lucide="lock" class="auth-input-icon"></i>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  class="auth-input"
                  placeholder="••••••••"
                  autocomplete="current-password"
                  required
                />
                <button type="button" class="btn-toggle-pw" style="position:absolute;right:14px;background:none;border:none;color:var(--text-secondary);cursor:pointer;padding:4px;" aria-label="Toggle password visibility">
                  <i data-lucide="eye" class="pw-eye-icon" style="width:16px;height:16px;pointer-events:none;"></i>
                </button>
              </div>
            </div>

            <button type="submit" class="auth-submit-btn" id="login-submit-btn">
              <i data-lucide="log-in" style="width:18px;height:18px;"></i>
              Sign In
            </button>
          </form>
        </div>

        <!-- Footer -->
        <p class="auth-footer-text" style="animation-delay:250ms;">
          No account yet?
          <span class="auth-link" id="go-signup-link" role="button" tabindex="0">Create one →</span>
        </p>

        <button class="auth-guest-btn" id="btn-guest-login" type="button">
          Continue as Guest
        </button>

      </div>
    </div>
  `;

  // Icons
  if (window.lucide) window.lucide.createIcons();

  // Particles animation
  _initParticles(container.querySelector('#auth-particles'));

  // Password toggle
  const togglePwBtn = container.querySelector('.btn-toggle-pw');
  const pwInput = container.querySelector('#login-password');
  togglePwBtn?.addEventListener('click', () => {
    const isText = pwInput.type === 'text';
    pwInput.type = isText ? 'password' : 'text';
    const icon = togglePwBtn.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', isText ? 'eye' : 'eye-off');
      if (window.lucide) window.lucide.createIcons({ rootElement: togglePwBtn });
    }
  });

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

  // Form submit
  const form = container.querySelector('#login-form');
  const formCard = container.querySelector('.login-form-card');
  const submitBtn = container.querySelector('#login-submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const u = container.querySelector('#login-email').value.trim();
    const p = container.querySelector('#login-password').value;

    if (!u || !p) {
      showToast({ message: 'Please fill in all fields', type: 'warning' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u)) {
      showToast({ message: 'Please enter a valid email address', type: 'warning' });
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span style="width:18px;height:18px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:rotate 0.6s linear infinite;display:inline-block;"></span> Signing in…`;

    await new Promise(r => setTimeout(r, 350));

try {

    const response = await fetch(
        "http://localhost:5000/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: u,
                password: p
            })
        }
    );

    const data = await response.json();

    if (data.success) {

    localStorage.setItem(
        "currentUser",
        JSON.stringify(data.user)
    );

    localStorage.setItem(
        "isLoggedIn",
        "true"
    );

    showToast({
        message: "Login Successful",
        type: "success"
    });

    router.navigate("home");

} else {

        showToast({
            message: data.message,
            type: "error"
        });

        submitBtn.disabled = false;

    }

} catch (err) {

    console.error(err);

    showToast({
        message: "Server Error",
        type: "error"
    });

    submitBtn.disabled = false;
  }
  });
  // Signup link
  container.querySelector('#go-signup-link')?.addEventListener('click', () => {
    router.navigate('signup', { transition: 'slide-left' });
  });
  container.querySelector('#go-signup-link')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') router.navigate('signup', { transition: 'slide-left' });
  });

  // Guest login
  container.querySelector('#btn-guest-login')?.addEventListener('click', () => {
    store.setState({ session: 'Guest' });
    showToast({ message: 'Exploring as Guest 👀', type: 'info' });
    if (!store.isOnboarded()) {
      router.navigate('onboarding', { transition: 'fade' });
    } else {
      router.navigate('home', { transition: 'fade' });
    }
  });

}

function _initParticles(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let W = canvas.offsetWidth;
  let H = canvas.offsetHeight;
  canvas.width = W;
  canvas.height = H;

  const COLORS = ['#6c5ce7', '#00cec9', '#fd79a8', '#a29bfe', '#55efc4'];
  const particles = Array.from({ length: 28 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 3.5 + 1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.35 + 0.08,
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

  // Cleanup when navigating away
  canvas.addEventListener('disconnected', () => cancelAnimationFrame(animId));
  const observer = new MutationObserver(() => {
    if (!document.contains(canvas)) {
      cancelAnimationFrame(animId);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
