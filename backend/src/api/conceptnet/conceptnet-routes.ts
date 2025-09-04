import { Router } from 'express';
import { handleConceptNetQuery } from './conceptnet-controller.js';
import { authMiddleware } from '../../middleware/auth-middleware.js';

const router = Router();

/**
 * Endpoint to query ConceptNet for a specific concept.
 * Example: GET /api/concept/en/cat
 * Requires authentication.
 */
router.get('/:lang/:concept', authMiddleware, handleConceptNetQuery);

export default router;