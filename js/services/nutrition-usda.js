// nutrition-usda.js — USDA FoodData Central nutrition lookup (client-side)

const STORAGE_KEY = 'nutrivision_usda_api_key';

function safeJson(res) {
  return res.json().catch(() => ({}));
}

export function getUsdaApiKey() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored.trim()) return stored.trim();
  } catch (_) {
    // ignore
  }
  const env = import.meta.env.VITE_USDA_API_KEY;
  return (env && String(env).trim()) || '';
}

export function setUsdaApiKey(key) {
  try {
    if (key && key.trim()) localStorage.setItem(STORAGE_KEY, key.trim());
    else localStorage.removeItem(STORAGE_KEY);
  } catch (_) {
    // ignore
  }
}

export function hasUsdaApi() {
  return true;
}

function getUsdaBaseUrl() {
  // Default to direct USDA endpoint. If you prefer using Vite proxy, set VITE_USDA_BASE_URL=/api/usda
  return (import.meta.env.VITE_USDA_BASE_URL || 'https://api.nal.usda.gov/fdc/v1').toString().replace(/\/$/, '');
}

function buildUrl(path, params) {
  const base = getUsdaBaseUrl();
  const url = new URL(base + path);
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    url.searchParams.set(k, String(v));
  });
  const apiKey = getUsdaApiKey();
  if (apiKey) url.searchParams.set('api_key', apiKey);
  return url;
}

async function usdaFetchJson(path, params, init) {
  const url = buildUrl(path, params);
  const res = await fetch(url.toString(), init);
  if (!res.ok) {
    const body = await safeJson(res);
    const msg = body?.error?.message || body?.message || `USDA API error (${res.status})`;
    throw new Error(msg);
  }
  return res.json();
}

function normalizeText(s) {
  return String(s || '').trim();
}

function pickNutrientAmount(foodNutrients, matcher) {
  if (!Array.isArray(foodNutrients)) return null;
  const found = foodNutrients.find(fn => matcher(fn?.nutrient) || matcher(fn));
  const amount = found?.amount;
  if (amount === undefined || amount === null) return null;
  return Number(amount);
}

function parseServing(food) {
  const servingSize = Number(food?.servingSize);
  const servingSizeUnit = normalizeText(food?.servingSizeUnit) || 'g';
  const household = normalizeText(food?.householdServingFullText);

  if (household) {
    // Try "1 large" or "2 tbsp" etc.
    const m = household.match(/^\s*(\d+(?:\.\d+)?)\s+(.+?)\s*$/);
    if (m) {
      return {
        amount: Number(m[1]),
        unit: normalizeText(m[2]),
        grams: Number.isFinite(servingSize) && servingSizeUnit.toLowerCase() === 'g' ? servingSize : null,
        text: household,
      };
    }
    return {
      amount: 1,
      unit: household,
      grams: Number.isFinite(servingSize) && servingSizeUnit.toLowerCase() === 'g' ? servingSize : null,
      text: household,
    };
  }

  if (Number.isFinite(servingSize) && servingSize > 0) {
    return {
      amount: servingSize,
      unit: servingSizeUnit,
      grams: servingSizeUnit.toLowerCase() === 'g' ? servingSize : null,
      text: `${servingSize} ${servingSizeUnit}`,
    };
  }

  return { amount: 100, unit: 'g', grams: 100, text: '100 g' };
}

function round1(n) {
  return Math.round((Number(n) || 0) * 10) / 10;
}

function extractMacrosPer100g(food) {
  const nutrients = food?.foodNutrients;

  // Prefer nutrient numbers when available, fallback to names.
  const calories = pickNutrientAmount(nutrients, (n) => {
    const num = String(n?.nutrientNumber || '').trim();
    const name = String(n?.name || '').toLowerCase();
    return num === '208' || name === 'energy';
  });
  const protein = pickNutrientAmount(nutrients, (n) => String(n?.nutrientNumber || '').trim() === '203' || String(n?.name || '').toLowerCase() === 'protein');
  const carbs = pickNutrientAmount(nutrients, (n) => {
    const num = String(n?.nutrientNumber || '').trim();
    const name = String(n?.name || '').toLowerCase();
    return num === '205' || name.includes('carbohydrate');
  });
  const fat = pickNutrientAmount(nutrients, (n) => {
    const num = String(n?.nutrientNumber || '').trim();
    const name = String(n?.name || '').toLowerCase();
    return num === '204' || name.includes('total lipid');
  });

  return {
    calories: Number.isFinite(calories) ? calories : null,
    protein: Number.isFinite(protein) ? protein : null,
    carbs: Number.isFinite(carbs) ? carbs : null,
    fat: Number.isFinite(fat) ? fat : null,
  };
}

