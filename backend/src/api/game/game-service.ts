import { PrismaClient } from '@prisma/client';
import { queryConceptNetByConcept } from '../conceptnet/conceptnet-service.js';

// Define a type for the edges to resolve the implicit 'any' issue.
interface ConceptNetEdge {
  start: { language: string };
  end: { language: string };
  [key: string]: any;
}

const prisma = new PrismaClient();

export const getRandomConceptForGame = async () => {
    const MAX_ATTEMPTS = 10;
    let attempts = 0;

    while (attempts < MAX_ATTEMPTS) {
        const conceptCount = await prisma.concept.count({
            where: {
                lang: 'en',
                label: { not: { contains: ' ' } }
            }
        });

        const randomOffset = Math.floor(Math.random() * conceptCount);
        const randomConcept = await prisma.concept.findFirst({
            where: {
                lang: 'en',
                label: { not: { contains: ' ' } }
            },
            skip: randomOffset,
        });

        if (randomConcept) {
            try {
                const clues = await queryConceptNetByConcept(randomConcept.lang, randomConcept.label, 100, 0);
                const englishClues = clues.edges.filter((edge: ConceptNetEdge) => edge.start.language === 'en' && edge.end.language === 'en');
                
                if (englishClues.length >= 3) {
                    return randomConcept; // Found a valid concept
                }
            } catch (error) {
                console.warn(`Could not fetch clues for concept: ${randomConcept.label}`, error);
            }
        }
        attempts++;
    }

    throw new Error('Could not find a suitable concept to start the game after multiple attempts.');
};