import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <div className="content-area">
        <Outlet />
        </div>
      <Footer />
    </div>
  );
}
