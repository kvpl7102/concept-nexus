import { Router } from 'express';
import { handleStartWhoAmIGame } from './game-controller.js';
import { authMiddleware } from '../../middleware/auth-middleware.js';

const router = Router();

/**
 * @swagger
 * /game/who-am-i/start:
 *   post:
 *     summary: Start a new "Who Am I?" game
 *     description: Starts a new "Who Am I?" game and returns a random concept to guess. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully started a new game.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 conceptToGuess:
 *                   type: string
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Failed to start a new game.
 */
router.post('/who-am-i/start', authMiddleware, handleStartWhoAmIGame);

export default router;