import { Router } from 'express';
import { handleGetPaginatedFacts } from './facts-controller.js';
const router = Router();
// Defines the endpoint: GET /api/facts/
router.get('/', handleGetPaginatedFacts);
export default router;
//# sourceMappingURL=facts-routes.js.map