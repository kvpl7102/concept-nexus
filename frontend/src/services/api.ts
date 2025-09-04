import axios from 'axios';
import { DbStats, UserCredentials, AuthResponse, User } from '../lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("API URL is not configured. Please check your .env.local file.");
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


/**
 * Fetches database statistics from the backend API.
 * @returns Promise<DbStats> - The database statistics
 */
export async function getStats(): Promise<DbStats> {
  const response = await api.get('/stats');
  return response.data;
}

/**
 * Logs in a user.
 * @param credentials - The user's login and password.
 * @returns A promise that resolves to the authentication response (including the token).
 */
export async function loginUser(credentials: UserCredentials): Promise<AuthResponse> {
  const response = await api.post('/users/login', credentials);
  return response.data;
}

/**
 * Registers a new user.
 * @param credentials - The new user's login and password.
 * @returns A promise that resolves to the newly created user object.
 */
export async function registerUser(credentials: UserCredentials): Promise<User> {
  const response = await api.post('/users', credentials);
  return response.data;
}

/**
 * Fetches the current user's profile using a JWT.
 * @returns A promise that resolves to the user object.
 */
export async function getUserProfile(): Promise<User> {
  const response = await api.get('/users/me');
  return response.data;
}
