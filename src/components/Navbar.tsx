import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center mx-auto h-full">
        <Link to="/" className="navbar_logo">
          conduit
        </Link>
        <div className="navbar_list">
          <Link to="/users/likes" className="navbar_list-item tex">
            home
          </Link>
          <Link to="/login" className="navbar_list-item">
            sign in
          </Link>
          <Link to="/signup" className="navbar_list-item">
            sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
