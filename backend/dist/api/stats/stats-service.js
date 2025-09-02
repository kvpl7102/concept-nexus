import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
/**
 * Gathers statistics from the database.
 * @returns An object containing counts of concepts, relations, facts, and users.
 */
export async function getDbStats() {
    const [conceptCount, relationCount, factCount, userCount] = await Promise.all([
        prisma.concept.count(),
        prisma.relation.count(),
        prisma.fact.count(),
        prisma.user.count(),
    ]);
    return {
        concepts: conceptCount,
        relations: relationCount,
        facts: factCount,
        users: userCount,
    };
}
//# sourceMappingURL=stats-service.js.map