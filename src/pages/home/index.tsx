import Banner from '../../components/Banner';
import { useAuth } from '../../contexts/AuthContext';

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  return (
    <>
      {!isLoggedIn && <Banner />}
      <div className="page mt-6">Home</div>
    </>
  );
}
