// store.js — NutriVision AI Reactive State Management (localStorage-backed)

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

// ── Sample data generator ──
function buildSampleData() {
  const today = getToday();
  const meals = {};
  const water = {};

  // Sample food pools (id references to food-db, but we store full food objects inline)
  const sampleFoods = {
    breakfast: [
      { id: 'eggs', name: 'Eggs', category: 'protein', calories: 156, protein: 12.6, carbs: 1.2, fat: 10.6, fiber: 0, serving: 2, servingUnit: 'large', icon: '🥚', confidence: 0.98 },
      { id: 'oatmeal', name: 'Oatmeal', category: 'grain', calories: 154, protein: 5.3, carbs: 27, fat: 2.6, fiber: 4.0, serving: 234, servingUnit: 'g', icon: '🥣', confidence: 0.95 },
      { id: 'banana', name: 'Banana', category: 'fruit', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1, serving: 1, servingUnit: 'medium', icon: '🍌', confidence: 0.98 },
      { id: 'coffee_black', name: 'Black Coffee', category: 'beverage', calories: 2, protein: 0.3, carbs: 0, fat: 0, fiber: 0, serving: 240, servingUnit: 'ml', icon: '☕', confidence: 0.97 },
      { id: 'greek_yogurt', name: 'Greek Yogurt', category: 'dairy', calories: 100, protein: 17, carbs: 6, fat: 0.7, fiber: 0, serving: 170, servingUnit: 'g', icon: '🥛', confidence: 0.95 },
      { id: 'bread_wheat', name: 'Wheat Bread', category: 'grain', calories: 79, protein: 4.0, carbs: 15, fat: 1.0, fiber: 1.9, serving: 1, servingUnit: 'slice', icon: '🍞', confidence: 0.96 },
      { id: 'pancakes', name: 'Pancakes', category: 'meal', calories: 280, protein: 8, carbs: 40, fat: 10, fiber: 1.5, serving: 3, servingUnit: 'pieces', icon: '🥞', confidence: 0.96 },
    ],
    lunch: [
      { id: 'chicken_breast', name: 'Chicken Breast', category: 'protein', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, serving: 100, servingUnit: 'g', icon: '🍗', confidence: 0.96 },
      { id: 'white_rice', name: 'White Rice', category: 'grain', calories: 206, protein: 4.3, carbs: 45, fat: 0.4, fiber: 0.6, serving: 158, servingUnit: 'g', icon: '🍚', confidence: 0.95 },
      { id: 'caesar_salad', name: 'Caesar Salad', category: 'meal', calories: 180, protein: 7, carbs: 8, fat: 14, fiber: 3.0, serving: 1, servingUnit: 'bowl', icon: '🥗', confidence: 0.94 },
      { id: 'sandwich', name: 'Turkey Sandwich', category: 'meal', calories: 350, protein: 24, carbs: 35, fat: 12, fiber: 3.0, serving: 1, servingUnit: 'sandwich', icon: '🥪', confidence: 0.95 },
      { id: 'broccoli', name: 'Broccoli', category: 'vegetable', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, fiber: 5.1, serving: 150, servingUnit: 'g', icon: '🥦', confidence: 0.96 },
    ],
    dinner: [
      { id: 'salmon', name: 'Salmon Fillet', category: 'protein', calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, serving: 100, servingUnit: 'g', icon: '🐟', confidence: 0.95 },
      { id: 'pasta', name: 'Pasta (cooked)', category: 'grain', calories: 220, protein: 8.1, carbs: 43, fat: 1.3, fiber: 2.5, serving: 140, servingUnit: 'g', icon: '🍝', confidence: 0.94 },
      { id: 'beef_steak', name: 'Beef Steak', category: 'protein', calories: 271, protein: 26, carbs: 0, fat: 18, fiber: 0, serving: 100, servingUnit: 'g', icon: '🥩', confidence: 0.95 },
      { id: 'sweet_potato', name: 'Sweet Potato', category: 'vegetable', calories: 103, protein: 2.3, carbs: 24, fat: 0.1, fiber: 3.8, serving: 1, servingUnit: 'medium', icon: '🍠', confidence: 0.94 },
      { id: 'grilled_chicken_salad', name: 'Grilled Chicken Salad', category: 'meal', calories: 320, protein: 35, carbs: 12, fat: 15, fiber: 4.0, serving: 1, servingUnit: 'bowl', icon: '🥗', confidence: 0.94 },
    ],
    snacks: [
      { id: 'almonds', name: 'Almonds', category: 'snack', calories: 164, protein: 6.0, carbs: 6, fat: 14, fiber: 3.5, serving: 28, servingUnit: 'g', icon: '🥜', confidence: 0.94 },
      { id: 'apple', name: 'Apple', category: 'fruit', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4, serving: 1, servingUnit: 'medium', icon: '🍎', confidence: 0.97 },
      { id: 'protein_bar', name: 'Protein Bar', category: 'snack', calories: 210, protein: 20, carbs: 22, fat: 7, fiber: 3.0, serving: 1, servingUnit: 'bar', icon: '🍫', confidence: 0.92 },
    ],
  };

  function pickRandom(arr, count) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(f => ({ ...f, mealId: generateId() }));
  }

  // Generate 7 days of data (today + last 6 days)
  for (let i = 0; i < 7; i++) {
    const date = getDateStr(i);
    meals[date] = {
      breakfast: pickRandom(sampleFoods.breakfast, i === 0 ? 3 : 2 + Math.floor(Math.random() * 2)),
      lunch: pickRandom(sampleFoods.lunch, 2 + Math.floor(Math.random() * 2)),
      dinner: i === 0 ? [] : pickRandom(sampleFoods.dinner, 2 + Math.floor(Math.random() * 2)),
      snacks: Math.random() > 0.3 ? pickRandom(sampleFoods.snacks, 1 + Math.floor(Math.random() * 2)) : [],
    };

    // Water: 1500-2600ml
    water[date] = 1500 + Math.floor(Math.random() * 1100);
  }

  // Make today's water a bit lower so the tracker is interesting
  water[today] = 1200;

  // Weight history over 7 days showing slight progress
  const weightHistory = [];
  for (let i = 6; i >= 0; i--) {
    weightHistory.push({
      date: getDateStr(i),
      weight: parseFloat((72.5 - i * 0.08 + (Math.random() * 0.4 - 0.2)).toFixed(1)),
    });
  }

  // Count total meals
  let totalMeals = 0;
  for (const date of Object.keys(meals)) {
    for (const type of ['breakfast', 'lunch', 'dinner', 'snacks']) {
      totalMeals += meals[date][type].length;
    }
  }

  return {
    profile: { name: 'Alex', age: 28, height: 175, weight: 72, goal: 'maintain', avatar: null },
    goals: { calories: 2200, protein: 150, carbs: 250, fat: 75, water: 2500 },
    meals,
    water,
    weightHistory,
    achievements: [
      { id: 'streak_3', unlockedAt: getDateStr(2) },
      { id: 'meals_10', unlockedAt: getDateStr(3) },
      { id: 'weight_1', unlockedAt: getDateStr(5) },
      { id: 'scan_1', unlockedAt: getDateStr(4) },
    ],
    streak: { current: 7, best: 7, lastLogDate: getToday() },
    settings: { theme: 'dark', notifications: true, reminders: true },
    onboarded: true,
    scanCount: 3,
    totalMealsLogged: totalMeals,
  };
}

