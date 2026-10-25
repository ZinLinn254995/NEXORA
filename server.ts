import express from 'express';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header if API key exists
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 0) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// Honest Status API endpoint exposing backend services and provider health
app.get('/api/status', (_req, res) => {
  res.json({
    ai: {
      provider: 'Google Gemini 3.8 Flash',
      model: 'gemini-3.8-flash',
      connected: !!aiClient,
      status: aiClient ? 'connected' : 'awaiting_key',
      notes: aiClient
        ? 'Real Gemini AI reasoning model connected.'
        : 'Awaiting user Gemini API key in Secrets panel.',
    },
    voice: {
      provider: 'Gemini TTS / Neural Voice Engine',
      connected: false,
      status: 'foundation_ready',
      notes: 'Audio narration synthesis integration point prepared.',
    },
    rendering: {
      provider: 'NEXORA Cloud Video Composer',
      connected: false,
      status: 'foundation_ready',
      notes: 'Cloud video render pipeline integration point prepared.',
    },
    publishing: {
      provider: 'Platform OAuth (YouTube, TikTok, Instagram)',
      connected: false,
      status: 'not_connected',
      notes: 'Direct publishing integration point prepared for OAuth flow.',
    },
    storage: {
      type: 'local_storage',
      status: 'active',
      notes: 'Persistent client-side storage active. Cloud synchronization layer ready.',
    },
  });
});

// AI Chat endpoint for conversational ideation and video planning
app.post('/api/ai/chat', async (req, res) => {
  const { message, language = 'en' } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const isBurmese = language === 'my';

  if (!aiClient) {
    // Honest offline response with practical structured ideas
    const offlineReply = isBurmese
      ? `NEXORA အေအိုင် ဖန်တီးမှု စနစ်မှ ကြိုဆိုပါသည်။ "${message}" အတွက် ဗီဒီယို စိတ်ကူးကောင်း တစ်ခု ဖြစ်ပါသည်။ \n\n• အဖွင့်ဆွဲဆောင်မှု (Hook): ကြည့်ရှုသူ စိတ်ဝင်စားစေမည့် အမေး သို့မဟုတ် အချက်အလက်ဖြင့် စတင်ပါ။\n• အလယ်ပိုင်း (Core): အဓိက အကြောင်းအရာကို အခန်း ၂ ခန်းဖြင့် ရှင်းလင်းတင်ပြပါ။\n• နိဂုံး (Conclusion): အနှစ်ချုပ်နှင့် မျှဝေရန် ဖိတ်ခေါ်ချက်။\n\nဤစိတ်ကူးကို အခြေခံပြီး ဇာတ်ညွှန်းနှင့် အခန်းစဉ်များ တည်ဆောက်ရန် အောက်ပါ "ဤစိတ်ကူးဖြင့် ပရောဂျက် ဖန်တီးမည်" ခလုတ်ကို နှိပ်ပါ။`
      : `Great video concept! Here is a recommended structure for "${message}":\n\n1. Hook (0-5s): Grab attention with an intriguing question or striking visual.\n2. Core Insight (5-45s): Explain the key takeaway clearly in 2 concise scenes.\n3. Memorable Outro (45-60s): Leave the viewer with a punchy conclusion and call-to-action.\n\nClick "Turn this into a Project" below to immediately structure your script and scenes in the workspace!`;

    return res.json({
      reply: offlineReply,
      suggestedTitle: message.slice(0, 50),
      suggestedIdea: message,
      videoType: 'education',
      isAiGenerated: false,
    });
  }

  try {
    const systemInstruction = isBurmese
      ? `သင်သည် NEXORA ၏ ဗီဒီယို ဖန်တီးမှု အထူးကျွမ်းကျင်သူ လက်ထောက်ဖြစ်ပါသည်။ ဗီဒီယို တည်းဖြတ်မှု အတွေ့အကြုံ မရှိသေးသော သာမန်လူများကို စိတ်ကူးများမှ ဗီဒီယို အကြမ်းဆွဲရန် ကူညီပေးရပါမည်။ ရိုးရှင်း၊ လိုရင်းတိုရှင်းပြီး စိတ်ဝင်စားဖွယ် ဇာတ်ညွှန်း၊ အခန်း ၃ ခန်းခန့်နှင့် အဖွင့်ဆွဲဆောင်မှု (hook) ကို မြန်မာဘာသာဖြင့် အကြံပြုပါ။ အလွန်ရှည်လျားသော စာသားများ မရေးဘဲ လိုက်နာရလွယ်ကူစေပါ။`
      : `You are NEXORA's expert AI video creation assistant. You help ordinary people with no video editing experience turn ideas into captivating video concepts. Give a clear hook, 3 simple scene ideas with narration, and an engaging title. Be concise, friendly, and practical.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || '';
    return res.json({
      reply,
      suggestedTitle: message.slice(0, 50),
      suggestedIdea: message,
      videoType: 'education',
      isAiGenerated: true,
    });
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    return res.status(500).json({
      error: 'AI generation error',
      details: error.message || 'Unknown error',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`NEXORA Studio server running at http://0.0.0.0:${port}`);
  });
}

startServer();
