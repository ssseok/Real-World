import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const pathname = useLocation().pathname;
  const { isLoggedIn, user } = useAuth();

  return (
    <nav className="navbar">
      <div className="page flex justify-between items-center h-full">
        <Link to="/" className="navbar_logo">
          conduit
        </Link>
        <div className="navbar_list">
          {isLoggedIn ? (
            <>
              <Link
                to="/"
                className={`${
                  pathname === '/' ? 'text-black' : ''
                }navbar_list-item`}
              >
                home
              </Link>
              <Link
                to="/editor"
                className={`${
                  pathname === '/' ? 'text-black' : ''
                }navbar_list-item`}
              >
                New Article
              </Link>
              <Link
                to="/"
                className={`${
                  pathname === '/' ? 'text-black' : ''
                }navbar_list-item`}
              >
                Settings
              </Link>
              <Link
                to={`/profile/${user?.username}`}
                className={`${
                  pathname === '/' ? 'text-black' : ''
                }navbar_list-item`}
              >
                {user?.username}
              </Link>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
