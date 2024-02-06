import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserInfo } from '../types/users';

export default function useProfileFetch() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<UserInfo | null>(null);

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
