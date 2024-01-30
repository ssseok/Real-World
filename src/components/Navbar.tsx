import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { cls } from '../utils/util';

export default function Navbar() {
  const pathname = useLocation().pathname;
  const { user, isLoggedIn } = useAuth();
  const encodeStr = encodeURI(user?.username as string);

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
                className={cls(
                  'navbar_list-item',
                  pathname === '/' ? '!text-black' : '',
                )}
              >
                home
              </Link>
              <Link
                to="/editor"
                className={cls(
                  'navbar_list-item',
                  pathname === '/editor' ? '!text-black' : '',
                )}
              >
                New Article
              </Link>
              <Link
                to="/settings"
                className={cls(
                  'navbar_list-item',
                  pathname === '/' ? '!text-black' : '',
                )}
              >
                Settings
              </Link>
              <Link
                to={`/profile/${user?.username}`}
                className={cls(
                  'navbar_list-item',
                  pathname === `/profile/${encodeStr}` ? '!text-black' : '',
                )}
              >
                {user?.username}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className={cls(
                  'navbar_list-item',
                  pathname === '/' ? '!text-black' : '',
                )}
              >
                home
              </Link>
              <Link
                to="/login"
                className={cls(
                  'navbar_list-item',
                  pathname === '/login' ? '!text-black' : '',
                )}
              >
                sign in
              </Link>
              <Link
                to="/register"
                className={cls(
                  'navbar_list-item',
                  pathname === '/register' ? '!text-black' : '',
                )}
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
