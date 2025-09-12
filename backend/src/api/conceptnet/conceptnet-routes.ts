import { Router } from 'express';
import { handleConceptNetQuery } from './conceptnet-controller.js';
import { authMiddleware } from '../../middleware/auth-middleware.js';

const router = Router();

/**
 * @swagger
 * /concept/{lang}/{concept}:
 *   get:
 *     summary: Query ConceptNet
 *     description: Retrieves information about a concept from ConceptNet. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lang
 *         required: true
 *         schema:
 *           type: string
 *         description: The language of the concept (e.g., 'en').
 *       - in: path
 *         name: concept
 *         required: true
 *         schema:
 *           type: string
 *         description: The concept to query (e.g., 'cat').
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: The maximum number of results to return.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: The number of results to skip.
 *     responses:
 *       200:
 *         description: Successfully retrieved data from ConceptNet.
 *       400:
 *         description: Language and concept are required URL parameters.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: An error occurred while querying ConceptNet.
 */
router.get('/:lang/:concept', authMiddleware, handleConceptNetQuery);

export default router;