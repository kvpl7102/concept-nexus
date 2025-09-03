import { Router } from 'express';
import { handleCreateUser, handleLoginUser, handleGetUserProfile } from './users-controller.js';
import { authMiddleware } from '../../middleware/auth-middleware.js';
const router = Router();
router.post('/', handleCreateUser);
router.post('/login', handleLoginUser);
router.get('/me', authMiddleware, handleGetUserProfile);
export default router;
//# sourceMappingURL=users-routes.js.map