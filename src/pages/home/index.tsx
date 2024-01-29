import Banner from '../../components/Banner';
import { useAuth } from '../../contexts/AuthContext';

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {!isLoggedIn && <Banner />}
      <div className="page">Home</div>
    </>
  );
}
