import { getPaginatedFacts } from './facts-service.js';
/**
 * Handles the HTTP request for a paginated list of facts.
 * Parses query parameters and calls the service.
 */
export const handleGetPaginatedFacts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    try {
        const result = await getPaginatedFacts(page, limit);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching facts' });
    }
};
//# sourceMappingURL=facts-controller.js.map