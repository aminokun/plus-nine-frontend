import { createContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '../utils/axiosInstance';

interface AuthContextType {
  user: Object | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (credentials: { username: string; email: string; password: string; confirmPassword: string; }) => Promise<void>;
  logout: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType>({
  user: {
    username: "",
    email: "",
    customerId: "",
    role: "",
  },
  isAuthenticated: false,
  loading: true,
  login: async () => { },
  register: async () => { },
  logout: async () => { },
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<{ user: Object | null; isAuthenticated: boolean; loading: boolean }>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/auth/jwtcheck');
        setAuth({
          user: {
            username: response.data.username,
            email: response.data.email,
            customerId: response.data.customerId,
            role: response.data.role,
          }, isAuthenticated: true, loading: false
        });
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
      setAuth({
        user: {
          username: response.data.username,
          email: response.data.email,
          customerId: response.data.customerId,
          role: response.data.role,
        }, isAuthenticated: true, loading: false
      });
      if (response.data.customerId == null) {
        const customerResponse = await axiosInstance.post('/stripe/createCustomer', credentials);
        setAuth({
          user: {
            customerId: customerResponse.data.Id,
          }, isAuthenticated: true, loading: false
        });
      }
      window.location.href = '/quest';
    } catch (error) {
      setAuth((prevState) => ({ ...prevState, loading: false }));
      throw error;
    }
  };

  const register = async (credentials: { username: string; email: string; password: string; confirmPassword: string; }) => {
    setAuth((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await axiosInstance.post('/auth/register', credentials);
      setAuth({
        user: {
          username: response.data.username,
          email: response.data.email,
          customerId: response.data.customerId,
          role: response.data.role,
        }, isAuthenticated: false, loading: false
      });
      window.location.href = '/login';
    } catch (error) {
      setAuth((prevState) => ({ ...prevState, loading: false }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      setAuth({ user: null, isAuthenticated: false, loading: false });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
export type { AuthContextType };


