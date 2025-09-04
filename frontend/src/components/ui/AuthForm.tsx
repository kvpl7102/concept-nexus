"use client";

import { useState } from 'react';
import { UserCredentials } from '@/lib/types';
import styles from './AuthForm.module.css';

interface AuthFormProps {
  formType: 'Login' | 'Register';
  onSubmit: (credentials: UserCredentials) => Promise<void>;
}

export default function AuthForm({ formType, onSubmit }: AuthFormProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await onSubmit({ login, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1>{formType}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="login">Username</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Processing...' : formType}
        </button>
      </form>
    </main>
  );
}
