import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI,
  clientOrigins: (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((origin) => origin.trim()).filter(Boolean),
  nodeEnv: process.env.NODE_ENV || 'development',
  geminiApiKey: process.env.GEMINI_API_KEY,
  geminiModel: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
};
