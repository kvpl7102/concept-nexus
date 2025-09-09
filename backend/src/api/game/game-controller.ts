import { Request, Response } from 'express';
import { getRandomConceptForGame } from './game-service.js';

export const handleStartWhoAmIGame = async (req: Request, res: Response) => {
    try {
        const concept = await getRandomConceptForGame();
        res.status(200).json({ conceptToGuess: concept });
    } catch (error) {
        res.status(500).json({ message: 'Failed to start a new game.' });
    }
};