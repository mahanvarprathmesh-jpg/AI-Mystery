import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import healthRoutes from './routes/healthRoutes.js';
import mysteryRoutes from './routes/mysteryRoutes.js';

const app = express();

app.use(cors({ origin: env.clientOrigins }));
app.use(express.json({ limit: '32kb' }));
app.get('/api', (_request, response) => response.json({ name: 'AI Mystery Room API', version: '1.0.0' }));
app.use('/api/health', healthRoutes);
app.use('/api/mysteries', mysteryRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
