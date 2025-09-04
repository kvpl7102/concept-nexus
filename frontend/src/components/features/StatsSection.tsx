import { DbStats } from '@/lib/types';
import styles from './StatsSection.module.css';

interface StatsSectionProps {
  stats: DbStats | null;
  isLoading: boolean;
  error: string | null;
}

export default function StatsSection({ stats, isLoading, error }: StatsSectionProps) {
  return (
    <>
      <h1>Concept Nexus Backend Status</h1>
      <p>This page fetches data from the backend API to verify the full-stack connection.</p>

      <div className={styles.container}>
        {isLoading && <p>Loading stats from the database...</p>}
        {error && <p className={styles.error}><strong>Error:</strong> {error}</p>}
        {stats && (
          <ul className={styles.statsList}>
            <li><strong>Concepts in DB:</strong> {stats.concepts}</li>
            <li><strong>Relations in DB:</strong> {stats.relations}</li>
            <li><strong>Facts in DB:</strong> {stats.facts}</li>
            <li><strong>Users in DB:</strong> {stats.users}</li>
          </ul>
        )}
      </div>
    </>
  );
}