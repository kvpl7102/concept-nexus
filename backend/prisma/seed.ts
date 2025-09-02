import { PrismaClient } from '@prisma/client';
import axios from 'axios';

// Initialize Prisma Client
const prisma = new PrismaClient();

const RELATIONS_TO_FETCH = [
    '/r/RelatedTo', '/r/FormOf', '/r/IsA', '/r/PartOf', '/r/HasA',
    '/r/UsedFor', '/r/CapableOf', '/r/AtLocation', '/r/Causes', '/r/HasSubevent',
    '/r/HasFirstSubevent', '/r/HasLastSubevent', '/r/HasPrerequisite',
    '/r/MotivatedByGoal', '/r/ObstructedBy', '/r/Desires', '/r/CreatedBy',
    '/r/Synonym', '/r/Antonym', '/r/DistinctFrom', '/r/DerivedFrom',
    '/r/SymbolOf', '/r/DefinedAs', '/r/Entails', '/r/MemberOf', '/r/HasProperty',
    '/r/ReceivesAction', '/r/InstanceOf',
];

const FACTS_PER_RELATION = 25;

interface ConceptNetEdge {
    '@id': string;
    start: {
        '@id': string;
        label: string;
        language: string;
    };
    end: {
        '@id': string;
        label: string;
        language: string;
    };
    rel: {
        '@id': string;
        label: string;
    };
    surfaceText: string;
    weight: number;
}

/**
 * Parses a ConceptNet URI to extract a clean label.
 * e.g., "/c/en/cat" -> "cat"
 */
// function parseLabel(uri: string): string {
//     const parts = uri.split('/');
//     return parts.length > 2 ? parts[parts.length - 1].replace(/_/g, ' ') : uri;
// }

async function main() {
    console.log('Seeding database with ConceptNet data...');

    // Clear existing data
    console.log('Clearing previous data...');
    await prisma.fact.deleteMany({});
    await prisma.concept.deleteMany({});
    await prisma.relation.deleteMany({});

    // Fetch data from ConceptNet API
    console.log('Fetching data from ConceptNet API...');
    const allEdges: ConceptNetEdge[] = [];
    
    for (const relationUri of RELATIONS_TO_FETCH) {
        try {
            console.log(`- Fetching data for ${relationUri}...`);
            const response = await axios.get('https://api.conceptnet.io/query', {
                params: {
                    rel: relationUri,
                    limit: FACTS_PER_RELATION,
                    language: 'en',
                },
            });
            const edges: ConceptNetEdge[] = response.data.edges;
            if (edges.length > 0) {
                allEdges.push(...edges);
                console.log(`  -> Fetched ${edges.length} facts.`);
            } else {
                console.log(`  -> No facts found for ${relationUri}.`);
            }
        } catch (error) {
            console.warn(`Could not fetch data for ${relationUri}. Skipping. Error: ${error.message}`);
        }
    }
    console.log(`Total facts fetched from ConceptNet: ${allEdges.length}.`);
    
    

    // Process and insert data into the database
    console.log('Processing and saving data to the database...');
    for (const edge of allEdges) {
        const { start, end, rel } = edge;

        const startConcept = await prisma.concept.upsert({
            where: { uri: start['@id'] },
            update: {},
            create: {
                uri: start['@id'],
                label: start.label,
                lang: start.language,
            },
        });

        const endConcept = await prisma.concept.upsert({
            where: { uri: end['@id'] },
            update: {},
            create: {
                uri: end['@id'],
                label: end.label,
                lang: end.language,
            },
        });

        const relation = await prisma.relation.upsert({
            where: { uri: rel['@id'] },
            update: {},
            create: {
                uri: rel['@id'],
                label: rel.label,
            },
        });

        // Create the fact that connects the two concepts via the relation
        await prisma.fact.create({
            data: {
                startUri: startConcept.uri,
                relationUri: relation.uri,
                endUri: endConcept.uri,
            },
        });
    }

    console.log('Database seeding complete.');
}

main()
    .catch((e) => {
        console.error('An error occurred during seeding:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log('Seeding finished.');
    });