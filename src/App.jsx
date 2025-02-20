import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth"
import Header from "./sharedComponents/Header";


function App() {
  const {user} = useAuth();

  if(!user) {
    return <Navigate to='/login' state={{isRedirected: true}} />
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
