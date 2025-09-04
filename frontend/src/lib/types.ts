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