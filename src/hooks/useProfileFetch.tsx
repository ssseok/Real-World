import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types/users';

export default function useProfileFetch(username: string | undefined) {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);

  const token = localStorage.getItem('authToken');

  const profileFetch = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/profile?username=${username}`,
        {
          method: 'GET',
          headers: {
            authorization: token as any,
          },
        },
      );
      const result = await response.json();

      setProfile(result?.user);
      // 현재 로그인한 사용자의 username과 조회하는 프로필의 username이 같을 때만 updateUser 호출
      if (user && username === user.username) {
        updateUser(result?.user);
      }
    } catch (error: any) {
      console.error('프로필 에러', error);
    }
  };

  useEffect(() => {
    if (username) {
      // username이 제공된 경우에만 프로필 정보를 조회합니다.
      profileFetch();
    }
  }, [username]);

  return { profile };
}
