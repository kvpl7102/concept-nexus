"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { searchConcept } from '@/services/api';
import { ConceptNetEdge } from '@/lib/types';
import styles from './browse.module.css';

export default function BrowsePage() {
  const { user, token, isLoading: isAuthLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ConceptNetEdge[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim() || !token) return;

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const data = await searchConcept(searchTerm.trim(), token);
      setResults(data.edges);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
    }
  }, [searchTerm]);
  
  if (isAuthLoading) {
    return <main className={styles.container}><p>Loading user session...</p></main>;
  }

  if (!user) {
    return <main className={styles.container}><p>Please log in to browse concepts.</p></main>;
  }

  return (
    <main className={styles.container}>
      <h1>Browse Concepts</h1>
      <p>Enter a word (e.g., "cat", "coffee", "moon") to search the ConceptNet graph.</p>
      
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a concept..."
          className={styles.input}
          disabled={isLoading}
        />
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className={styles.resultsContainer}>
        {error && <p className={styles.error}>{error}</p>}
        {results.length > 0 && (
          <ul className={styles.resultsList}>
            {results.map((edge) => (
              <li key={edge['@id']} className={styles.resultItem}>
                <strong>{edge.start.label}</strong> {edge.rel.label} <strong>{edge.end.label}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
