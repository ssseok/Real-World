import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home';
import LoginPage from '../pages/users/Login';
import RegisterPage from '../pages/users/Register';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
