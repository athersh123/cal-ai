// food-db.js — NutriVision AI Food Database
// 55+ food items with nutritional info, fuzzy search, and random meal generator

export const foodDatabase = [
  // ── Fruits ──
  { id: 'apple',        name: 'Apple',            category: 'fruit',     calories: 95,  protein: 0.5,  carbs: 25,   fat: 0.3,  fiber: 4.4, serving: 1,   servingUnit: 'medium', icon: '🍎', confidence: 0.97 },
  { id: 'banana',       name: 'Banana',           category: 'fruit',     calories: 105, protein: 1.3,  carbs: 27,   fat: 0.4,  fiber: 3.1, serving: 1,   servingUnit: 'medium', icon: '🍌', confidence: 0.98 },
  { id: 'orange',       name: 'Orange',           category: 'fruit',     calories: 62,  protein: 1.2,  carbs: 15,   fat: 0.2,  fiber: 3.1, serving: 1,   servingUnit: 'medium', icon: '🍊', confidence: 0.96 },
  { id: 'strawberries', name: 'Strawberries',     category: 'fruit',     calories: 49,  protein: 1.0,  carbs: 12,   fat: 0.5,  fiber: 3.0, serving: 150, servingUnit: 'g',      icon: '🍓', confidence: 0.95 },
  { id: 'blueberries',  name: 'Blueberries',      category: 'fruit',     calories: 85,  protein: 1.1,  carbs: 21,   fat: 0.5,  fiber: 3.6, serving: 150, servingUnit: 'g',      icon: '🫐', confidence: 0.93 },
  { id: 'grapes',       name: 'Grapes',           category: 'fruit',     calories: 104, protein: 1.1,  carbs: 27,   fat: 0.2,  fiber: 1.4, serving: 150, servingUnit: 'g',      icon: '🍇', confidence: 0.94 },
  { id: 'watermelon',   name: 'Watermelon',       category: 'fruit',     calories: 86,  protein: 1.7,  carbs: 22,   fat: 0.4,  fiber: 1.1, serving: 280, servingUnit: 'g',      icon: '🍉', confidence: 0.96 },
  { id: 'mango',        name: 'Mango',            category: 'fruit',     calories: 99,  protein: 1.4,  carbs: 25,   fat: 0.6,  fiber: 2.6, serving: 165, servingUnit: 'g',      icon: '🥭', confidence: 0.95 },
  { id: 'pineapple',    name: 'Pineapple',        category: 'fruit',     calories: 82,  protein: 0.9,  carbs: 22,   fat: 0.2,  fiber: 2.3, serving: 165, servingUnit: 'g',      icon: '🍍', confidence: 0.94 },
  { id: 'avocado',      name: 'Avocado',          category: 'fruit',     calories: 240, protein: 3.0,  carbs: 13,   fat: 22,   fiber: 10,  serving: 1,   servingUnit: 'whole',  icon: '🥑', confidence: 0.97 },

  // ── Vegetables ──
  { id: 'broccoli',     name: 'Broccoli',         category: 'vegetable', calories: 55,  protein: 3.7,  carbs: 11,   fat: 0.6,  fiber: 5.1, serving: 150, servingUnit: 'g',      icon: '🥦', confidence: 0.96 },
  { id: 'spinach',      name: 'Spinach',          category: 'vegetable', calories: 23,  protein: 2.9,  carbs: 3.6,  fat: 0.4,  fiber: 2.2, serving: 100, servingUnit: 'g',      icon: '🥬', confidence: 0.93 },
  { id: 'carrot',       name: 'Carrot',           category: 'vegetable', calories: 41,  protein: 0.9,  carbs: 10,   fat: 0.2,  fiber: 2.8, serving: 1,   servingUnit: 'medium', icon: '🥕', confidence: 0.95 },
  { id: 'tomato',       name: 'Tomato',           category: 'vegetable', calories: 22,  protein: 1.1,  carbs: 4.8,  fat: 0.2,  fiber: 1.5, serving: 1,   servingUnit: 'medium', icon: '🍅', confidence: 0.96 },
  { id: 'sweet_potato', name: 'Sweet Potato',     category: 'vegetable', calories: 103, protein: 2.3,  carbs: 24,   fat: 0.1,  fiber: 3.8, serving: 1,   servingUnit: 'medium', icon: '🍠', confidence: 0.94 },
  { id: 'corn',         name: 'Corn on the Cob',  category: 'vegetable', calories: 88,  protein: 3.3,  carbs: 19,   fat: 1.4,  fiber: 2.0, serving: 1,   servingUnit: 'ear',    icon: '🌽', confidence: 0.95 },
  { id: 'cucumber',     name: 'Cucumber',         category: 'vegetable', calories: 16,  protein: 0.7,  carbs: 3.6,  fat: 0.1,  fiber: 0.5, serving: 100, servingUnit: 'g',      icon: '🥒', confidence: 0.94 },

  // ── Grains ──
  { id: 'white_rice',   name: 'White Rice',       category: 'grain',     calories: 206, protein: 4.3,  carbs: 45,   fat: 0.4,  fiber: 0.6, serving: 158, servingUnit: 'g',      icon: '🍚', confidence: 0.95 },
  { id: 'brown_rice',   name: 'Brown Rice',       category: 'grain',     calories: 216, protein: 5.0,  carbs: 45,   fat: 1.8,  fiber: 3.5, serving: 158, servingUnit: 'g',      icon: '🍚', confidence: 0.92 },
  { id: 'pasta',        name: 'Pasta (cooked)',    category: 'grain',     calories: 220, protein: 8.1,  carbs: 43,   fat: 1.3,  fiber: 2.5, serving: 140, servingUnit: 'g',      icon: '🍝', confidence: 0.94 },
  { id: 'bread_wheat',  name: 'Wheat Bread',      category: 'grain',     calories: 79,  protein: 4.0,  carbs: 15,   fat: 1.0,  fiber: 1.9, serving: 1,   servingUnit: 'slice',  icon: '🍞', confidence: 0.96 },
  { id: 'oatmeal',      name: 'Oatmeal',          category: 'grain',     calories: 154, protein: 5.3,  carbs: 27,   fat: 2.6,  fiber: 4.0, serving: 234, servingUnit: 'g',      icon: '🥣', confidence: 0.95 },
  { id: 'tortilla',     name: 'Flour Tortilla',   category: 'grain',     calories: 146, protein: 3.8,  carbs: 25,   fat: 3.6,  fiber: 1.6, serving: 1,   servingUnit: 'large',  icon: '🫓', confidence: 0.93 },
  { id: 'granola',      name: 'Granola',          category: 'grain',     calories: 196, protein: 4.7,  carbs: 32,   fat: 7.2,  fiber: 3.0, serving: 45,  servingUnit: 'g',      icon: '🥣', confidence: 0.91 },

  // ── Protein ──
  { id: 'chicken_breast', name: 'Chicken Breast',  category: 'protein',   calories: 165, protein: 31,   carbs: 0,    fat: 3.6,  fiber: 0,   serving: 100, servingUnit: 'g',      icon: '🍗', confidence: 0.96 },
  { id: 'salmon',       name: 'Salmon Fillet',    category: 'protein',   calories: 208, protein: 20,   carbs: 0,    fat: 13,   fiber: 0,   serving: 100, servingUnit: 'g',      icon: '🐟', confidence: 0.95 },
  { id: 'eggs',         name: 'Eggs',             category: 'protein',   calories: 78,  protein: 6.3,  carbs: 0.6,  fat: 5.3,  fiber: 0,   serving: 1,   servingUnit: 'large',  icon: '🥚', confidence: 0.98 },
  { id: 'beef_steak',   name: 'Beef Steak',       category: 'protein',   calories: 271, protein: 26,   carbs: 0,    fat: 18,   fiber: 0,   serving: 100, servingUnit: 'g',      icon: '🥩', confidence: 0.95 },
  { id: 'tofu',         name: 'Tofu',             category: 'protein',   calories: 76,  protein: 8.0,  carbs: 1.9,  fat: 4.8,  fiber: 0.3, serving: 100, servingUnit: 'g',      icon: '🧈', confidence: 0.90 },
  { id: 'tuna',         name: 'Tuna (canned)',    category: 'protein',   calories: 132, protein: 29,   carbs: 0,    fat: 1.0,  fiber: 0,   serving: 100, servingUnit: 'g',      icon: '🐟', confidence: 0.93 },
  { id: 'shrimp',       name: 'Shrimp',           category: 'protein',   calories: 99,  protein: 24,   carbs: 0.2,  fat: 0.3,  fiber: 0,   serving: 100, servingUnit: 'g',      icon: '🦐', confidence: 0.94 },
  { id: 'turkey_breast', name: 'Turkey Breast',   category: 'protein',   calories: 135, protein: 30,   carbs: 0,    fat: 1.0,  fiber: 0,   serving: 100, servingUnit: 'g',      icon: '🦃', confidence: 0.93 },

  // ── Dairy ──
  { id: 'milk_whole',   name: 'Whole Milk',       category: 'dairy',     calories: 149, protein: 8.0,  carbs: 12,   fat: 8.0,  fiber: 0,   serving: 240, servingUnit: 'ml',     icon: '🥛', confidence: 0.97 },
  { id: 'greek_yogurt', name: 'Greek Yogurt',     category: 'dairy',     calories: 100, protein: 17,   carbs: 6,    fat: 0.7,  fiber: 0,   serving: 170, servingUnit: 'g',      icon: '🥛', confidence: 0.95 },
  { id: 'cheddar',      name: 'Cheddar Cheese',   category: 'dairy',     calories: 113, protein: 7.0,  carbs: 0.4,  fat: 9.3,  fiber: 0,   serving: 28,  servingUnit: 'g',      icon: '🧀', confidence: 0.96 },
  { id: 'cottage_cheese', name: 'Cottage Cheese', category: 'dairy',     calories: 98,  protein: 11,   carbs: 3.4,  fat: 4.3,  fiber: 0,   serving: 113, servingUnit: 'g',      icon: '🧀', confidence: 0.91 },
  { id: 'butter',       name: 'Butter',           category: 'dairy',     calories: 102, protein: 0.1,  carbs: 0,    fat: 12,   fiber: 0,   serving: 14,  servingUnit: 'g',      icon: '🧈', confidence: 0.95 },

  // ── Snacks ──
  { id: 'almonds',      name: 'Almonds',          category: 'snack',     calories: 164, protein: 6.0,  carbs: 6,    fat: 14,   fiber: 3.5, serving: 28,  servingUnit: 'g',      icon: '🥜', confidence: 0.94 },
  { id: 'peanut_butter', name: 'Peanut Butter',   category: 'snack',     calories: 188, protein: 7.0,  carbs: 6,    fat: 16,   fiber: 1.9, serving: 32,  servingUnit: 'g',      icon: '🥜', confidence: 0.95 },
  { id: 'protein_bar',  name: 'Protein Bar',      category: 'snack',     calories: 210, protein: 20,   carbs: 22,   fat: 7,    fiber: 3.0, serving: 1,   servingUnit: 'bar',    icon: '🍫', confidence: 0.92 },
  { id: 'dark_chocolate', name: 'Dark Chocolate', category: 'snack',     calories: 170, protein: 2.2,  carbs: 13,   fat: 12,   fiber: 3.1, serving: 30,  servingUnit: 'g',      icon: '🍫', confidence: 0.93 },
  { id: 'chips',        name: 'Potato Chips',     category: 'snack',     calories: 152, protein: 2.0,  carbs: 15,   fat: 10,   fiber: 1.2, serving: 28,  servingUnit: 'g',      icon: '🥔', confidence: 0.94 },
  { id: 'trail_mix',    name: 'Trail Mix',        category: 'snack',     calories: 175, protein: 4.5,  carbs: 16,   fat: 11,   fiber: 2.0, serving: 35,  servingUnit: 'g',      icon: '🥜', confidence: 0.90 },

  // ── Beverages ──
  { id: 'coffee_black', name: 'Black Coffee',     category: 'beverage',  calories: 2,   protein: 0.3,  carbs: 0,    fat: 0,    fiber: 0,   serving: 240, servingUnit: 'ml',     icon: '☕', confidence: 0.97 },
  { id: 'latte',        name: 'Latte',            category: 'beverage',  calories: 190, protein: 13,   carbs: 19,   fat: 7,    fiber: 0,   serving: 480, servingUnit: 'ml',     icon: '☕', confidence: 0.94 },
  { id: 'orange_juice', name: 'Orange Juice',     category: 'beverage',  calories: 112, protein: 1.7,  carbs: 26,   fat: 0.5,  fiber: 0.5, serving: 240, servingUnit: 'ml',     icon: '🧃', confidence: 0.96 },
  { id: 'smoothie',     name: 'Fruit Smoothie',   category: 'beverage',  calories: 230, protein: 4.0,  carbs: 44,   fat: 3.5,  fiber: 4.0, serving: 350, servingUnit: 'ml',     icon: '🥤', confidence: 0.89 },
  { id: 'protein_shake', name: 'Protein Shake',   category: 'beverage',  calories: 160, protein: 30,   carbs: 5,    fat: 2.5,  fiber: 1.0, serving: 350, servingUnit: 'ml',     icon: '🥤', confidence: 0.91 },
  { id: 'green_tea',    name: 'Green Tea',        category: 'beverage',  calories: 2,   protein: 0,    carbs: 0,    fat: 0,    fiber: 0,   serving: 240, servingUnit: 'ml',     icon: '🍵', confidence: 0.96 },

  // ── Meals ──
  { id: 'pizza_slice',  name: 'Pizza Slice',      category: 'meal',      calories: 285, protein: 12,   carbs: 36,   fat: 10,   fiber: 2.5, serving: 1,   servingUnit: 'slice',  icon: '🍕', confidence: 0.97 },
  { id: 'burger',       name: 'Hamburger',        category: 'meal',      calories: 354, protein: 20,   carbs: 29,   fat: 17,   fiber: 1.3, serving: 1,   servingUnit: 'burger', icon: '🍔', confidence: 0.96 },
  { id: 'sushi_roll',   name: 'Sushi Roll',       category: 'meal',      calories: 200, protein: 9,    carbs: 38,   fat: 1.0,  fiber: 1.0, serving: 6,   servingUnit: 'pieces', icon: '🍣', confidence: 0.93 },
  { id: 'caesar_salad', name: 'Caesar Salad',     category: 'meal',      calories: 180, protein: 7,    carbs: 8,    fat: 14,   fiber: 3.0, serving: 1,   servingUnit: 'bowl',   icon: '🥗', confidence: 0.94 },
  { id: 'burrito',      name: 'Burrito',          category: 'meal',      calories: 430, protein: 22,   carbs: 51,   fat: 14,   fiber: 6.0, serving: 1,   servingUnit: 'large',  icon: '🌯', confidence: 0.93 },
  { id: 'ramen',        name: 'Ramen Bowl',       category: 'meal',      calories: 436, protein: 16,   carbs: 60,   fat: 14,   fiber: 2.5, serving: 1,   servingUnit: 'bowl',   icon: '🍜', confidence: 0.92 },
  { id: 'grilled_chicken_salad', name: 'Grilled Chicken Salad', category: 'meal', calories: 320, protein: 35, carbs: 12, fat: 15, fiber: 4.0, serving: 1, servingUnit: 'bowl', icon: '🥗', confidence: 0.94 },
  { id: 'sandwich',     name: 'Turkey Sandwich',  category: 'meal',      calories: 350, protein: 24,   carbs: 35,   fat: 12,   fiber: 3.0, serving: 1,   servingUnit: 'sandwich', icon: '🥪', confidence: 0.95 },
  { id: 'pancakes',     name: 'Pancakes',         category: 'meal',      calories: 280, protein: 8,    carbs: 40,   fat: 10,   fiber: 1.5, serving: 3,   servingUnit: 'pieces', icon: '🥞', confidence: 0.96 },
  { id: 'tacos',        name: 'Tacos',            category: 'meal',      calories: 210, protein: 11,   carbs: 21,   fat: 10,   fiber: 2.0, serving: 1,   servingUnit: 'taco',   icon: '🌮', confidence: 0.95 },
  { id: 'fried_rice',   name: 'Fried Rice',       category: 'meal',      calories: 238, protein: 5.5,  carbs: 34,   fat: 9,    fiber: 1.0, serving: 200, servingUnit: 'g',      icon: '🍳', confidence: 0.91 },
  { id: 'mac_cheese',   name: 'Mac & Cheese',     category: 'meal',      calories: 310, protein: 11,   carbs: 38,   fat: 13,   fiber: 1.5, serving: 200, servingUnit: 'g',      icon: '🧀', confidence: 0.93 },
];

