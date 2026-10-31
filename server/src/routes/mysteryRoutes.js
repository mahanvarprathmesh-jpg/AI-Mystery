import { Router } from 'express';
import { createMystery, getMystery, submitAccusation } from '../controllers/mysteryController.js';
import { generationLimit } from '../middleware/generationLimit.js';

const router = Router();
router.post('/generate', generationLimit, createMystery);
router.get('/:id', getMystery);
router.post('/:id/accusation', submitAccusation);

export default router;
