import { useEffect, useState } from 'react';
import useProfileFetch from '../../hooks/useProfileFetch';
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SettingsForm() {
const {logout} = useAuth()
  const { profile } = useProfileFetch();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState<string | undefined>('');
  const [bio, setBio] = useState<string | undefined>('');
  const [username, setUsername] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [password, setPassword] = useState<string | undefined>('');

  const onSubmit = () => {};
  const onChange = () => {};
  const handleLogout = () => {
    logout();
    navigate('/')
  };

  // 프로필 데이터가 로드되었을 때 입력 필드의 상태를 업데이트
  useEffect(() => {
    if (profile) {
      setProfileImage(profile.profile_image);
      setUsername(profile.username);
      setBio(profile.bio);
      // bio, email 등 다른 필드들도 필요하다면 이곳에서 설정
    }
  }, [profile]); // profile이 변경될 때마다 이 useEffect가 실행됩니다.

  return (
    <div className="page mt-6">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[2.5rem] font-medium text-[#373A3C] mb-2">
          Your Settings
        </h1>
        <form className="w-full" onSubmit={onSubmit}>
          <div>
            <input
              className="px-3 py-2 w-full text-[#55595c] border rounded mb-4"
              type="text"
              name="profileImage"
              id="profileImage"
              onChange={onChange}
              placeholder="URL of profile picture"
              value={profileImage}
            />
          </div>
          <div>
            <input
              className="px-6 py-3 w-full text-xl text-[#55595c] border rounded mb-4"
              type="text"
              name="username"
              id="username"
              onChange={onChange}
              placeholder="Your Name"
              value={username}
            />
          </div>
          <div>
            <textarea
              className="px-6 py-3 text-xl w-full text-[#55595c] border rounded mb-4"
              name="bio"
              id="bio"
              rows={8}
              onChange={onChange}
              placeholder="Short bio about you"
              value={bio}
            />
          </div>
          <div className="">
            <input
              className="px-6 py-3 text-xl w-full text-[#55595c] border rounded mb-4"
              type="text"
              name="email"
              id="email"
              onChange={onChange}
              placeholder="Email"
              value={email}
            />
          </div>
          <div>
            <input
              className="px-6 py-3 text-xl w-full text-[#55595c] border rounded mb-4"
              type="password"
              name="password"
              id="password"
              onChange={onChange}
              placeholder="Password"
              value={password}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 text-xl rounded text-white bg-[#5cb85c] select-none hover:bg-[#1E822A]"
            >
              Update Settings
            </button>
          </div>
        </form>
        <hr className="w-full my-4" />
        <div className="flex justify-start w-full ">
          <button onClick={handleLogout} className="text-[#B85C5C] border-[#B85C5C] border bg-transparent text-center py-2 px-4 rounded hover:bg-[#B85C5C] hover:text-white">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  );
}
