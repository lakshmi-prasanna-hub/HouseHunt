import React, { createContext, useContext } from 'react';
import { useAuth as useSupabaseAuth } from '../hooks/useAuth';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: { name: string; email: string; password: string; role: string; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useSupabaseAuth();

  const login = async (email: string, password: string) => {
    return await auth.signIn(email, password);
  };

  const register = async (userData: { name: string; email: string; password: string; role: string; phone?: string }) => {
    return await auth.signUp(userData.email, userData.password, {
      name: userData.name,
      role: userData.role,
      phone: userData.phone
    });
  };

  const logout = async () => {
    return await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user: auth.user,
      loading: auth.loading,
      login,
      register,
      logout,
      updateProfile: auth.updateProfile,
      isAuthenticated: auth.isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};