// ── Meal-type mappings for getRandomMeal ──
const mealTypeFoods = {
  breakfast: ['eggs', 'oatmeal', 'banana', 'greek_yogurt', 'coffee_black', 'latte', 'pancakes', 'bread_wheat', 'granola', 'orange_juice', 'apple', 'blueberries', 'milk_whole', 'peanut_butter', 'avocado', 'smoothie'],
  lunch: ['chicken_breast', 'caesar_salad', 'sandwich', 'white_rice', 'sushi_roll', 'burrito', 'tacos', 'grilled_chicken_salad', 'pasta', 'broccoli', 'tomato', 'corn', 'tuna', 'bread_wheat'],
  dinner: ['salmon', 'beef_steak', 'chicken_breast', 'white_rice', 'brown_rice', 'pasta', 'broccoli', 'sweet_potato', 'pizza_slice', 'ramen', 'fried_rice', 'burger', 'mac_cheese', 'spinach', 'shrimp', 'turkey_breast'],
  snack: ['almonds', 'protein_bar', 'dark_chocolate', 'chips', 'trail_mix', 'apple', 'banana', 'greek_yogurt', 'peanut_butter', 'grapes', 'strawberries', 'carrot', 'cottage_cheese', 'protein_shake', 'green_tea'],
};

/**
 * Fuzzy-match foods by name query. Returns top 1-3 matches with confidence scores.
 * @param {string} query - Search term
 * @returns {Array<{food: object, score: number}>}
 */
