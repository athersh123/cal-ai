// store.js — NutriVision AI Reactive State Management (localStorage-backed)
// Real data only — no sample/demo seeding.

const STORAGE_KEY = 'nutrivision_state';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getDateStr(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function getStringHash(str) {
  if (!str) return '';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

function deepMerge(target, source) {
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

function getDefaultState() {
  return {
    version: 2,
    profile: { name: '', age: null, height: null, weight: null, goal: 'maintain', avatar: null },
    goals: { calories: 2000, protein: 120, carbs: 220, fat: 65, water: 2500 },
    meals: {},
    water: {},
    weightHistory: [],
    achievements: [],
    streak: { current: 0, best: 0, lastLogDate: null },
    settings: { theme: 'dark', notifications: true, reminders: true },
    onboarded: false,
    scanCount: 0,
    totalMealsLogged: 0,
    session: null,
    users: [],
    userProfiles: {}
  };
}

function getSessionKey() {
  return (state.session || '').toString().trim().toLowerCase();
}

// ── Hydrate state ──
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migration check: wipe if old model/no version or version < 2
      if (!parsed || typeof parsed !== 'object' || !parsed.version || parsed.version < 2) {
        console.log('[Store] Outdated/mock state detected, clearing to ensure 100% clean user data...');
        localStorage.removeItem(STORAGE_KEY);
        const fresh = getDefaultState();
        saveState(fresh);
        return fresh;
      }
      return deepMerge(getDefaultState(), parsed);
    }
  } catch (e) {
    console.warn('[Store] Failed to parse localStorage, using defaults.', e);
  }
  // First load: clean empty state — no demo data injected
  const fresh = getDefaultState();
  saveState(fresh);
  return fresh;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('[Store] Failed to save to localStorage', e);
  }
}

// ── Reactive store ──
let state = loadState();
const listeners = new Set();

function notify() {
  for (const fn of listeners) {
    try { fn(state); } catch (e) { console.error('[Store] Listener error', e); }
  }
}

