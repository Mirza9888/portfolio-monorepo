'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  getToken: () => string | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions for cookie management
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict${process.env.NODE_ENV === 'production' ? ';Secure' : ''}`;
};

const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if we have a token in cookies
    const token = getCookie('token');
    if (token) {
      // You might want to validate the token here
      // and fetch user data if needed
    }
  }, []);

  const login = (token: string, userData: User) => {
    setCookie('token', token, 7); // 7 days
    setUser(userData);
  };

  const logout = () => {
    removeCookie('token');
    setUser(null);
  };

  const getToken = () => {
    return getCookie('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