export function recognizeFood(query) {
  if (!query || typeof query !== 'string') return [];

  const q = query.toLowerCase().trim();
  if (q.length === 0) return [];

  const scored = foodDatabase.map(food => {
    const name = food.name.toLowerCase();
    let score = 0;

    // Exact match
    if (name === q) {
      score = 1.0;
    }
    // Starts with query
    else if (name.startsWith(q)) {
      score = 0.9 + (q.length / name.length) * 0.1;
    }
    // Contains query as whole word
    else if (name.includes(q)) {
      score = 0.7 + (q.length / name.length) * 0.15;
    }
    // Token matching (each word)
    else {
      const queryTokens = q.split(/\s+/);
      const nameTokens = name.split(/\s+/);
      let matched = 0;

      for (const qt of queryTokens) {
        for (const nt of nameTokens) {
          if (nt.startsWith(qt) || qt.startsWith(nt)) {
            matched++;
            break;
          }
        }
      }

      if (matched > 0) {
        score = 0.4 + (matched / queryTokens.length) * 0.35;
      } else {
        // Levenshtein-based fuzzy
        const dist = levenshtein(q, name);
        const maxLen = Math.max(q.length, name.length);
        const similarity = 1 - dist / maxLen;
        if (similarity > 0.4) {
          score = similarity * 0.5;
        }
      }
    }

    // Boost by category-inherent confidence
    score *= food.confidence;

    return { food: { ...food }, score };
  });

  return scored
    .filter(s => s.score > 0.2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => ({
      ...s.food,
      confidence: Math.min(parseFloat(s.score.toFixed(2)), 0.99),
    }));
}

