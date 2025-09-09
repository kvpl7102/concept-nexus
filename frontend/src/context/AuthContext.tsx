"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import { getUserProfile } from '@/services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        try {
          const profile = await getUserProfile();
          setUser(profile);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          localStorage.removeItem('authToken');
          setToken(null);
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (newToken: string) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    try {
      const profile = await getUserProfile();
      setUser(profile);
    } catch (error) {
      console.error("Failed to fetch profile after login", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
