import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await login(email, password);

    if (success) {
      console.log('로그인 성공');
      navigate('/'); // Redirect on successful login
    } else {
      console.log('로그인 실패: 사용자 정보가 일치하지 않습니다.');
    }
    // try {
    //   // back 통신
    //   // const response = await fetch(`${APIURL}/users`, {
    //   //   method: 'POST',
    //   //   headers: {
    //   //     'Content-Type': 'application/json',
    //   //   },
    //   //   body: JSON.stringify({
    //   //     email,
    //   //     password,
    //   //   }),
    //   // });
    //   const response = await fetch(`${APIURL}users`);
    //   // back 통신
    //   const result = await response.json();
    //   const user = result.find(
    //     (user: { email: string; password: string; }) => user.email === email && user.password === password,
    //   );

    //   if (user) {
    //     console.log('로그인 성공:', user);
    //     // 로그인 성공 처리 (예: 상태 업데이트, 페이지 이동 등)
    //   } else {
    //     console.log('로그인 실패: 사용자 정보가 일치하지 않습니다.');
    //     // 로그인 실패 처리 (예: 에러 메시지 표시 등)
    //   }
    // } catch (error) {
    //   console.error('로그인 에러:', error);
    //   // 에러 처리 (예: 에러 메시지 표시 등)
    // }

    // back 통신
    //   if (response.ok) {
    //     console.log(result);
    //     navigate('/');
    //   } else {
    //   }
    // } catch (error) {
    //   // 네트워크 에러 또는 기타 에러 처리
    //   console.error('로그인 에러:', error);
    // }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

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
      <h1 className="text-4xl mb-3">Sign in</h1>
      <p className="text-[#5cb85c] mb-4 hover:text-[#1E822A] hover:underline">
        <Link to="/register">Need an account?</Link>
      </p>
      <form className="w-full" onSubmit={onSubmit}>
        <div className="">
          <input
            className="px-6 py-3 text-xl w-full text-[#55595c] border rounded mb-4"
            type="text"
            name="email"
            id="email"
            onChange={onChange}
            placeholder="Email"
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
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 text-xl rounded text-white bg-[#5cb85c] select-none hover:bg-[#1E822A]"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
