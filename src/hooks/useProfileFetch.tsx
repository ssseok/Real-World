import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProfileProps {
  username: string;
  profile_image: string;
  bio?:string;
  email?:string;
  password?:string;
}

export default function useProfileFetch() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileProps | null>(null);

  const token = localStorage.getItem('authToken');

  const profileFetch = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/user/${user?.user_id}/profile`,
        {
          method: 'GET',
          headers: {
            authorization: token as any,
          },
        },
      );
      const result = await response.json();
      setProfile(result.user);
    } catch (error: any) {
      console.error('프로필 에러', error);
    }
  };

  useEffect(() => {
    if (user?.user_id) {
      profileFetch();
    }
  }, [user?.user_id]);

  return {profile};
}
