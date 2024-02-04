import Banner from '../../components/Banner';
import { useAuth } from '../../contexts/AuthContext';
import HomeForm from "../../components/home/HomeForm";

export default function HomePage() {
  const { isLoggedIn  } = useAuth();

  return (
    <>
      {!isLoggedIn && <Banner />}
     <HomeForm />
    </>
  );
}
