import { createContext, useState, useContext } from 'react';
import { APIURL } from '../utils/util';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface User {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => Promise.resolve(false),
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${APIURL}/users`);
      const users = await response.json();

      const matchedUser = users.find(
        (u: { email: string; password: string }) =>
          u.email === email && u.password === password,
      );

      if (matchedUser) {
        setUser(matchedUser);
        setIsLoggedIn(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('로그인 에러:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
