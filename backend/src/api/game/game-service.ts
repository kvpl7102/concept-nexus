import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRandomConceptForGame = async () => {

    const conceptCount = await prisma.concept.count({
        where: {
            lang: 'en',
            label: {
                not: {
                    contains: ' '
                }
            }
        }
    });
    const randomOffset = Math.floor(Math.random() * conceptCount);
    const randomConcept = await prisma.concept.findFirst({
        where: {
            lang: 'en',
            label: {
                not: {
                    contains: ' '
                }
            }
        },
        skip: randomOffset,
    });

    if (!randomConcept) {
        throw new Error('Could not find a random concept to start the game.');
    }

    return randomConcept;
};