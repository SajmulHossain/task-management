import { Link, useLocation } from "react-router-dom";
import loginImg from '../assets/images/login.jpg'
import SignInWithGoogle from "../component/SignInWithGoogle";
import useAuth from "../hooks/useAuth";
import Loading from "../component/Loading";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const { state } = useLocation();
  const [error, setError] = useState('');
   const { loading, login, setLoading } = useAuth();
   if (loading) {
     return <Loading />;
   }

   const handleLogin = e => {
    e.preventDefault();
    setError('');

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    if(!email || !password) {
      return setError('Please give valid email and valid password');
    }

    login(email, password)
    .then((res) => {
      if(res) {
        toast.success("Login Successfull!");
      } else {
        toast.error("Something Went Wrong");
      }
    })
    .catch(({code, message}) => {
      toast.error(code);
      console.log(code, message);
      setLoading(false);
    })
   }

  return (
    <section className="section flex min-h-screen justify-center items-center flex-col gap-10">
      {state?.isRedirected ? (
        <h3 className="font-semibold text-2xl">Welcome Back to Task Manager</h3>
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
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4 border p-4 rounded border-second">
              <h3 className="font-bold text-center text-2xl border-b border-main pb-2">
                Log in
              </h3>
              {error && (
                <p className="text-center text-lg text-red-600">{error}</p>
              )}
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
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
                <button className="btn">Login</button>
              </div>
              <SignInWithGoogle />
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