"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const { user, logout, isLoading } = useAuth();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Concept Nexus
      </Link>
      <nav className={styles.nav}>
        {isLoading ? (
          <span>Loading...</span>
        ) : user ? (
          <>
            <Link href="/browse" className={styles.navLink}>Browse</Link>
            <Link href="/game/who-am-i" className={styles.navLink}>Play Game</Link> {/* New Link */}
            <span>Welcome, {user.login}!</span>
            <button onClick={logout} className={styles.navLinkButton}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.navLink}>
              Login
            </Link>
            <Link href="/register" className={styles.navLink}>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
