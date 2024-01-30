import UserInfo from "../../components/UserInfo";
import { useAuth } from '../../contexts/AuthContext';

export default function ProfilePage() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && <UserInfo/>}
      <div className="page"></div>
    </>
  );
}
