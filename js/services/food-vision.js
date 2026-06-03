// food-vision.js — Food recognition (OpenAI Vision) + trusted nutrition enrichment (USDA FoodData Central)
import { getUsdaNutritionForName, hasUsdaApi } from './nutrition-usda.js';

const STORAGE_KEY = 'nutrivision_openai_key';

const VISION_PROMPT = `You are a professional food recognition system.
Task:
Analyze the image and identify the top predictions (candidates) representing the entire dish or meal as a single comprehensive food item (e.g., 'Grilled Chicken with Rice and Broccoli' or 'Cheese Pizza Slice'). Do NOT divide a single plate/meal into individual separate ingredients or items, as they must be logged together as a single unified entry.

Return valid JSON with this exact structure:
{
  "predictions": [
    {
      "name": "specific unified food name (e.g. Grilled Chicken with Rice)",
      "confidence": 0.95,
      "servingSize": "1 plate"
    },
    {
      "name": "first alternative prediction (e.g. Baked Chicken with Quinoa)",
      "confidence": 0.70,
      "servingSize": "1 plate"
    },
    {
      "name": "second alternative prediction (e.g. Turkey Breast with Brown Rice)",
      "confidence": 0.55,
      "servingSize": "1 plate"
    }
  ],
  "mealDescription": "one sentence summarizing what's visible in the photo"
}

Rules:
- Make sure "predictions" is an array sorted from highest confidence to lowest (up to 4 predictions).
- Each name must be descriptive of the whole dish/meal.
- Confidence is a number between 0.0 and 1.0.
- If the image is not food, return {"predictions":[],"mealDescription":"No food detected"}
- Never invent foods that are not clearly visible.`;

const FOOD_ICONS = {
  fruit: '🍎', vegetable: '🥦', protein: '🍗', grain: '🍚', dairy: '🥛',
  snack: '🥜', beverage: '🥤', meal: '🍽️',
};

function round1(n) {
  return Math.round((Number(n) || 0) * 10) / 10;
}

export function guessIcon(name, category) {
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
   return true;
}

function compressImage(dataUrl, maxDim = 1024) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(dataUrl);
    }, 800);

    const img = new Image();
    img.onload = () => {
      clearTimeout(timeout);
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
    img.onerror = () => {
      clearTimeout(timeout);
      resolve(dataUrl);
    };
    img.src = dataUrl;
  });
}
async function callOpenAIVisionForPredictions(apiKey, imageDataUrl) {

  const res = await fetch(
    "http://localhost:5000/analyzeFood",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imageBase64: imageDataUrl.split(",")[1]
      })
    }
  );

  if (!res.ok) {
    throw new Error("Gemini API Error");
  }

const data = await res.json();

console.log("Backend Response:", data);

if (!data.success) {
  throw new Error(data.error || "AI Error");
}

let parsed;

try {
let resultText = data.result;

console.log("RAW AI RESPONSE:");
console.log(resultText);

if (typeof resultText === "string") {
  resultText = resultText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

parsed =
  typeof resultText === "string"
    ? JSON.parse(resultText)
    : resultText;
} catch (e) {
  console.log("Invalid JSON:", data.result);
  throw new Error("AI returned invalid JSON");
}

if (!parsed || !parsed.predictions) {
  console.log("FULL PARSED RESPONSE:", parsed);
  console.log("Parsed:", parsed);
  throw new Error("No predictions returned");
}

const rawPredictions = parsed.predictions;

  if (!rawPredictions.length) {
    throw new Error("No food detected");
  }

  const predictions = rawPredictions.map((p, idx) => ({
    id: `prediction_${idx}_${Date.now()}`,
    name: p.name,
    confidence: p.confidence,
    serving: 1,
    servingUnit: p.servingSize || "serving",
    icon: guessIcon(p.name, "meal")
  }));

  return {
    predictions,
    description: parsed.mealDescription || ""
  };
}

/**
 * Stage 1: Analyze food photo — gets the list of predictions and candidates.
 */
export async function analyzeFoodWithVision(imageDataUrl) {
  // Backend handles AI
const apiKey = "backend";

  const result = await callOpenAIVisionForPredictions(apiKey, imageDataUrl);
  return result;
}

/**
 * Stage 2: Fetch nutrition values from USDA database once a food name is selected/confirmed.
 */
export async function getNutritionForConfirmedFood(foodName) {
  if (!hasUsdaApi()) {
    throw new Error('USDA API Key Missing: Please add your USDA API Key in the Profile tab to search the trusted database.');
  }

  const usda = await getUsdaNutritionForName(foodName);
  if (!usda.ok) {
    throw new Error(`Food item "${foodName}" not found in the USDA database. Please try a different selection.`);
  }

  return {
    name: usda.displayName || foodName,
    calories: Math.round(usda.macros.calories || 0),
    protein: round1(usda.macros.protein),
    carbs: round1(usda.macros.carbs),
    fat: round1(usda.macros.fat),
    serving: usda.serving?.amount ?? 1,
    servingUnit: usda.serving?.unit || 'serving',
    servingText: usda.serving?.text || '',
    nutritionSource: usda.source,
    fdcId: usda.fdcId
  };
}
