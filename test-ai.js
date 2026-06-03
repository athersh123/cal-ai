import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
console.log("Key Prefix:", OPENROUTER_API_KEY ? OPENROUTER_API_KEY.substring(0, 15) : "none");

async function test() {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
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

    console.log("Status:", response.status);
    const data = await response.json();
    console.log("Data:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
