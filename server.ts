import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Inclusive AI Learning Assistant – Sri Lanka',
      version: '1.0.0',
      geminiAvailable: Boolean(process.env.GEMINI_API_KEY)
    });
  });

  // AI Lesson Transformation endpoint
  app.post('/api/process-lesson', async (req, res) => {
    const { title, grade, subject, text, useGemini } = req.body;

    if (!title || !text) {
      return res.status(400).json({ error: 'Title and text are required' });
    }

    // Check if Gemini should and can be used
    if (useGemini && process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `You are the lead educational specialist for Sri Lanka's Ministry of Education, expert in inclusive pedagogy.
Transform this school lesson into an accessible, non-diagnostic multi-sensory curriculum pack for Sri Lankan students.
Grade: ${grade}
Subject: ${subject}
Title: ${title}
Original Text: ${text}

Return STRICTLY a JSON object matching this schema:
{
  "simpleExplanation": {
    "en": "Short clear English explanation (simple sentences, age-appropriate for ${grade})",
    "si": "Accurate Sinhala translation (සිංහල සරල පැහැදිලි කිරීම)",
    "ta": "Accurate Tamil translation (தமிழ் எளிய விளக்கம்)"
  },
  "stepByStep": [
    {
      "stepNumber": 1,
      "title": { "en": "Step 1 Title", "si": "පියවර 1", "ta": "படி 1" },
      "instruction": { "en": "Step 1 explanation", "si": "පියවර 1 විස්තරය", "ta": "படி 1 விளக்கம்" },
      "keyClue": { "en": "Quick memory clue", "si": "මතක හෝඩුවාව", "ta": "நினைவுக் குறிப்பு" }
    }
  ],
  "keyConcepts": [
    {
      "id": "c1",
      "concept": { "en": "Concept Name", "si": "සංකල්පය", "ta": "கருத்து" },
      "summary": { "en": "Summary in EN", "si": "සාරාංශය", "ta": "சுருக்கம்" }
    }
  ],
  "vocabulary": [
    {
      "id": "v1",
      "word": { "en": "Word", "si": "වචනය", "ta": "சொல்" },
      "meaning": { "en": "Meaning", "si": "තේරුම", "ta": "பொருள்" },
      "example": { "en": "Example sentence", "si": "උදාහරණය", "ta": "உதாரணம்" }
    }
  ],
  "easierPracticeQuestions": [
    {
      "id": "p1",
      "question": { "en": "Easy question?", "si": "ප්‍රශ්නය?", "ta": "கேள்வி?" },
      "hint": { "en": "Helpful hint", "si": "ඉඟිය", "ta": "குறிப்பு" },
      "sampleAnswer": { "en": "Model answer", "si": "ආදර්ශ පිළිතුර", "ta": "மாதிரி விடை" }
    }
  ],
  "teacherSupport": {
    "scaffoldingTips": ["Tip 1", "Tip 2"],
    "classroomActivities": ["Activity 1", "Activity 2"],
    "pacingAdvice": "Pacing recommendation",
    "nonDiagnosticNotice": "Notice: This assistive tool is purely educational. It does not diagnose dyslexia, ADHD, autism, or decide student placement."
  },
  "questions": [
    {
      "id": "q1",
      "question": { "en": "Quiz question?", "si": "ප්‍රශ්නය?", "ta": "வினா?" },
      "options": {
        "en": ["Option A", "Option B", "Option C", "Option D"],
        "si": ["විකල්ප 1", "විකල්ප 2", "විකල්ප 3", "විකල්ප 4"],
        "ta": ["தெரிவு 1", "தெரிவு 2", "தெரிவு 3", "தெரிவு 4"]
      },
      "correctAnswerIndex": 0,
      "explanation": { "en": "Why A is correct", "si": "හේතුව", "ta": "விளக்கம்" },
      "conceptTested": "Core Concept",
      "difficulty": "Easy"
    }
  ]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });

        const jsonText = response.text?.trim() || '{}';
        const parsed = JSON.parse(jsonText);

        return res.json({
          provider: 'Gemini 3.8 Flash (Real AI Engine)',
          content: {
            simpleExplanation: parsed.simpleExplanation,
            stepByStep: parsed.stepByStep || [],
            keyConcepts: parsed.keyConcepts || [],
            vocabulary: parsed.vocabulary || [],
            easierPracticeQuestions: parsed.easierPracticeQuestions || [],
            teacherSupport: parsed.teacherSupport || {}
          },
          questions: parsed.questions || [],
          isMock: false
        });
      } catch (err: any) {
        console.warn('Gemini transformation error, falling back to mock engine:', err);
      }
    }

    // Fallback or explicit Mock mode (Offline / Exhibition Demo mode)
    return res.json({
      provider: 'Mock AI Engine (Offline / Sri Lanka Exhibition Mode)',
      isMock: true,
      useClientFallback: true
    });
  });

  // Mount Vite or static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Inclusive AI Assistant server running on http://localhost:${PORT}`);
  });
}

startServer();