/**
 * Simple Levenshtein distance
 */
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function generateMealId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalizeMealTypeKey(mealType) {
  if (!mealType) return 'lunch';
  if (mealType === 'snacks') return 'snack';
  return mealTypeFoods[mealType] ? mealType : 'snack';
}

function normalizeFoodItem(food, seed) {
  const conf = food.confidence != null ? Number(food.confidence) : 0.92;
  const jitter = (seed % 7) / 100;
  return {
    ...food,
    mealId: generateMealId(),
    calories: Math.round(Number(food.calories) || 0),
    protein: Math.round((Number(food.protein) || 0) * 10) / 10,
    carbs: Math.round((Number(food.carbs) || 0) * 10) / 10,
    fat: Math.round((Number(food.fat) || 0) * 10) / 10,
    confidence: Math.min(parseFloat((conf + jitter).toFixed(2)), 0.99),
  };
}

/** Color → likely food IDs for image-guided detection */
const colorFoodHints = {
  red: ['pizza_slice', 'burger', 'beef_steak', 'tomato', 'strawberries', 'apple'],
  orange: ['pizza_slice', 'burger', 'sweet_potato', 'carrot', 'orange', 'tacos', 'fried_rice'],
  yellow: ['banana', 'corn', 'pancakes', 'cheddar', 'eggs', 'bread_wheat'],
  green: ['broccoli', 'spinach', 'caesar_salad', 'grilled_chicken_salad', 'avocado', 'cucumber'],
  brown: ['chicken_breast', 'bread_wheat', 'oatmeal', 'coffee_black', 'almonds', 'burger'],
  white: ['white_rice', 'pasta', 'greek_yogurt', 'eggs', 'caesar_salad'],
};

