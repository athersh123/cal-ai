// achievements.js — NutriVision AI Achievement / Badge System
// 16 achievement badges spanning streaks, logging milestones, goals, and scanning

export const achievements = [
  // ── Streak badges ──
  { id: 'streak_3',       name: 'Getting Started',    description: 'Log meals for 3 days in a row',             icon: '🔥', requirement: { type: 'streak', value: 3 },          tier: 'bronze' },
  { id: 'streak_7',       name: 'Week Warrior',       description: 'Log meals for 7 days in a row',             icon: '🔥', requirement: { type: 'streak', value: 7 },          tier: 'silver' },
  { id: 'streak_14',      name: 'Consistency King',   description: 'Log meals for 14 days in a row',            icon: '👑', requirement: { type: 'streak', value: 14 },         tier: 'gold'   },
  { id: 'streak_30',      name: 'Unstoppable',        description: 'Log meals for 30 days straight',            icon: '💎', requirement: { type: 'streak', value: 30 },         tier: 'gold'   },

  // ── Meals logged badges ──
  { id: 'meals_10',       name: 'First Steps',        description: 'Log 10 meals total',                        icon: '🍽️', requirement: { type: 'meals_logged', value: 10 },   tier: 'bronze' },
  { id: 'meals_50',       name: 'Meal Tracker',       description: 'Log 50 meals total',                        icon: '📝', requirement: { type: 'meals_logged', value: 50 },   tier: 'silver' },
  { id: 'meals_100',      name: 'Century Club',       description: 'Log 100 meals total',                       icon: '💯', requirement: { type: 'meals_logged', value: 100 },  tier: 'gold'   },
  { id: 'meals_500',      name: 'Nutrition Master',   description: 'Log 500 meals total',                       icon: '🏆', requirement: { type: 'meals_logged', value: 500 },  tier: 'gold'   },

  // ── Calories goal badges ──
  { id: 'cal_goal_1',     name: 'On Target',          description: 'Hit your calorie goal for the first time',  icon: '🎯', requirement: { type: 'calories_goal', value: 1 },  tier: 'bronze' },
  { id: 'cal_goal_7',     name: 'Week of Balance',    description: 'Hit your calorie goal 7 times',             icon: '⚖️', requirement: { type: 'calories_goal', value: 7 },  tier: 'silver' },
  { id: 'cal_goal_30',    name: 'Calorie Commander',  description: 'Hit your calorie goal 30 times',            icon: '🌟', requirement: { type: 'calories_goal', value: 30 }, tier: 'gold'   },

  // ── Water goal badges ──
  { id: 'water_goal_3',   name: 'Hydration Starter',  description: 'Hit your water goal 3 times',               icon: '💧', requirement: { type: 'water_goal', value: 3 },     tier: 'bronze' },
  { id: 'water_goal_7',   name: 'Water Warrior',      description: 'Hit your water goal 7 times',               icon: '🌊', requirement: { type: 'water_goal', value: 7 },     tier: 'silver' },
  { id: 'water_goal_14',  name: 'Hydration Hero',     description: 'Hit your water goal 14 times',              icon: '🏊', requirement: { type: 'water_goal', value: 14 },    tier: 'gold'   },

  // ── Weight logged badges ──
  { id: 'weight_1',       name: 'First Weigh-In',     description: 'Log your weight for the first time',        icon: '⚖️', requirement: { type: 'weight_logged', value: 1 },  tier: 'bronze' },

  // ── Scan count badges ──
  { id: 'scan_1',         name: 'AI Spotter',         description: 'Scan your first meal with AI',              icon: '📸', requirement: { type: 'scan_count', value: 1 },     tier: 'bronze' },
];

/**
 * Given the user's stats, return an array of achievement IDs that are newly unlockable
 * (i.e., they meet the requirements but are NOT in `unlockedIds`).
 *
 * @param {object} stats
 * @param {number} stats.currentStreak      - current streak in days
 * @param {number} stats.totalMealsLogged   - total meals logged ever
 * @param {number} stats.caloriesGoalDays   - # of days the user hit their calorie goal
 * @param {number} stats.waterGoalDays      - # of days the user hit their water goal
 * @param {number} stats.weightLogCount     - # of times user logged weight
 * @param {number} stats.scanCount          - # of scans made
 * @param {string[]} stats.unlockedIds      - already-unlocked achievement IDs
 * @returns {string[]} newly unlocked achievement IDs
 */
export function checkAchievements(stats) {
  const {
    currentStreak = 0,
    totalMealsLogged = 0,
    caloriesGoalDays = 0,
    waterGoalDays = 0,
    weightLogCount = 0,
    scanCount = 0,
    unlockedIds = [],
  } = stats;

  const alreadyUnlocked = new Set(unlockedIds);
  const newlyUnlocked = [];

  for (const ach of achievements) {
    if (alreadyUnlocked.has(ach.id)) continue;

    const { type, value } = ach.requirement;
    let met = false;

    switch (type) {
      case 'streak':
        met = currentStreak >= value;
        break;
      case 'meals_logged':
        met = totalMealsLogged >= value;
        break;
      case 'calories_goal':
        met = caloriesGoalDays >= value;
        break;
      case 'water_goal':
        met = waterGoalDays >= value;
        break;
      case 'weight_logged':
        met = weightLogCount >= value;
        break;
      case 'scan_count':
        met = scanCount >= value;
        break;
    }

    if (met) {
      newlyUnlocked.push(ach.id);
    }
  }

  return newlyUnlocked;
}
