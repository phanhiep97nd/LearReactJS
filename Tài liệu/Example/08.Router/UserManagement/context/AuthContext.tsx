import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { fetchProfile, loginUser } from '../backend';

interface AuthContextType {
  user: { role: string } | null;
  login: (credentials: { username: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
/**
 * Cung cấp một auth đơn giản để kiểm tra trạng thái đăng nhập
 * @param param0 
 * @returns 
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ role: string } | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Call login API
  const { mutate: login } = useMutation(loginUser, {
    onSuccess: async () => {
      const profile = await queryClient.fetchQuery('profile', fetchProfile);
      setUser(profile);
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  })

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const defaultAuthContext: AuthContextType = {
    login,
    logout,
    user
  }

  return (
    <AuthContext.Provider value={defaultAuthContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
