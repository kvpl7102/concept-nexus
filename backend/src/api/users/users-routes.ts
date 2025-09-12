import { Router } from 'express';
import { handleCreateUser, handleLoginUser, handleGetUserProfile } from './users-controller.js';
import { authMiddleware } from '../../middleware/auth-middleware.js';

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Login and password are required.
 *       409:
 *         description: A user with this login already exists.
 *       500:
 *         description: Error creating user.
 */
router.post('/', handleCreateUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Login and password are required.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: An internal server error occurred.
 */
router.post('/login', handleLoginUser);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get user profile
 *     description: Retrieves the profile of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: User not found.
 */
router.get('/me', authMiddleware, handleGetUserProfile);

export default router;