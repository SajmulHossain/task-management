import useAuth from "../hooks/useAuth";


const Header = () => {
  const { user } = useAuth();
  return (
    <header className="bg-main text-white py-2">
      <section className="section flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Task</h3>

        {
          user && <div className="flex items-center gap-2">
            <div><img src={user?.photoURL} className="h-12 w-12 rounded-full" referrerPolicy="no-referrer" alt={`${user?.displayName}'s photo`} /></div>
            <div>
              <button className="btn bg-red-600">
                Log Out
              </button>
            </div>
          </div>
        }
      </section>
    </header>
  );
};

export default Header;