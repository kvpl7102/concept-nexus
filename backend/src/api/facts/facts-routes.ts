import { Router } from 'express';
import { handleGetPaginatedFacts } from './facts-controller.js';

const router = Router();

// Defines the endpoint: GET /api/facts/
/**
 * @swagger
 * /facts:
 *   get:
 *     summary: Get paginated facts
 *     description: Retrieves a paginated list of facts.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: The number of facts to retrieve per page.
 *     responses:
 *       200:
 *         description: A paginated list of facts.
 *       500:
 *         description: Error fetching facts.
 */
router.get('/', handleGetPaginatedFacts);

export default router;