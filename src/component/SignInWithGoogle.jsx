import toast from 'react-hot-toast';
import googleLogo from '../assets/images/googleLogo.png'
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignInWithGoogle = () => {
  const { signInWithGoogle, setLoading } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
    .then(({user}) => {
        if(user) {
          toast.success("Sign in Successfull!");
          navigate("/");
          const data = {
            email: user?.email,
            name: user?.displayName,
            userId: user?.uid,
          }
          console.log(user);
          try {
            axios.post(`http://localhost:3000/user/${user?.email}`, data);
            console.log(user?.email);
          } catch (err) {
            console.log(err);
          }
        } else {
          toast.error("Something Went Wrong!");
        }
    })
    .catch(({code}) => {
      toast.error(code);
      setLoading(false);
    })

  }
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="btn flex gap-2 justify-center items-center font-semibold  w-full bg-main/20 hover:bg-main rounded"
      >
        <img src={googleLogo} className="w-8" alt="googleIcon" />
        Log in with google
      </button>
    </div>
  );
};

export default SignInWithGoogle;