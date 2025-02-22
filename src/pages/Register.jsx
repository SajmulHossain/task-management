import { Link, useNavigate } from "react-router-dom";
import signUpImg from "../assets/images/signup.jpg";
import SignInWithGoogle from "../component/SignInWithGoogle";
import useAuth from "../hooks/useAuth";
import Loading from "../component/Loading";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const { loading, createNewUser, updateUser, setLoading } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !name || !password) {
      return setError("Please fill all inputs with valid information");
    }

    setLoading(true);

    try {
      createNewUser(email, password)
        .then(({user}) => {
          toast.success("Registration Successfull!");
          navigate("/");
          const data = {
            userId: user?.uid,
            email,
            name,
          };
          updateUser(name);
          axios.post(`https://task-management-server-beryl-pi.vercel.app/user/${email}`, data);
        })
        .catch(({ code }) => {
          toast.error(code);
        });
      } catch (err) {
        console.log(err);
      } finally {
      setLoading(false);
    }
  };
  return (
    <section className="section flex min-h-screen justify-center items-center flex-col gap-10">
      <h3 className="font-semibold text-2xl">
        Start Making Your Strategy by Signing Up
      </h3>
      <div className="max-w-[800px] flex w-full">
        <div className="hidden md:block w-full">
          <img className="w-full h-full object-cover" src={signUpImg} />
        </div>
        <div className="w-full">
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-4 border p-4 rounded border-second">
              <h3 className="font-bold text-center text-2xl border-b border-main pb-2">
                Sign Up
              </h3>

              {error && (
                <p className="text-center text-lg text-red-600">{error}</p>
              )}
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="border border-main rounded px-3 w-full py-2"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="border border-main rounded px-3 w-full py-2"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  required
                  name="password"
                  id="password"
                  className="border border-main rounded px-3 py-2"
                  placeholder="Password"
                />
              </div>

              <div>
                <button className="btn">Sign Up</button>
              </div>
              <SignInWithGoogle />
            </div>
          </form>
        </div>
      </div>

      <p>
        Already have an account?{" "}
        <Link to="/login" className="text-main">
          Login
        </Link>
      </p>
    </section>
  );
};

export default Register;
