import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home';
import LoginPage from '../pages/users/Login';
import RegisterPage from '../pages/users/Register';
import { useAuth } from '../contexts/AuthContext';
import Layout from './Layout';
import EditorPage from '../pages/posts/Editor';

export default function Router() {
  const { isLoggedIn } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 홈 페이지를 기본 라우트로 설정 */}
        <Route index element={<HomePage />} />

        {/* 나머지 페이지들을 홈 페이지의 자식으로 설정 */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="editor" element={<EditorPage />} />

        {/* 리다이렉션 룰 */}
        <Route
          path="*"
          element={<Navigate replace to={isLoggedIn ? '/' : '/login'} />}
        />
      </Route>
    </Routes>
  );
}