function getDefaultState() {
  return {
    profile: { name: 'Alex', age: 28, height: 175, weight: 72, goal: 'maintain', avatar: null },
    goals: { calories: 2200, protein: 150, carbs: 250, fat: 75, water: 2500 },
    meals: {},
    water: {},
    weightHistory: [],
    achievements: [],
    streak: { current: 0, best: 0, lastLogDate: null },
    settings: { theme: 'dark', notifications: true, reminders: true },
    onboarded: false,
    scanCount: 0,
    totalMealsLogged: 0,
    session: null, // Holds the username if logged in
    users: [], // Registered users list { username, password }
    userProfiles: {} // Per-user profiles keyed by username (lowercased)
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
      return deepMerge(getDefaultState(), parsed);
    }
  } catch (e) {
    console.warn('[Store] Failed to parse localStorage, using defaults.', e);
  }
  // First load: populate with sample data
  const sample = buildSampleData();
  saveState(sample);
  return sample;
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
    const newFoods = foods.map(f => ({ ...f, mealId: f.mealId || generateId() }));
    const updatedType = [...currentMeals[mealType], ...newFoods];

    store.setState({
      meals: {
        ...state.meals,
        [d]: { ...currentMeals, [mealType]: updatedType },
      },
      totalMealsLogged: (state.totalMealsLogged || 0) + newFoods.length,
    });

    // Update streak
    store.updateStreak();
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

  // ── Stats ──
  incrementScanCount() {
    store.setState({ scanCount: (state.scanCount || 0) + 1 });
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
    // When completing onboarding, populate with sample data
    const sample = buildSampleData();
    sample.onboarded = true;
    // Keep any profile changes the user may have made during onboarding
    sample.profile = { ...sample.profile, ...state.profile };
    sample.goals = { ...sample.goals, ...state.goals };
    sample.settings = { ...sample.settings, ...state.settings };
    state = sample;
    saveState(state);
    notify();
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
      const nextProfile = existingProfile || { ...state.profile, name: user.username };
      store.setState({
        session: user.username,
        profile: nextProfile,
        userProfiles: { ...(state.userProfiles || {}), [sessionKey]: nextProfile },
      });
      return true;
    }
    // Simple mock authentication for testing: if no users are registered, allow any login to make testing frictionless!
    if ((state.users || []).length === 0) {
      const newUser = { username, password };
      const sessionKey = username.toLowerCase();
      const existingProfile = (state.userProfiles || {})[sessionKey];
      const nextProfile = existingProfile || { ...state.profile, name: username };
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
    const nextProfile = existingProfile || { ...state.profile, name: username };
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
