import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types/users';

export default function useProfileFetch() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);

  const token = localStorage.getItem('authToken');

  console.log(user);

  const profileFetch = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/profile/username?${user?.username}`,
        {
          method: 'GET',
          headers: {
            authorization: token as any,
          },
        },
      );
      const result = await response.json();

      setProfile(result?.user);
      updateUser(result?.user);
    } catch (error: any) {
      console.error('프로필 에러', error);
    }
  };

  useEffect(() => {
    if (user?.user_id) {
      profileFetch();
    }
  }, [user?.user_id]);

  return { profile };
}
