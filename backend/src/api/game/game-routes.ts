import { Router } from 'express';
import { handleStartWhoAmIGame } from './game-controller.js';
import { authMiddleware } from '../../middleware/auth-middleware.js';

const router = Router();

router.post('/who-am-i/start', authMiddleware, handleStartWhoAmIGame);

export default router;