import { createContext, useState, useContext, useEffect } from 'react';
import { UserInfo } from '../types/users';

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserInfo | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUserInfo: UserInfo) => void;
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
  const [user, setUser] = useState<UserInfo | null>(null);

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
      const { token, ...userInfo } = data.user;

      localStorage.setItem('authToken', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      setUser(userInfo);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error('로그인 에러:', error);
      return false;
    }
  };

  const updateUser = (updatedUserInfo: UserInfo) => {
    const { token, password, email, ...userInfo } = updatedUserInfo;
    setUser((prevUser) => ({ ...prevUser, ...updatedUserInfo }));
    localStorage.setItem('userInfo', JSON.stringify({ ...user, ...userInfo }));
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userInfo = localStorage.getItem('userInfo');

    if (token && userInfo) {
      setUser(JSON.parse(userInfo));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
