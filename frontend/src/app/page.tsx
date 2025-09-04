"use client";
import { useState, useEffect } from 'react';
import { getStats } from '../services/api';
import { DbStats } from '@/lib/types';
import StatsSection from '../components/features/StatsSection';
import styles from './page.module.css';

export default function HomePage() {
  const [stats, setStats] = useState<DbStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []); 

  return (
    <main className={styles.main}>
      <StatsSection stats={stats} isLoading={isLoading} error={error} />
    </main>
  );
}

