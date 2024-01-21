import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="page flex justify-between items-center h-full">
        <Link to="/" className="navbar_logo">
          conduit
        </Link>
        <div className="navbar_list">
          <Link to="/" className="navbar_list-item tex">
            home
          </Link>
          <Link to="/login" className="navbar_list-item">
            sign in
          </Link>
          <Link to="/register" className="navbar_list-item">
            sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
