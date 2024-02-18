import { useLocation } from 'react-router-dom';
import UserInfo from '../UserInfo';

export default function ArticleBanner() {
  const { state } = useLocation();

  return (
      <div className="bg-[#333333] w-full shadow-lg py-8 mb-8">
        <div className="page">
          <h1 className="text-[2.8rem] font-semibold text-white">
            {state?.title}
          </h1>
          <UserInfo
            created_at={state?.created_at}
            profile_image={state?.author?.profile_image}
            username={state?.author?.username}
          />
        </div>
      </div>
  );
}
