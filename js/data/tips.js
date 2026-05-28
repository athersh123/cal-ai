// tips.js — NutriVision AI Health Tips, Contextual Advice & Motivational Messages

export const healthTips = [
  // ── Nutrition (10) ──
  { id: 'n1',  text: 'Aim for a colorful plate — different colors mean different nutrients.',                       category: 'nutrition', icon: '🌈' },
  { id: 'n2',  text: 'Eating slowly helps your brain register fullness, reducing overeating by up to 20%.',         category: 'nutrition', icon: '🧠' },
  { id: 'n3',  text: 'Fiber-rich foods keep you fuller longer. Try adding beans, lentils, or oats to your meals.', category: 'nutrition', icon: '🥣' },
  { id: 'n4',  text: 'Healthy fats from avocados, nuts, and olive oil support brain function and hormone health.',  category: 'nutrition', icon: '🥑' },
  { id: 'n5',  text: 'Try the 80/20 rule: eat nutritious foods 80% of the time and enjoy treats the other 20%.',   category: 'nutrition', icon: '⚖️' },
  { id: 'n6',  text: 'Whole grains provide sustained energy compared to refined grains. Choose brown over white.',  category: 'nutrition', icon: '🌾' },
  { id: 'n7',  text: 'Meal prepping on weekends can save time and help you make healthier choices all week.',       category: 'nutrition', icon: '📦' },
  { id: 'n8',  text: 'Reading food labels helps you stay aware of hidden sugars and sodium.',                       category: 'nutrition', icon: '🏷️' },
  { id: 'n9',  text: 'Fermented foods like yogurt, kimchi, and sauerkraut support a healthy gut microbiome.',       category: 'nutrition', icon: '🥬' },
  { id: 'n10', text: 'Eating breakfast kickstarts your metabolism and helps with focus throughout the morning.',     category: 'nutrition', icon: '🌅' },

  // ── Hydration (7) ──
  { id: 'h1',  text: 'Drinking water before meals can help you eat less and stay hydrated.',                        category: 'hydration', icon: '💧' },
  { id: 'h2',  text: 'Carry a water bottle everywhere — you\'re more likely to drink when it\'s visible.',          category: 'hydration', icon: '🧴' },
  { id: 'h3',  text: 'Herbal teas count toward your daily water intake. Try chamomile or peppermint.',              category: 'hydration', icon: '🍵' },
  { id: 'h4',  text: 'Dehydration can masquerade as hunger. Try drinking water first when you feel peckish.',       category: 'hydration', icon: '🥤' },
  { id: 'h5',  text: 'Fruits like watermelon and cucumbers are over 90% water — great natural hydrators.',          category: 'hydration', icon: '🍉' },
  { id: 'h6',  text: 'Set hourly reminders to sip water. Small, frequent drinks beat chugging all at once.',        category: 'hydration', icon: '⏰' },
  { id: 'h7',  text: 'Your urine color is a hydration indicator: pale yellow means well-hydrated.',                 category: 'hydration', icon: '🎨' },

  // ── Fitness (6) ──
  { id: 'f1',  text: 'A 30-minute walk burns about 150 calories and boosts your mood significantly.',               category: 'fitness',   icon: '🚶' },
  { id: 'f2',  text: 'Combining cardio with strength training maximizes fat loss and preserves muscle.',            category: 'fitness',   icon: '💪' },
  { id: 'f3',  text: 'Stretching for 10 minutes daily reduces injury risk and improves flexibility.',              category: 'fitness',   icon: '🧘' },
  { id: 'f4',  text: 'Taking the stairs instead of the elevator adds up to significant exercise over time.',       category: 'fitness',   icon: '🏃' },
  { id: 'f5',  text: 'Post-workout nutrition matters: eat protein within 45 minutes of exercising.',               category: 'fitness',   icon: '🏋️' },
  { id: 'f6',  text: 'Even 10 minutes of movement is better than none. Every bit counts!',                         category: 'fitness',   icon: '⚡' },

  // ── Mindset (5) ──
  { id: 'm1',  text: 'Progress, not perfection. Small consistent changes lead to lasting results.',                 category: 'mindset',   icon: '🌱' },
  { id: 'm2',  text: 'Celebrate non-scale victories: better energy, improved sleep, and stronger lifts.',          category: 'mindset',   icon: '🎉' },
  { id: 'm3',  text: 'Tracking your food isn\'t about restriction — it\'s about awareness and empowerment.',       category: 'mindset',   icon: '📊' },
  { id: 'm4',  text: 'Don\'t let one bad meal ruin your day. Reset at the next meal and keep going.',              category: 'mindset',   icon: '🔄' },
  { id: 'm5',  text: 'Visualize your goals. People who write down goals are 42% more likely to achieve them.',     category: 'mindset',   icon: '🎯' },

  // ── Protein (5) ──
  { id: 'p1',  text: 'Protein keeps you full and preserves muscle. Aim for 1.6–2.2 g per kg of body weight.',      category: 'protein',   icon: '🥩' },
  { id: 'p2',  text: 'Greek yogurt packs up to 17 g of protein per serving — a perfect high-protein snack.',       category: 'protein',   icon: '🥛' },
  { id: 'p3',  text: 'Spread your protein intake across all meals for optimal muscle protein synthesis.',          category: 'protein',   icon: '🍗' },
  { id: 'p4',  text: 'Plant-based protein sources like tofu, tempeh, and lentils are excellent alternatives.',     category: 'protein',   icon: '🌿' },
  { id: 'p5',  text: 'Eggs are one of the most complete protein sources — 6 g of protein per large egg.',          category: 'protein',   icon: '🥚' },

  // ── Sleep (4) ──
  { id: 's1',  text: 'Poor sleep increases hunger hormones. Aim for 7-9 hours per night.',                         category: 'sleep',     icon: '😴' },
  { id: 's2',  text: 'Avoid heavy meals 2-3 hours before bed for better sleep quality.',                           category: 'sleep',     icon: '🌙' },
  { id: 's3',  text: 'A consistent sleep schedule helps regulate appetite and metabolism.',                        category: 'sleep',     icon: '🛏️' },
  { id: 's4',  text: 'Magnesium-rich foods like almonds and spinach can promote better sleep.',                    category: 'sleep',     icon: '✨' },
];

