// Type for database statistics
export interface DbStats {
    concepts: number;
    relations: number;
    facts: number;
    users: number;
}

// Type for user login/registration credentials
export interface UserCredentials {
    login: string;
    password: string;
}

// Type for the response from the login API
export interface AuthResponse {
    token: string;
}

// Type for a user object (without the password)
export interface User {
    id: number;
    login: string;
    score: number;
    createdAt: string;
}
// Type for a ConceptNet edge
export interface ConceptNetEdge {
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
    weight: number;
}

// Type for the ConceptNet response 
export interface ConceptNetResponse {
    edges: ConceptNetEdge[];
    view: {
        '@id': string;
        nextPage?: string;
    };
}

// Type for a Concept object 
export interface Concept {
    id: number;
    uri: string;
    label: string;
    lang: string;
}