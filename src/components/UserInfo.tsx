import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface UserInfoProps {
  username: string;
  profile_image: string;
}

export default function UserInfo() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserInfoProps | null>(null);

  const token = localStorage.getItem('authToken');
  const user_id = user?.user_id;

  const profileFetch = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/user/${user_id}/profile`,
        {
          method: 'GET',
          headers: {
            authorization: token as any,
          },
        },
      );
      const result = await response.json();
      console.log(result);
      setProfile(result.user);
    } catch (error: any) {
      console.error('프로필 에러', error);
    }
  };

  useEffect(() => {
    profileFetch();
  }, []);
  return (
    <div className="bg-[#f3f3f3] pt-8 pb-4">
      <div className="page">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-4">
            <img
              className="rounded-full w-[100px] h-[100px]"
              src={profile?.profile_image}
              alt="profile"
            />
          </div>
          <h4 className="font-bold text-2xl mb-2">{profile?.username}</h4>
        </div>
        <div className="flex justify-end">
          <Link
            to="/settings"
            className="text-[#999] border border-[#999] py-1 px-2 text-sm rounded"
          >
            Edit Profile Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