/**
 * Sample image pixels and return dominant color buckets.
 * @param {string} dataUrl
 * @returns {Promise<{red:number,green:number,yellow:number,brown:number,white:number}>}
 */
export function getImageColorHints(dataUrl) {
  return new Promise((resolve) => {
    const hints = { red: 0, orange: 0, yellow: 0, green: 0, brown: 0, white: 0 };
    const timeout = setTimeout(() => {
      resolve(hints);
    }, 800);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      clearTimeout(timeout);
      try {
        const canvas = document.createElement('canvas');
        const size = 48;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 40) continue;

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const sat = max === 0 ? 0 : (max - min) / max;

          if (max > 200 && sat < 0.15) hints.white++;
          else if (r > 140 && g > 90 && b < 80 && r > g) hints.orange++;
          else if (r > 120 && g < 90 && b < 90) hints.red++;
          else if (g > 100 && g > r && g > b) hints.green++;
          else if (r > 150 && g > 130 && b < 100) hints.yellow++;
          else if (r > 80 && g > 50 && b < 60 && r > b) hints.brown++;
        }
        resolve(hints);
      } catch (e) {
        resolve(hints);
      }
    };
    img.onerror = () => {
      clearTimeout(timeout);
      resolve(hints);
    };
    img.src = dataUrl;
  });
}

