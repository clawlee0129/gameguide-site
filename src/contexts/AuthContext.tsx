'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('ggp_current_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user from localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Initialize users array if not exists
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const existingUsers = localStorage.getItem('ggp_users');
      if (!existingUsers) {
        // Create initial users
        const initialUsers = [
          {
            id: '1',
            username: 'demo_user',
            email: 'demo@example.com',
            password: 'demo123',
            createdAt: new Date().toISOString(),
          },
        ];
        localStorage.setItem('ggp_users', JSON.stringify(initialUsers));
      }
    } catch (error) {
      console.error('Failed to initialize users:', error);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const usersStr = localStorage.getItem('ggp_users');
      if (!usersStr) {
        return { success: false, error: 'No users found' };
      }

      const users = JSON.parse(usersStr);
      const foundUser = users.find((u: any) => u.email === email && u.password === password);

      if (!foundUser) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Remove password before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('ggp_current_user', JSON.stringify(userWithoutPassword));

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      // Validation
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      const usersStr = localStorage.getItem('ggp_users');
      const users = usersStr ? JSON.parse(usersStr) : [];

      // Check if email already exists
      if (users.some((u: any) => u.email === email)) {
        return { success: false, error: 'Email already registered' };
      }

      // Check if username already exists
      if (users.some((u: any) => u.username === username)) {
        return { success: false, error: 'Username already taken' };
      }

      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('ggp_users', JSON.stringify(users));

      // Auto login after registration
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('ggp_current_user', JSON.stringify(userWithoutPassword));

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An error occurred during registration' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ggp_current_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('ggp_current_user', JSON.stringify(updatedUser));

    // Also update in users array
    try {
      const usersStr = localStorage.getItem('ggp_users');
      if (usersStr) {
        const users = JSON.parse(usersStr);
        const userIndex = users.findIndex((u: any) => u.id === user.id);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...userData };
          localStorage.setItem('ggp_users', JSON.stringify(users));
        }
      }
    } catch (error) {
      console.error('Failed to update user in users array:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Updated: 2026-05-26 - Phase 3