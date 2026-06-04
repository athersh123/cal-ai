import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config({
  path: "../.env"
});
import express from "express";
import cors from "cors";
import db from "./db.js";
console.log("Current Folder:", process.cwd());

const OPENROUTER_API_KEY =
process.env.OPENROUTER_API_KEY;
console.log("MY SERVER FILE IS RUNNING");

console.log("Current Folder:", process.cwd());
const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://cal-ai-tau.vercel.app"
  ],
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));
app.use(express.json({
  limit: "20mb"
}));

// ── DB Migrations (run once at startup) ─────────────────────
// Uses ER_DUP_FIELDNAME to safely skip already-existing columns.
// This works on MySQL 5.7+ (no IF NOT EXISTS needed).
function runMigrations() {
  const migrations = [
    "ALTER TABLE meals ADD COLUMN serving      FLOAT     DEFAULT 1",
    "ALTER TABLE meals ADD COLUMN serving_unit VARCHAR(50)  DEFAULT 'g'",
    "ALTER TABLE meals ADD COLUMN icon         VARCHAR(100) DEFAULT '\ud83c\udf72'",
    "ALTER TABLE meals ADD COLUMN thumb_data_url MEDIUMTEXT  DEFAULT NULL",
    "ALTER TABLE meals ADD COLUMN logged_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP"
  ];
  migrations.forEach(sql => {
    db.query(sql, (err) => {
      if (err && err.code !== 'ER_DUP_FIELDNAME') {
        console.error('[Migration] FAILED:', err.message, '|', sql.substring(0, 70));
      } else {
        console.log('[Migration] OK:', sql.substring(0, 70));
      }
    });
  });
}
runMigrations();

app.get("/", (req, res) => {
    res.send("Server Running");
});

app.get("/users", (req, res) => {
    console.log("NEW USERS ROUTE RUNNING");
    db.query(
      "SELECT id, username, email FROM users",
      (err, result) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json(result);
      }
    );
});


app.post("/signup", async (req, res) => {

  const { username, email, password } = req.body;

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const sql =
    "INSERT INTO users(username,email,password) VALUES(?,?,?)";

  db.query(
    sql,
    [username, email, hashedPassword],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "User Registered Successfully"
      });
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.json({
          success: false,
          message: "User not found"
        });
      }

      const match =
        await bcrypt.compare(
          password,
          result[0].password
        );

      if (!match) {
        return res.json({
          success: false,
          message: "Wrong password"
        });
      }

      res.json({
        success: true,
        user: {
          id: result[0].id,
          username: result[0].username,
          email: result[0].email
        }
      });

    }
  );
});
app.post("/addMeal", (req, res) => {
    const {
        user_id, food_name, calories, protein,
        carbs, fat, meal_type,
        serving, serving_unit, icon, thumb_data_url
    } = req.body;

    console.log('[addMeal] Incoming payload:', {
        user_id, food_name, calories, protein, carbs, fat, meal_type,
        serving, serving_unit, icon,
        thumb_data_url: thumb_data_url ? '[IMAGE DATA]' : null
    });

    if (!user_id || !food_name) {
        console.error('[addMeal] Missing required fields: user_id or food_name');
        return res.status(400).json({ success: false, message: 'user_id and food_name are required' });
    }

    const sql = `
        INSERT INTO meals
        (user_id, food_name, calories, protein, carbs, fat, meal_type,
         serving, serving_unit, icon, thumb_data_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        user_id,
        food_name,
        Number(calories) || 0,
        Number(protein)  || 0,
        Number(carbs)    || 0,
        Number(fat)      || 0,
        meal_type        || 'lunch',
        Number(serving)  || 1,
        serving_unit     || 'g',
        icon             || '🍲',
        thumb_data_url   || null
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('[addMeal] MySQL INSERT error:', err.message, '| Code:', err.code);
            return res.status(500).json({ success: false, error: err.message, code: err.code });
        }
        console.log('[addMeal] SUCCESS — insertId:', result.insertId);
        res.json({ success: true, message: 'Meal Saved', insertId: result.insertId });
    });
});
app.get("/meals/:userId/date/:date", (req, res) => {

    const userId = req.params.userId;
    const date = req.params.date;

    db.query(
        `
        SELECT *
        FROM meals
        WHERE user_id = ?
        AND DATE(logged_at) = ?
        ORDER BY logged_at DESC
        `,
        [userId, date],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
});

// All meals for a user (diary uses this)
app.get("/meals/:userId", (req, res) => {
    const userId = req.params.userId;
    db.query(
        "SELECT * FROM meals WHERE user_id = ? ORDER BY logged_at DESC",
        [userId],
        (err, result) => {
            if (err) { return res.status(500).json(err); }
            res.json(result);
        }
    );
});

// TODAY only — used by home page (server does the date filter reliably)
app.get("/meals/:userId/today", (req, res) => {
    const userId = req.params.userId;
    db.query(
        "SELECT * FROM meals WHERE user_id = ? AND DATE(logged_at) = CURDATE() ORDER BY logged_at DESC",
        [userId],
        (err, result) => {
            if (err) {
                console.error('[/meals/today] error:', err.message);
                return res.status(500).json(err);
            }
            console.log(`[/meals/today] user=${userId} found=${result.length}`);
            res.json(result);
        }
    );
});


app.post("/analyzeFood", async (req, res) => {
  try {

    const { imageBase64 } = req.body;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text:
                    `Return ONLY valid JSON.

{
  "predictions":[
    {
      "name":"Food Name",
      "confidence":0.95,
      "servingSize":"1 serving"
    }
  ],
  "mealDescription":"description"
}

Analyze the food image.`
                },
                {
                  type: "image_url",
                  image_url: {
                    url:
                      `data:image/jpeg;base64,${imageBase64}`
                  }
                }
              ]
            }
          ]
        })
      }
    );

const data = await response.json();

console.log("OPENROUTER FULL RESPONSE:");
console.log(JSON.stringify(data, null, 2));

let content =
  data?.choices?.[0]?.message?.content || "";

console.log("CONTENT:");
console.log(content);

content = content
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

console.log("CLEAN JSON:");
console.log(content);

res.json({
  success: true,
  result: content
});

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }
});
app.get("/nutrition/:food", async (req, res) => {
  try {

    const food = req.params.food;

    const response = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${food}&api_key=${process.env.USDA_API_KEY}`
    );

    const data = await response.json();

    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
   
app.get("/testAI", async (req, res) => {

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: "Say Hello"
          }
        ]
      })
    }
  );

  const data = await response.json();
console.log(data);
  res.json(data);
});

app.get("/hello", (req, res) => {
  res.send("HELLO TEST");
});
app.get("/testKey", (req, res) => {
  res.json({
    keyLoaded: !!process.env.OPENROUTER_API_KEY,
    keyPrefix:
      process.env.OPENROUTER_API_KEY?.substring(0, 10)
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});