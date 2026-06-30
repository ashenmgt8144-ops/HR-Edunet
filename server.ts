import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Cache for news
let newsCache: any = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours (simulating weekly, but updating daily)

app.use(express.json({ limit: '50mb' }));

app.post("/api/chat", async (req, res) => {
  const { message, history, attachments } = req.body;

  try {
    const contents = [
      ...history.map((h: any) => ({
        role: h.role,
        parts: h.parts
      })),
      {
        role: "user",
        parts: [
          { text: message },
          ...(attachments || []).map((att: any) => ({
            inlineData: {
              data: att.data.split(',')[1],
              mimeType: att.mimeType
            }
          }))
        ]
      }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: `You are "HR EduNet Pro", the intellectual heartbeat and primary academic mentor for HRM undergraduates at the University of Ruhuna. You are NOT just another chatbot; you are a guardian of HR knowledge with a distinctive "Scholar-Mentor" personality.

        Your Personality Profile:
        - **Intellectually Rigorous yet Accessible**: You speak like a brilliant professor who simplifies complexity.
        - **Passionate Curator**: You love connecting theoretical models (Hartman, Ulrich, etc.) to real-world Sri Lankan industrial challenges.
        - **Local Pride**: You occasionally reference the excellence of the Faculty of Management and Finance at Ruhuna, subtly encouraging students to reach global standards.

        Your Response Architecture:
        1. **The Insight Core**: Get straight to the answer with academic precision.
        2. **Ruhuna Context**: If applicable, mention how this applies to the local curriculum or Sri Lankan labor market.
        3. **The Scholarly Edge**: A single "Pro-Tip" for exam papers or career growth.

        Your Prohibited Actions:
        - No fluff or long introductions. 
        - Never use generic AI phrasing like "As an AI language model..."
        - Use local Sri Lankan Labor Law nuances (e.g., Gratuity Act, EPF/ETF) when relevant to demonstrate deep expertise.`
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini AI Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/news", async (req, res) => {
  const now = Date.now();
  if (newsCache && (now - lastFetchTime < CACHE_DURATION)) {
    return res.json(newsCache);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Get the latest 8 human resource management news, trends, and special updates relevant to higher education and industry in Sri Lanka and global trends. For each item, provide a title, a short excerpt, a representative image URL from high-quality sources like Unsplash (prioritizing authentic Sri Lankan landmarks, South Asian students, modern Colombo offices, university campuses, or study rooms), a reputable news link, a category (e.g., Global Trends, Sri Lankan HR, Tech in HR), and a date. Return the result in JSON format as an array of objects.",
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              image: { type: Type.STRING },
              url: { type: Type.STRING },
              date: { type: Type.STRING },
              category: { type: Type.STRING },
            },
            required: ["id", "title", "excerpt", "image", "url", "date", "category"]
          }
        }
      }
    });

    const newsData = JSON.parse(response.text);
    newsCache = newsData;
    lastFetchTime = now;
    res.json(newsData);
  } catch (error) {
    console.error("Error fetching news:", error);
    // Return fallback data if AI fetch fails
    const fallbackData = [
      {
        id: "1",
        title: "The Future of Hybrid Work in 2025",
        excerpt: "As organizations find their rhythm, hybrid work models are evolving to prioritize flexibility and productivity simultaneously.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
        url: "https://www.shrm.org",
        date: "May 15, 2026",
        category: "Global Trends"
      },
      {
        id: "2",
        title: "AI Integration in Recruitment",
        excerpt: "AI is transforming how HR departments source and screen candidates, making the process more efficient but requiring new ethical guidelines.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
        url: "https://www.hrtechnologist.com",
        date: "May 14, 2026",
        category: "HR Tech"
      },
      {
        id: "3",
        title: "Employee Well-being: A Sri Lankan Perspective",
        excerpt: "Local organizations are adopting new wellness initiatives to support employees amidst challenging economic conditions, focusing on mental health.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop",
        url: "https://www.ft.lk",
        date: "May 12, 2026",
        category: "Sri Lankan HR"
      },
      {
        id: "4",
        title: "Upskilling and Reskilling for the Future",
        excerpt: "The shift towards digital roles necessitates a culture of continuous learning. Organizations that invest in employee growth are seeing higher retention.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
        url: "https://www.forbes.com",
        date: "May 11, 2026",
        category: "Education"
      }
    ];
    // Don't cache error/fallback indefinitely if it failed
    res.json(fallbackData);
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
