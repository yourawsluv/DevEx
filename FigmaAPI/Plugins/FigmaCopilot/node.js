const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

// Запрос к модели AI для генерации документации
app.post("/generateDocumentation", async (req, res) => {
    const { componentDescription } = req.body;
    try {
        const response = await axios.post("https://api.openai.com/v1/completions", {
            model: "gpt-4",
            prompt: `Создай документацию для компонента: ${componentDescription}`,
            max_tokens: 150
        }, {
            headers: { Authorization: `Bearer YOUR_OPENAI_API_KEY` }
        });
        res.json(response.data.choices[0].text.trim());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("AI backend server is running on port 3000"));
