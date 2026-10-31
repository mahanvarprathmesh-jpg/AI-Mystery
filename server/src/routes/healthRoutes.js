import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/', (_request, response) => {
  response.json({
    success: true,
    service: 'AI Mystery Room API',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

export default router;
