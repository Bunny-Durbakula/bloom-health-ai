import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api, setToken } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bloom_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem('bloom_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('bloom_token');
      if (storedToken) {
        try {
          const profile = await api.getMe();
          setUser(profile);
          localStorage.setItem('bloom_user', JSON.stringify(profile));
        } catch {
          // Token expired or invalid
          setToken(null);
          setTokenState(null);
          setUser(null);
          localStorage.removeItem('bloom_user');
        }
      }
      setIsLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (email: string, password: string) => {
    const resp = await api.login({ email, password });
    setToken(resp.token);
    setTokenState(resp.token);
    setUser(resp.user);
    localStorage.setItem('bloom_user', JSON.stringify(resp.user));
  };

  const register = async (email: string, password: string) => {
    const resp = await api.register({ email, password });
    setToken(resp.token);
    setTokenState(resp.token);
    setUser(resp.user);
    localStorage.setItem('bloom_user', JSON.stringify(resp.user));
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      setToken(null);
      setTokenState(null);
      setUser(null);
      localStorage.removeItem('bloom_user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
