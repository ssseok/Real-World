import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

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
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
