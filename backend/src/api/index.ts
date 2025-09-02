import { Router } from 'express';
import statsRouter from './stats/stats-routes.js';
import factsRouter from './facts/facts-routes.js';

const router = Router();

router.use('/stats', statsRouter);
router.use('/facts', factsRouter);

export default router;