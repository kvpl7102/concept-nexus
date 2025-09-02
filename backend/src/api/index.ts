import { Router } from 'express';
import statsRouter from './stats/stats-routes.js';
import factsRouter from './facts/facts-routes.js';
import usersRouter from './users/users-routes.js';

const router = Router();

router.use('/stats', statsRouter);
router.use('/facts', factsRouter);
router.use('/users', usersRouter);

export default router;