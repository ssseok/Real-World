import { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types/users';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUserInfo: User) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: async () => false,
  logout: () => {},
  updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) throw new Error(`Login failed: ${response.status}`);

      const data = await response.json();
      const { access_token, refresh_token, ...userInfo } = data.user;

      localStorage.setItem('authToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      setUser(userInfo);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error('로그인 에러:', error);
      return false;
    }
  };

  const getRefreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await fetch(
        `${import.meta.env.VITE_URL}/token-refresh`,
        {
          method: 'GET',
          headers: {
            Authorization: `${refreshToken}`,
          },
        },
      );

      if (!response.ok)
        throw new Error(`Token refresh failed: ${response.status}`);

      const data = await response.json();
      const { token } = data;

      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Token refresh error:', error);
    }
  };

  const updateUser = (updatedUserInfo: User) => {
    const { access_token, refresh_token, password, email, ...userInfo } =
      updatedUserInfo;
    setUser((prevUser) => ({ ...prevUser, ...updatedUserInfo }));
    localStorage.setItem('userInfo', JSON.stringify({ ...user, ...userInfo }));
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userInfo = localStorage.getItem('userInfo');

    if (authToken && userInfo && refreshToken) {
      setUser(JSON.parse(userInfo));
      setIsLoggedIn(true);
    }

    const checkTokenValidity = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        await getRefreshToken();
      }
    };

    checkTokenValidity();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
