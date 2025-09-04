import { DbStats } from '../lib/types';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetches database statistics from the backend API.
 * @returns Promise<DbStats> - The database statistics
 */
export async function getStats(): Promise<DbStats> {
    if (!API_BASE_URL) {
        throw new Error("API URL is not configured. Please check your .env.local file.");
    }
  
    const response = await fetch(`${API_BASE_URL}/stats`);

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.statusText}`);
  }

  return response.json();
}