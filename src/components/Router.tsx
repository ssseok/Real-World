import HomePage from '@pages/home';
import { Route, Routes } from 'react-router-dom';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<HomePage />} />
      <Route path="/signup" element={<HomePage />} />
    </Routes>
  );
}
