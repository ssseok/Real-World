import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterForm() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  console.log(emailError);

  const verifyEmail = async () => {
    if (!email.trim()) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/user/verify-email`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setEmailError(data.message || '이메일이 존재합니다.');
      } else {
        setEmailError(''); // 중복 없음
      }
    } catch (error) {
      console.error('이메일 중복 확인 에러:', error);
    }
  };

  const verifyUsername = async () => {
    if (!username.trim()) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/user/verify-username`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setUsernameError(data?.error?.message || '사용자이름이 존재합니다.');
      } else {
        setUsernameError(''); // 중복 없음
      }
    } catch (error) {
      console.error('사용자 이름 중복 확인 에러:', error);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError('');
    setUsernameError('');
    // 중복 검사
    await Promise.all([verifyEmail(), verifyUsername()]);

    // 중복 에러가 있으면 회원가입 진행 중지
    if (emailError || usernameError) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error?.message || '회원가입 실패');
        throw new Error('회원가입 실패');
      }
      await login(email, password);
      navigate('/');
    } catch (error: any) {
      console.error('회원가입 실패:', error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'username') {
      setUsername(value);
    }

    if (name === 'email') {
      setEmail(value);
    }

    if (name === 'password') {
      setPassword(value);
    }
  };
  return (
    <div className="page flex flex-col items-center justify-center mt-6 px-[15px]">
      <h1 className="text-4xl mb-3">Sign up</h1>
      <p className="text-[#5cb85c] mb-4 hover:text-[#1E822A] hover:underline">
        <Link to="/register">Have an account?</Link>
      </p>
      <form className="w-full" onSubmit={onSubmit}>
        <div>
          <input
            className="px-6 py-3 text-xl w-full text-[#55595c] border rounded mb-4"
            type="text"
            name="username"
            id="username"
            onChange={onChange}
            onBlur={verifyUsername}
            placeholder="Username"
            value={username}
          />
        </div>
        {usernameError && <div className="text-red-500">{usernameError}</div>}
        <div>
          <input
            className="px-6 py-3 text-xl w-full text-[#55595c] border rounded mb-4"
            type="text"
            name="email"
            id="email"
            onChange={onChange}
            onBlur={verifyEmail}
            placeholder="Email"
            value={email}
          />
        </div>
        {emailError && <div className="text-red-500">{emailError}</div>}
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
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
