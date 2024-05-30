import { createContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '../utils/axiosInstance';

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<{ user: string | null; isAuthenticated: boolean; loading: boolean }>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/auth/jwtcheck');
        setAuth({ user: response.data.username, isAuthenticated: true, loading: false });
      } catch (error) {
        setAuth({ user: null, isAuthenticated: false, loading: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    setAuth((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      setAuth({ user: response.data.username, isAuthenticated: true, loading: false });
      // Redirect to the protected route after successful login
      window.location.href = '/quest';
    } catch (error) {
      setAuth((prevState) => ({ ...prevState, loading: false }));
      throw error;
    }
  };

  const logout = async () => {
    await axiosInstance.post('/auth/logout');
    setAuth({ user: null, isAuthenticated: false, loading: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
export type { AuthContextType };


