const axios = require("axios");

const API_KEY = "sk-7gF2Lc1Qp98zXh3M5dT6rN4vYw0bKmAoEJdZVrCY"; // Remplace par ta vraie clé API
const API_URL = "https://api.openai.com/v1/chat/completions";

async function askOpenAI(prompt) {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    console.log(response.data.choices[0].message.content);
  } catch (error) {
    console.error("Erreur:", error.response ? error.response.data : error.message);
  }
}

askOpenAI("Dis-moi une blague sur les développeurs.");
