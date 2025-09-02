import { Request, Response } from 'express';
import { getDbStats } from './stats-service.js';

/**
 * Handles the HTTP request for database statistics.
 * Calls the service, and sends the response.
 */
export const handleGetStats = async (req: Request, res: Response) => {
    try {
        const stats = await getDbStats();
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching database statistics' });
    }
};