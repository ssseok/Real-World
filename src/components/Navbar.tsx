import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const pathname = useLocation().pathname;

  console.log(pathname);

  return (
    <nav className="navbar">
      <div className="page flex justify-between items-center h-full">
        <Link to="/" className="navbar_logo">
          conduit
        </Link>
        <div className="navbar_list">
          <Link
            to="/"
            className={`${
              pathname === '/' ? 'text-black' : ''
            }navbar_list-item`}
          >
            home
          </Link>
          <Link
            to="/login"
            className={`${
              pathname === '/login' ? 'text-black' : ''
            }navbar_list-item`}
          >
            sign in
          </Link>
          <Link
            to="/register"
            className={`${
              pathname === '/register' ? 'text-black' : ''
            }navbar_list-item`}
          >
            sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
