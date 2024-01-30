import { useAuth } from '../../contexts/AuthContext';

export default function ProfilePage() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && <></>}
      <div className="page"></div>
    </>
  );
}
