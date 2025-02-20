import { Link, useLocation } from "react-router-dom";
import loginImg from '../assets/images/login.jpg'

const Login = () => {
  const { state } = useLocation();

  return (
    <section className="section flex min-h-screen justify-center items-center flex-col gap-10">
      {state?.isRedirected ? (
        <h3 className="font-semibold text-2xl">
          Welcome Back to Task Manager
        </h3>
      ) : (
        <h3 className="font-semibold text-2xl">
          Start Making Your Strategy by Loggin In
        </h3>
      )}

      <div className="max-w-[800px] flex w-full">
        <div className="hidden md:block w-full">
          <img className="w-full h-full object-cover" src={loginImg} />
        </div>
        <div className="w-full">
          <form>
            <div className="flex flex-col gap-4 border p-4 rounded border-second">
              <h3 className="font-bold text-center text-2xl border-b border-main pb-2">
                Log in
              </h3>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="border border-main rounded px-3 w-full py-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border border-main rounded px-3 py-2"
                  placeholder="Password"
                />
              </div>

              <div>
                <button className="btn">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <p>
         {`Don't have an account? `}
        <Link to="/register" className="text-main">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default Login;