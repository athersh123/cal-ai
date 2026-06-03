import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// 1x1 black jpeg base64
const imageBase64 = "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";

async function test() {
  try {
    console.log("Calling OpenRouter with image...");
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
                    url: `data:image/jpeg;base64,${imageBase64}`
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

test();
