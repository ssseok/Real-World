import UserProfile from '../../components/UserProfile';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfilePage() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && <UserProfile />}
      <div className="page"></div>
    </>
  );
}
