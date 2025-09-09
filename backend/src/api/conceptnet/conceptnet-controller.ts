import { Request, Response } from 'express';
import { queryConceptNetByConcept } from './conceptnet-service.js';

export const handleConceptNetQuery = async (req: Request, res: Response) => {
    const { lang, concept } = req.params;
    const { limit, offset } = req.query;

    if (!lang || !concept) {
        return res.status(400).json({ message: 'Language and concept are required URL parameters.' });
    }

    const queryLimit = parseInt(limit as string) || 20;
    const queryOffset = parseInt(offset as string) || 0;

    try {
        const data = await queryConceptNetByConcept(lang, concept, queryLimit, queryOffset);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while querying ConceptNet.' });
    }
};