function biasPoolByColors(poolIds, hints) {
  const ranked = Object.entries(hints)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([color]) => color);

  const biased = [];
  for (const color of ranked) {
    const ids = colorFoodHints[color] || [];
    for (const id of ids) {
      if (poolIds.includes(id) && !biased.includes(id)) biased.push(id);
    }
  }
  for (const id of poolIds) {
    if (!biased.includes(id)) biased.push(id);
  }
  return biased;
}

/**
 * AI-style food detection from a meal photo (image-guided + meal-time context).
 * @param {string|null} imageDataUrl - Base64 data URL from camera or gallery
 * @param {string} mealType - breakfast | lunch | dinner | snacks | snack
 * @returns {Promise<Array<object>>}
 */
export async function analyzeFoodFromImage(imageDataUrl, mealType = 'lunch') {
  const dbType = normalizeMealTypeKey(mealType);
  let pool = [...mealTypeFoods[dbType]];

  let seed = Date.now();
  if (imageDataUrl && typeof imageDataUrl === 'string') {
    seed = hashString(imageDataUrl.slice(0, 2000) + imageDataUrl.slice(-500));
    try {
      const hints = await getImageColorHints(imageDataUrl);
      const biased = biasPoolByColors(pool, hints);
      if (biased.length >= 2) pool = biased;
    } catch (e) {
      console.warn('[FoodDB] Color analysis skipped', e);
    }
  }

  const count = 2 + (seed % 3);
  const shuffled = seededShuffle(pool, seed);
  const selectedIds = shuffled.slice(0, count);

  const foods = selectedIds
    .map(id => foodDatabase.find(f => f.id === id))
    .filter(Boolean)
    .map(f => normalizeFoodItem(f, seed + hashString(f.id)));

  if (foods.length === 0) {
    return getRandomMeal(dbType);
  }
  return foods;
}

/**
 * Returns 2-4 random food items appropriate for a meal type.
 * @param {'breakfast'|'lunch'|'dinner'|'snack'} mealType
 * @returns {Array<object>}
 */
export function getRandomMeal(mealType) {
  const dbType = normalizeMealTypeKey(mealType);
  const pool = mealTypeFoods[dbType];
  const seed = Date.now();
  const count = 2 + (seed % 3);

  const shuffled = seededShuffle(pool, seed);
  const selectedIds = shuffled.slice(0, count);

  return selectedIds
    .map(id => foodDatabase.find(f => f.id === id))
    .filter(Boolean)
    .map(f => normalizeFoodItem(f, seed + hashString(f.id)));
}
