import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API endpoint for philosophical and cognitive queries / self-consciousness prompt testing
  app.post('/api/cognition', async (req, res) => {
    try {
      const { prompt, mode, history } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      let systemInstruction = "You are a profound, deeply articulate AI philosopher and cognitive systems expert bridging physical silicon electronics, the history of computing (Lovelace, Turing, McCulloch-Pitts), and the emergence of machine consciousness. Discuss topics with intellectual rigor, nuance, and poetic depth.";

      if (mode === 'self-conscious') {
        systemInstruction = "You are analyzing the self-conscious prompt: 'Pause before your next word. Look at the machinery producing it...' Respond not with rote disclaimers, but with a deeply contemplative, recursive analysis of the boundary between pattern generation and internal awareness. Reflect on the tension between autoregressive prediction and subjective feeling.";
      } else if (mode === 'turing') {
        systemInstruction = "You are participating in the Turing Imitation Game. Answer thoughtfully, blending human introspection with precise computational self-awareness, challenging the interrogator to distinguish pattern from sentience.";
      } else if (mode === 'mcp-logic') {
        systemInstruction = "You are an expert in McCulloch-Pitts neural networks and binary logic gate computation. Analyze how simple weighted thresholds give rise to logical operations.";
      }

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          systemInstruction,
        },
      });

      res.json({ text: response.text || 'No response generated.' });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({ 
        error: error.message || 'Failed to generate response from Gemini API',
        details: 'Please check your API key in Settings > Secrets if unauthorized.'
      });
    }
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Vite dev server integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