export async function getUsdaNutritionForFdcId(fdcId) {
  const details = await usdaGetFoodDetails(fdcId);
  const serving = parseServing(details);
  const per100 = extractMacrosPer100g(details);
  const scale = serving.grams ? (serving.grams / 100) : 1;

  const calories = per100.calories == null ? null : per100.calories * scale;
  const protein = per100.protein == null ? null : per100.protein * scale;
  const carbs = per100.carbs == null ? null : per100.carbs * scale;
  const fat = per100.fat == null ? null : per100.fat * scale;

  return {
    fdcId,
    displayName: normalizeText(details?.description) || '',
    serving,
    macros: {
      calories: calories == null ? 0 : Math.round(calories),
      protein: protein == null ? 0 : round1(protein),
      carbs: carbs == null ? 0 : round1(carbs),
      fat: fat == null ? 0 : round1(fat),
    },
    source: {
      provider: 'usda',
      url: fdcId ? `https://fdc.nal.usda.gov/fdc-app.html#/food-details/${fdcId}/nutrients` : '',
    },
  };
}

export async function usdaSearchFoods(query, { pageSize = 5 } = {}) {
  if (!hasUsdaApi()) throw new Error('USDA API key not set');
  const q = normalizeText(query);
  if (!q) return [];

  const data = await usdaFetchJson('/foods/search', null, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: q, pageSize }),
  });

  const foods = Array.isArray(data?.foods) ? data.foods : [];
  return foods.map(f => ({
    fdcId: f.fdcId,
    description: normalizeText(f.description),
    score: Number(f.score) || 0,
    dataType: normalizeText(f.dataType),
    brandOwner: normalizeText(f.brandOwner),
    servingSize: f.servingSize,
    servingSizeUnit: normalizeText(f.servingSizeUnit),
  }));
}

export async function usdaGetFoodDetails(fdcId) {
  if (!hasUsdaApi()) throw new Error('USDA API key not set');
  if (!fdcId) throw new Error('Missing fdcId');
  return usdaFetchJson(`/food/${fdcId}`, null, { method: 'GET' });
}

export async function getUsdaNutritionForName(name) {
  const candidates = await usdaSearchFoods(name, { pageSize: 6 });
  if (!candidates.length) {
    return {
      ok: false,
      reason: 'not_found',
      candidates: [],
    };
  }

  // Pick highest scored. In practice this is usually reasonable for common foods.
  const best = [...candidates].sort((a, b) => (b.score || 0) - (a.score || 0))[0];
  const details = await usdaGetFoodDetails(best.fdcId);

  const serving = parseServing(details);
  const per100 = extractMacrosPer100g(details);

  // Many USDA items are per 100g; scale to serving grams if known.
  const scale = serving.grams ? (serving.grams / 100) : 1;

  const calories = per100.calories == null ? null : per100.calories * scale;
  const protein = per100.protein == null ? null : per100.protein * scale;
  const carbs = per100.carbs == null ? null : per100.carbs * scale;
  const fat = per100.fat == null ? null : per100.fat * scale;

  if ([calories, protein, carbs, fat].some(v => v == null)) {
    // Still return it, but flag partial — some branded items may omit values.
  }

  return {
    ok: true,
    fdcId: best.fdcId,
    displayName: normalizeText(details?.description) || normalizeText(best.description) || normalizeText(name),
    serving,
    macros: {
      calories: calories == null ? 0 : Math.round(calories),
      protein: protein == null ? 0 : round1(protein),
      carbs: carbs == null ? 0 : round1(carbs),
      fat: fat == null ? 0 : round1(fat),
    },
    candidates: candidates.slice(0, 3),
    source: {
      provider: 'usda',
      url: best?.fdcId ? `https://fdc.nal.usda.gov/fdc-app.html#/food-details/${best.fdcId}/nutrients` : '',
    },
  };
}
