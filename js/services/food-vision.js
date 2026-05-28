// food-vision.js — Accurate AI food recognition via OpenAI Vision API
import { recognizeFood, analyzeFoodFromImage } from '../data/food-db.js';

const STORAGE_KEY = 'nutrivision_openai_key';

const VISION_PROMPT = `You are an expert clinical nutritionist analyzing a meal photo.

Identify ONLY food and beverages clearly visible in this image.

Return valid JSON with this exact structure:
{
  "items": [
    {
      "name": "specific food name (e.g. Grilled Chicken Breast, not just chicken)",
      "serving": 1,
      "servingUnit": "piece|g|ml|cup|slice|medium|bowl|plate|sandwich",
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fat": 0,
      "confidence": 0.95
    }
  ],
  "mealDescription": "one sentence describing the plate"
}

Rules:
- List each distinct visible food separately (e.g. rice and chicken are two items)
- Estimate nutrition for the ACTUAL portion visible on the plate, not per 100g
- Use realistic USDA-style values
- confidence: 0.5-0.99 based on visibility
- If the image is not food, return {"items":[],"mealDescription":"No food detected"}
- Never guess foods that are not visible`;

const FOOD_ICONS = {
  fruit: '🍎', vegetable: '🥦', protein: '🍗', grain: '🍚', dairy: '🥛',
  snack: '🥜', beverage: '🥤', meal: '🍽️',
};

function generateMealId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function round1(n) {
  return Math.round((Number(n) || 0) * 10) / 10;
}

function guessIcon(name, category) {
  if (category && FOOD_ICONS[category]) return FOOD_ICONS[category];
  const n = (name || '').toLowerCase();
  if (/chicken|beef|steak|fish|salmon|egg|turkey|shrimp|pork/.test(n)) return '🍗';
  if (/rice|pasta|bread|oat|noodle|pizza|burger|sandwich|taco/.test(n)) return '🍽️';
  if (/apple|banana|berry|fruit|orange|mango/.test(n)) return '🍎';
  if (/salad|broccoli|spinach|vegetable/.test(n)) return '🥗';
  if (/coffee|tea|juice|water|smoothie|milk/.test(n)) return '🥤';
  return '🍲';
}

export function getOpenAiApiKey() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored.trim()) return stored.trim();
  } catch (_) { /* ignore */ }
  const env = import.meta.env.VITE_OPENAI_API_KEY;
  return (env && String(env).trim()) || '';
}

export function setOpenAiApiKey(key) {
  try {
    if (key && key.trim()) {
      localStorage.setItem(STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (_) { /* ignore */ }
}

export function hasVisionApi() {
  return getOpenAiApiKey().length > 10;
}

function compressImage(dataUrl, maxDim = 1024) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width <= maxDim && height <= maxDim && dataUrl.length < 800000) {
        resolve(dataUrl);
        return;
      }
      const scale = maxDim / Math.max(width, height);
      width = Math.max(1, Math.round(width * scale));
      height = Math.max(1, Math.round(height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function normalizeVisionItems(items) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item, i) => {
      const name = String(item.name || '').trim();
      if (!name) return null;

      const dbMatches = recognizeFood(name);
      const db = dbMatches[0] || null;

      const serving = Number(item.serving) || db?.serving || 1;
      const scale = db && item.calories == null ? 1 : 1;

      let calories = Number(item.calories);
      let protein = Number(item.protein);
      let carbs = Number(item.carbs);
      let fat = Number(item.fat);

      if ((!calories || calories <= 0) && db) {
        calories = db.calories;
        protein = db.protein;
        carbs = db.carbs;
        fat = db.fat;
      }

      return {
        id: db?.id || `vision_${i}_${name.slice(0, 12).replace(/\s/g, '_')}`,
        mealId: generateMealId(),
        name,
        category: db?.category || 'meal',
        calories: Math.round(calories || 0),
        protein: round1(protein),
        carbs: round1(carbs),
        fat: round1(fat),
        fiber: db?.fiber || 0,
        serving,
        servingUnit: item.servingUnit || db?.servingUnit || 'serving',
        icon: db?.icon || guessIcon(name, db?.category),
        confidence: Math.min(Math.max(Number(item.confidence) || 0.88, 0.5), 0.99),
      };
    })
    .filter(Boolean)
    .filter(f => f.calories > 0);
}

async function callOpenAIVision(apiKey, imageDataUrl) {
  const url = await compressImage(imageDataUrl);

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: VISION_PROMPT },
            { type: 'image_url', image_url: { url, detail: 'high' } },
          ],
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1800,
      temperature: 0.15,
    }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const msg = errBody.error?.message || `OpenAI API error (${res.status})`;
    throw new Error(msg);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty response from AI');

  const parsed = JSON.parse(content);
  const items = parsed.items || parsed.foods || [];
  const foods = normalizeVisionItems(items);

  if (foods.length === 0 && parsed.mealDescription?.toLowerCase().includes('no food')) {
    throw new Error('No food detected in this image. Try a clearer photo.');
  }

  const avgConf = foods.length
    ? foods.reduce((s, f) => s + f.confidence, 0) / foods.length
    : 0;

  return {
    foods,
    description: parsed.mealDescription || '',
    confidence: Math.round(avgConf * 100) || 90,
  };
}

/**
 * Analyze food photo — uses OpenAI Vision when API key is set, else smart estimate.
 * @returns {Promise<{foods: object[], source: string, message: string|null, confidence: number, description: string}>}
 */
export async function analyzeFoodWithVision(imageDataUrl, mealType = 'lunch') {
  const apiKey = getOpenAiApiKey();

  if (!apiKey) {
    const foods = await analyzeFoodFromImage(imageDataUrl, mealType);
    return {
      foods,
      source: 'estimate',
      message: 'For accurate results, add your OpenAI API key in Profile → AI Vision',
      confidence: 75,
      description: 'Estimated from meal type (demo mode)',
    };
  }

  try {
    const result = await callOpenAIVision(apiKey, imageDataUrl);
    if (result.foods.length > 0) {
      return {
        foods: result.foods,
        source: 'vision',
        message: null,
        confidence: result.confidence,
        description: result.description,
      };
    }
    throw new Error('Could not identify food in this photo.');
  } catch (e) {
    console.warn('[FoodVision]', e);
    const foods = await analyzeFoodFromImage(imageDataUrl, mealType);
    return {
      foods,
      source: 'fallback',
      message: e.message || 'Vision failed — showing estimate. Fix API key in Profile.',
      confidence: 70,
      description: '',
    };
  }
}
