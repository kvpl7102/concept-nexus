import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
/**
 * Fetches a paginated list of facts from the database.
 * @param page - The page number to retrieve.
 * @param limit - The number of facts per page.
 * @returns An object with the list of facts and pagination metadata.
 */
export const getPaginatedFacts = async (page, limit) => {
    const offset = (page - 1) * limit;
    const [totalFacts, facts] = await Promise.all([
        prisma.fact.count(),
        prisma.fact.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                id: 'asc',
            },
        }),
    ]);
    return {
        facts,
        totalFacts,
        totalPages: Math.ceil(totalFacts / limit),
        currentPage: page,
    };
};
//# sourceMappingURL=facts-service.js.map