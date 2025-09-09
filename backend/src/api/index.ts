import { Router } from 'express';
import statsRouter from './stats/stats-routes.js';
import factsRouter from './facts/facts-routes.js';
import usersRouter from './users/users-routes.js';
import conceptNetRouter from './conceptnet/conceptnet-routes.js';
import gameRouter from './game/game-routes.js';

const router = Router();

router.use('/stats', statsRouter);
router.use('/facts', factsRouter);
router.use('/users', usersRouter);
router.use('/concept', conceptNetRouter);
router.use('/game', gameRouter);

export default router;