import { Router } from 'express';
import { handleGetStats } from './stats-controller.js';
const router = Router();
router.get('/', handleGetStats);
export default router;
//# sourceMappingURL=stats-routes.js.map