/**
 * Returns a contextual health tip based on today's progress data.
 *
 * @param {object} todayData
 * @param {number} todayData.calories       - calories consumed so far
 * @param {number} todayData.caloriesGoal   - daily calorie goal
 * @param {number} todayData.protein        - protein consumed (g)
 * @param {number} todayData.proteinGoal    - daily protein goal (g)
 * @param {number} todayData.water          - water consumed (ml)
 * @param {number} todayData.waterGoal      - daily water goal (ml)
 * @returns {object} a tip object from healthTips
 */
export function getContextualTip(todayData) {
  const {
    calories = 0, caloriesGoal = 2200,
    protein = 0, proteinGoal = 150,
    water = 0, waterGoal = 2500,
  } = todayData || {};

  const calPct = caloriesGoal > 0 ? calories / caloriesGoal : 0;
  const protPct = proteinGoal > 0 ? protein / proteinGoal : 0;
  const waterPct = waterGoal > 0 ? water / waterGoal : 0;

  let pool;

  if (protPct < 0.5) {
    pool = healthTips.filter(t => t.category === 'protein');
  } else if (waterPct < 0.5) {
    pool = healthTips.filter(t => t.category === 'hydration');
  } else if (calPct > 0.9 && calPct <= 1.05) {
    // Nearly at goal — give a positive mindset tip
    pool = healthTips.filter(t => t.category === 'mindset');
  } else if (calPct > 1.1) {
    // Over goal — gentle fitness tip
    pool = healthTips.filter(t => t.category === 'fitness');
  } else {
    // General: pick from any category
    pool = healthTips;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * 20+ AI-style motivational messages for the home screen, streaks, etc.
 */
export const motivationalMessages = [
  "You're building something incredible — one meal at a time. 🚀",
  "Consistency beats intensity. Keep showing up! 💪",
  "Your body is a reflection of your habits, not a single day. 🌟",
  "Small steps lead to big transformations. Keep going! 🏔️",
  "You didn't come this far to only come this far. 🔥",
  "Every healthy choice is a vote for the person you want to become. 🗳️",
  "Progress isn't always visible, but it's always happening. 🌱",
  "You're one workout away from a better mood. Let's go! 🎯",
  "Nutrition isn't about deprivation — it's about fueling your best self. ⚡",
  "Trust the process. The results will follow. 🏆",
  "Today is another chance to nourish your body and mind. 🧠",
  "You're doing better than you think. Keep it up! 🌈",
  "Healthy habits are the compound interest of self-improvement. 📈",
  "Your future self will thank you for the choices you make today. 🙏",
  "Don't count the days — make the days count. 📅",
  "Discipline is choosing between what you want now and what you want most. 💎",
  "You are what you eat, so eat something awesome! 🥗",
  "The only bad workout is the one that didn't happen. 💥",
  "Fuel your ambition. Track your progress. Own your journey. 🗺️",
  "Great things never came from comfort zones. Push forward! 🚀",
  "Hydrate, nourish, move, rest, repeat. That's the formula. 🔄",
  "Your streak says it all — you're becoming unstoppable! ⚡",
  "AI-powered insights, human-powered dedication. That's you. 🤖",
  "One meal won't make you, and one meal won't break you. Balance is key. ⚖️",
];
