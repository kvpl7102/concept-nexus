import { Router } from 'express';
import { handleCreateUser, handleLoginUser } from './users-controller.js';
const router = Router();
router.post('/', handleCreateUser);
router.post('/login', handleLoginUser);
export default router;
//# sourceMappingURL=users-routes.js.map