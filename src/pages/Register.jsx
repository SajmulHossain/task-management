import { Link } from 'react-router-dom';
import signUpImg from '../assets/images/signup.jpg'
import SignInWithGoogle from '../component/SignInWithGoogle';
import useAuth from '../hooks/useAuth';
import Loading from '../component/Loading';

const Register = () => {
  const {loading} = useAuth();
  if(loading) {
    return <Loading />
  }
  return (
    <section className="section flex min-h-screen justify-center items-center flex-col gap-10">
      <h3 className="font-semibold text-2xl">
        Start Making Your Strategy by Signing Up
      </h3>
      <div className="max-w-[800px] flex w-full">
        <div className="hidden md:block w-full">
          <img className="w-full h-full object-cover" src={signUpImg} />
        </div>
        <div className='w-full'>
          <form>
            <div className='flex flex-col gap-4 border p-4 rounded border-second'>
              <h3 className='font-bold text-center text-2xl border-b border-main pb-2'>Sign Up</h3>
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder='Name'
                  className="border border-main rounded px-3 w-full py-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder='Email'
                  className="border border-main rounded px-3 w-full py-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className="border border-main rounded px-3 py-2" placeholder='Password' />
              </div>

              <div>
                <button className='btn'>Sign Up</button>
              </div>
              <SignInWithGoogle />
            </div>
          </form>
        </div>
      </div>

      <p>Already have an account? <Link to='/login' className='text-main'>Login</Link></p>
    </section>
  );
};

export default Register;