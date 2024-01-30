import { createContext, useState, useContext, useEffect } from 'react';
import { APIURL } from '../utils/util';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// interface User {
//   email: string;
//   password: string;
//   username: string;
//   id: number;
// }

// back 통신
interface User {
  user_id: number;
  username: string;
  token: string;
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
      // const response = await fetch(`${APIURL}/users`);

      // back 통신
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

      const users = await response.json();

      // const matchedUser = users.find(
      //   (u: { email: string; password: string }) =>
      //     u.email === email && u.password === password,
      // );

      // if (matchedUser) {
      //   setUser(matchedUser);
      //   setIsLoggedIn(true);
      //   return true;
      // }
      // return false;

      // back 통신
      if (users?.user?.token) {
        localStorage.setItem('authToken', users?.user?.token);
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            username: users?.user?.username,
            user_id: users?.user?.user_id,
          }),
        );
        setUser(users.user);
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
    localStorage.removeItem('authToken');
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
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
