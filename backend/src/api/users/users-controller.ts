import { Request, Response } from 'express';
import { createUser, loginUser, getUserById } from './users-service.js';


/**
 * Handles the HTTP request to create a new user.
 */
export const handleCreateUser = async (req: Request, res: Response) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ message: 'Login and password are required' });
    }
    
    try {
        const newUser = await createUser(login, password);
        
        res.status(201).json(newUser);
    } catch (error: any) {
        if (error.message === 'UsernameAlreadyExists') {
            return res.status(409).json({ message: 'A user with this login already exists' });
        }
        res.status(500).json({ message: 'Error creating user' });
    }
};

/**
 * Handles the HTTP request for user login.
 */
export const handleLoginUser = async (req: Request, res: Response) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ message: 'Login and password are required' });
    }

    try {
        const token = await loginUser(login, password);

        if (!token) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'An internal server error occurred' });
    }
};

/**
 * Handles the HTTP request for retrieving the logged-in user's profile.
 * Assumes that the JWT middleware has already verified the user's identity
 * and attached the user object to the request object as `req.user`.
 */
export const handleGetUserProfile = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const user = await getUserById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
};