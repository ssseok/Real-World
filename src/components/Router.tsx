import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home';
import LoginPage from '../pages/users/Login';
import RegisterPage from '../pages/users/Register';
import { useAuth } from '../contexts/AuthContext';

export default function Router() {
  const { isLoggedIn } = useAuth();
  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate replace to={'/'} />} />
        </>
      ) : (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate replace to={'/login'} />} />
        </>
      )}
    </Routes>
  );
}
