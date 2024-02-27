import { Link } from 'react-router-dom';

interface UserInfoProps {
  username: string;
  profile_image: string;
  created_at: string;
}

export default function UserInfo({
  username,
  profile_image,
  created_at,
}: UserInfoProps) {
  return (
    <div className="flex items-center">
      <Link to={`/profile/${username}`}>
        <img
          className="rounded-full h-8 w-8"
          src={profile_image}
          alt="profile_image"
        />
      </Link>
      <div className="flex flex-col ml-[0.3rem] mr-6">
        <Link
          className="text-[#5CB85C] font-medium hover:text-[#3d8b3d] hover:underline"
          to={`/profile/${username}`}
        >
          {username}
        </Link>
        <span className="text-xs text-[#bbb]">{created_at}</span>
      </div>
    </div>
  );
}