export const store = {
  // ── Core ──
  getState() {
    return state;
  },

  setState(partial) {
    state = deepMerge(state, partial);
    saveState(state);
    notify();
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // ── Profile ──
  getProfile() {
    return state.profile;
  },
  setProfile(p) {
    const updatedProfile = { ...state.profile, ...p };
    const sessionKey = getSessionKey();
    if (sessionKey) {
      store.setState({
        profile: updatedProfile,
        userProfiles: { ...(state.userProfiles || {}), [sessionKey]: updatedProfile },
      });
      return;
    }

    store.setState({ profile: updatedProfile });
  },

  // ── Goals ──
  getGoals() {
    return state.goals;
  },
  setGoals(g) {
    store.setState({ goals: { ...state.goals, ...g } });
  },

  // ── Meals ──
  addMeal(date, mealType, foods) {
    const d = date || getToday();
    const currentMeals = state.meals[d] || { breakfast: [], lunch: [], dinner: [], snacks: [] };
    
    // Process new foods and check for duplicates
    const newFoods = foods.map(f => {
      const computedHash = f.imageHash || (f.thumbDataUrl ? getStringHash(f.thumbDataUrl) : '');
      const captured = f.capturedAt || new Date().toISOString();
      
      // Perform duplicate validation check
      if (store.checkDuplicateMeal(d, f.id, computedHash, captured)) {
        throw new Error(`Duplicate entry detected for food: "${f.name}". It is already logged!`);
      }
      
      return {
        ...f,
        mealId: f.mealId || generateId(),
        imageHash: computedHash,
        capturedAt: captured
      };
    });

    const updatedType = [...currentMeals[mealType], ...newFoods];

    store.setState({
      meals: {
        ...state.meals,
        [d]: { ...currentMeals, [mealType]: updatedType },
      },
      totalMealsLogged: (state.totalMealsLogged || 0) + newFoods.length,
    });

    // Update streak & check achievements
    store.updateStreak();
    store.checkAndUnlockAchievements();
  },

  checkDuplicateMeal(date, foodId, imageHash, timestamp) {
    const d = date || getToday();
    const todayMeals = store.getMeals(d);
    const allFoods = [
      ...todayMeals.breakfast,
      ...todayMeals.lunch,
      ...todayMeals.dinner,
      ...todayMeals.snacks
    ];

    for (const f of allFoods) {
      // 1. Check if image hash is identical
      if (imageHash && f.imageHash === imageHash) {
        return true;
      }
      // 2. Check if food ID matches AND timestamp is within 5 minutes (300,000 ms)
      if (f.id === foodId && timestamp && f.capturedAt) {
        const t1 = new Date(timestamp).getTime();
        const t2 = new Date(f.capturedAt).getTime();
        if (Math.abs(t1 - t2) < 5 * 60 * 1000) {
          return true;
        }
      }
    }
    return false;
  },

  removeMeal(date, mealType, mealId) {
    const d = date || getToday();
    const currentMeals = state.meals[d];
    if (!currentMeals || !currentMeals[mealType]) return;

    const filtered = currentMeals[mealType].filter(f => f.mealId !== mealId);
    store.setState({
      meals: {
        ...state.meals,
        [d]: { ...currentMeals, [mealType]: filtered },
      },
    });
  },

  getMeals(date) {
    const d = date || getToday();
    return state.meals[d] || { breakfast: [], lunch: [], dinner: [], snacks: [] };
  },

  getTodayMeals() {
    return store.getMeals(getToday());
  },

  getDayTotals(date) {
    const meals = store.getMeals(date);
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };

    for (const type of ['breakfast', 'lunch', 'dinner', 'snacks']) {
      for (const food of meals[type]) {
        totals.calories += food.calories || 0;
        totals.protein += food.protein || 0;
        totals.carbs += food.carbs || 0;
        totals.fat += food.fat || 0;
      }
    }

    return {
      calories: Math.round(totals.calories),
      protein: Math.round(totals.protein),
      carbs: Math.round(totals.carbs),
      fat: Math.round(totals.fat),
    };
  },

  getTodayTotals() {
    return store.getDayTotals(getToday());
  },

  // ── Week / Month Data ──
  getWeekData() {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = getDateStr(i);
      const totals = store.getDayTotals(date);
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const d = new Date(date + 'T12:00:00');
      data.push({
        date,
        label: dayNames[d.getDay()],
        ...totals,
      });
    }
    return data;
  },

  // Returns true if any real meals have been logged in the past N days
  hasAnyData(days = 30) {
    for (let i = 0; i < days; i++) {
      const date = getDateStr(i);
      const meals = store.getMeals(date);
      const total = meals.breakfast.length + meals.lunch.length + meals.dinner.length + meals.snacks.length;
      if (total > 0) return true;
    }
    return false;
  },

  getMonthData() {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = getDateStr(i);
      const totals = store.getDayTotals(date);
      data.push({ date, ...totals });
    }
    return data;
  },

  // ── Water ──
  addWater(ml, date) {
    const d = date || getToday();
    const current = state.water[d] || 0;
    store.setState({
      water: { ...state.water, [d]: current + ml },
    });
    store.checkAndUnlockAchievements();
  },

  getWater(date) {
    const d = date || getToday();
    return state.water[d] || 0;
  },

  // ── Weight ──
  logWeight(weight, date) {
    const d = date || getToday();
    const history = [...(state.weightHistory || [])];
    const existing = history.findIndex(w => w.date === d);
    if (existing >= 0) {
      history[existing] = { date: d, weight };
    } else {
      history.push({ date: d, weight });
    }
    history.sort((a, b) => a.date.localeCompare(b.date));
    store.setState({ weightHistory: history });
    store.checkAndUnlockAchievements();
  },

  getWeightHistory() {
    return state.weightHistory || [];
  },

  // ── Streaks ──
  getStreak() {
    return state.streak;
  },

  updateStreak() {
    const today = getToday();
    const streak = { ...state.streak };
    const todayMeals = store.getMeals(today);
    const hasMealsToday =
      todayMeals.breakfast.length +
      todayMeals.lunch.length +
      todayMeals.dinner.length +
      todayMeals.snacks.length > 0;

    if (!hasMealsToday) return;

    if (streak.lastLogDate === today) return; // already counted today

    const yesterday = getDateStr(1);
    if (streak.lastLogDate === yesterday) {
      streak.current += 1;
    } else if (streak.lastLogDate !== today) {
      streak.current = 1;
    }

    streak.lastLogDate = today;
    streak.best = Math.max(streak.best, streak.current);

    store.setState({ streak });
  },

  // ── Achievements ──
  getUnlockedAchievements() {
    return state.achievements || [];
  },

  unlockAchievement(id) {
    const already = (state.achievements || []).find(a => a.id === id);
    if (already) return;
    store.setState({
      achievements: [...(state.achievements || []), { id, unlockedAt: getToday() }],
    });
  },

  // Auto-check and unlock any newly earned achievements based on real data
  checkAndUnlockAchievements() {
    const checker = window.__nvAchievementChecker;
    if (typeof checker !== 'function') return;

    const streak = store.getStreak();
    const totalMeals = store.getTotalMealsLogged();
    const scans = store.getScanCount();
    const goals = store.getGoals();
    const weights = (state.weightHistory || []).length;
    const unlocked = (state.achievements || []).map(a => a.id);

    let caloriesGoalDays = 0;
    let waterGoalDays = 0;
    for (let i = 0; i < 90; i++) {
      const date = getDateStr(i);
      const t = store.getDayTotals(date);
      if (t.calories > 0 && t.calories <= goals.calories * 1.05) caloriesGoalDays++;
      const w = store.getWater(date);
      if (w >= goals.water) waterGoalDays++;
    }

    const newIds = checker({
      currentStreak: streak.current,
      totalMealsLogged: totalMeals,
      caloriesGoalDays,
      waterGoalDays,
      weightLogCount: weights,
      scanCount: scans,
      unlockedIds: unlocked,
    });

    for (const id of newIds) {
      store.unlockAchievement(id);
    }
  },

  // ── Stats ──
  incrementScanCount() {
    store.setState({ scanCount: (state.scanCount || 0) + 1 });
    store.checkAndUnlockAchievements();
  },

  getScanCount() {
    return state.scanCount || 0;
  },

  getTotalMealsLogged() {
    return state.totalMealsLogged || 0;
  },

  // ── App ──
  isOnboarded() {
    return !!state.onboarded;
  },

  completeOnboarding() {
    // Mark onboarded — NO demo/sample data is injected.
    // Only real user logs will populate the app.
    store.setState({ onboarded: true });
  },

  getTheme() {
    return state.settings?.theme || 'dark';
  },

  setTheme(theme) {
    store.setState({
      settings: { ...state.settings, theme },
    });
  },

  // ── Utilities ──
  resetState() {
    state = getDefaultState();
    saveState(state);
    notify();
  },

  // ── Authentication ──
  login(username, password) {
    const user = (state.users || []).find(u => u.username.toLowerCase() === username.toLowerCase());
    if (user && user.password === password) {
      const sessionKey = user.username.toLowerCase();
      const existingProfile = (state.userProfiles || {})[sessionKey];
      const nextProfile = existingProfile || { ...getDefaultState().profile, name: user.username };
      store.setState({
        session: user.username,
        profile: nextProfile,
        userProfiles: { ...(state.userProfiles || {}), [sessionKey]: nextProfile },
      });
      return true;
    }
    // Allow login when no users registered (frictionless first-time login)
    if ((state.users || []).length === 0) {
      const newUser = { username, password };
      const sessionKey = username.toLowerCase();
      const existingProfile = (state.userProfiles || {})[sessionKey];
      const nextProfile = existingProfile || { ...getDefaultState().profile, name: username };
      store.setState({
        users: [newUser],
        session: username,
        profile: nextProfile,
        userProfiles: { ...(state.userProfiles || {}), [sessionKey]: nextProfile },
      });
      return true;
    }
    return false;
  },

  signup(username, password) {
    const exists = (state.users || []).some(u => u.username.toLowerCase() === username.toLowerCase());
    if (exists) return false;

    const newUser = { username, password };
    const sessionKey = username.toLowerCase();
    const existingProfile = (state.userProfiles || {})[sessionKey];
    const nextProfile = existingProfile || { ...getDefaultState().profile, name: username };
    store.setState({
      users: [...(state.users || []), newUser],
      session: username,
      profile: nextProfile,
      userProfiles: { ...(state.userProfiles || {}), [sessionKey]: nextProfile },
    });
    return true;
  },

  logout() {
    store.setState({ session: null });
  },

  isAuthenticated() {
    return !!state.session;
  }
};
