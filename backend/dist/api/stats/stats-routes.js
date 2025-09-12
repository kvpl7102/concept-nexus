import { Router } from 'express';
import { handleGetStats } from './stats-controller.js';
const router = Router();
/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get database statistics
 *     description: Retrieves statistics about the database, such as the number of users, facts, and concepts.
 *     responses:
 *       200:
 *         description: Successfully retrieved database statistics.
 *       500:
 *         description: Error fetching database statistics.
 */
router.get('/', handleGetStats);
export default router;
//# sourceMappingURL=stats-routes.js.map