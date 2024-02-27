import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Navbar from "./Navbar";

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
