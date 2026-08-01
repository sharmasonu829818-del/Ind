const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Google Gemini API Client Initialize karein
// (b1a2c776cb7f0cd5a32b5140f1ece24e)
const ai = new GoogleGenAI({ apiKey: 'b1a2c776cb7f0cd5a32b5140f1ece24e' });

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        // Gemini AI model ko call karna
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userMessage,
        });

        const aiReply = response.text || "Mujhe samajh nahi aaya.";

        // Frontend ko response bhejna
        res.json({ reply: aiReply });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ reply: "Kuch technical error aa gayi hai." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
