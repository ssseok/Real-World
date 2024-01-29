import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APIURL } from '../../utils/util';

export default function RegisterPage() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      const result = await response.json();
      console.log(result);
      navigate('/');
    } catch (error: any) {
      console.error('회원가입 에러:', error);
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

    console.log(name, value);
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
            placeholder="Username"
            value={username}
          />
        </div>
        <div>
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
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
