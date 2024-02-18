import { Link } from 'react-router-dom';
import useProfileFetch from '../hooks/useProfileFetch';

export default function UserProfile() {
  const { profile } = useProfileFetch();

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
