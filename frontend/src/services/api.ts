import { DbStats, UserCredentials, AuthResponse, User } from '../lib/types';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetches database statistics from the backend API.
 * @returns Promise<DbStats> - The database statistics
 */
export async function getStats(): Promise<DbStats> {
    if (!API_URL) {
        throw new Error("API URL is not configured. Please check your .env.local file.");
    }
  
    const response = await fetch(`${API_URL}/stats`);

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Logs in a user.
 * @param credentials - The user's login and password.
 * @returns A promise that resolves to the authentication response (including the token).
 */
export async function loginUser(credentials: UserCredentials): Promise<AuthResponse> {
  if (!API_URL) throw new Error("API URL is not configured.");
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed.');
  }
  return data;
}

/**
 * Registers a new user.
 * @param credentials - The new user's login and password.
 * @returns A promise that resolves to the newly created user object.
 */
export async function registerUser(credentials: UserCredentials): Promise<User> {
  if (!API_URL) throw new Error("API URL is not configured.");
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed.');
  }
  return data;
}

/**
 * Fetches the current user's profile using a JWT.
 * @param token - The user's authentication token.
 * @returns A promise that resolves to the user object.
 */
export async function getUserProfile(token: string): Promise<User> {
  if (!API_URL) throw new Error("API URL is not configured.");

  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`, // <-- This is how we send the token
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile.");
  }
  return response.json();
}