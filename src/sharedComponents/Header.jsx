import { RiLogoutCircleRLine } from "react-icons/ri";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logout Successfull!");
        navigate("/login");
      })
      .catch(({ code }) => {
        toast.error(code);
      });
  };

  return (
    <header className="bg-main text-white py-2">
      <section className="section flex justify-between items-center">
        <Link to='/' className="text-lg font-semibold">Manage Task</Link>

        {user && (
          <div className="flex items-center gap-2">
            <div>
              {user?.photoURL ? (
                <img
                  src={user?.photoURL}
                  className="h-12 w-12 rounded-full"
                  referrerPolicy="no-referrer"
                  alt={`${user?.displayName}'s photo`}
                />
              ) : (
                <FaCircleUser size={36} />
              )}
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="btn bg-red-600 flex items-center gap-2 group"
              >
                <RiLogoutCircleRLine className="group-hover:translate-x-2 transition-all duration-300" />{" "}
                Log Out
              </button>
            </div>
          </div>
        )}
      </section>
    </header>
  );
};

export default Header;
