import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Portrait generation endpoint via Gemini image generation
app.post('/api/generate-portrait', async (req: Request, res: Response) => {
  try {
    const { prompt, style = 'cartoon' } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json({
        success: false,
        fallback: true,
        message: 'No GEMINI_API_KEY configured; utilizing high-fidelity video game asset fallback.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: '1:1',
        },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData?.data) {
        return res.json({
          success: true,
          imageUrl: `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`,
          source: 'ai',
        });
      }
    }

    return res.json({
      success: false,
      fallback: true,
      message: 'Model completed without inline image data; using stylized portrait asset.',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Unknown generation error';
    return res.json({
      success: false,
      fallback: true,
      error: errMessage,
    });
  }
});

// Backstory generation endpoint via Gemini
app.post('/api/generate-backstory', async (req: Request, res: Response) => {
  try {
    const { name, characterClass, race, title, originRealm, signatureWeapon, relic, signatureAbility } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json({
        success: false,
        fallback: true,
        message: 'No GEMINI_API_KEY configured; using procedural backstory engine.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `You are an ancient medieval fantasy chronicler. Write a compelling, unique, exactly ONE-to-TWO-sentence origin backstory for this adventurer:
Character Name: ${name || 'The Wanderer'}
Title: ${title || ''}
Class: ${characterClass || 'Warrior'}
Race: ${race || 'Human'}
Origin Realm: ${originRealm || 'Eldoria'}
Weapon: ${signatureWeapon?.name || 'an enchanted blade'}
Relic: ${relic?.name || 'an ancestral talisman'}
Signature Ability: ${signatureAbility?.name || 'ancient combat feats'}

Requirements:
- Exactly 1 or 2 sentences total.
- Rich, evocative, atmospheric high-fantasy tone.
- Must weave in their origin, their path as a ${characterClass}, and a hint of their legendary deeds or sworn quest.
- Return ONLY the backstory text, no quotes or metadata.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const text = response.text ? response.text.trim().replace(/^["']|["']$/g, '') : '';
    if (text) {
      return res.json({
        success: true,
        backstory: text,
      });
    }

    return res.json({
      success: false,
      fallback: true,
      message: 'Empty response; using procedural engine.',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Backstory generation error';
    return res.json({
      success: false,
      fallback: true,
      error: errMessage,
    });
  }
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
