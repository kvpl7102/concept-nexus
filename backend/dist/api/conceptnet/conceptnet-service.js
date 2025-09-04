import axios from 'axios';
const CONCEPTNET_API_URL = 'https://api.conceptnet.io';
/**
 * Queries the ConceptNet API for a given concept.
 * @param lang - The language code (e.g., 'en').
 * @param concept - The concept to search for (e.g., 'cat').
 * @param limit - The number of results to return.
 * @param offset - The offset for pagination.
 * @returns The data from the ConceptNet API response.
 */
export const queryConceptNetByConcept = async (lang, concept, limit, offset) => {
    const conceptUri = `/c/${lang}/${concept}`;
    try {
        const response = await axios.get(`${CONCEPTNET_API_URL}/query`, {
            params: {
                node: conceptUri,
                limit,
                offset,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('Error querying ConceptNet API:', error);
        throw new Error('Failed to fetch data from ConceptNet.');
    }
};
//# sourceMappingURL=conceptnet-service.js.map