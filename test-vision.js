import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function run() {
  try {
    console.log("Fetching food image from Unsplash...");
    const imgRes = await fetch("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200");
    const arrayBuffer = await imgRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    console.log("Base64 length:", base64.length);

    console.log("Calling OpenRouter...");
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
              content: [
                {
                  type: "text",
                  text: `Return ONLY valid JSON.

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
                    url: `data:image/jpeg;base64,${base64}`
                  }
                }
              ]
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

run();
