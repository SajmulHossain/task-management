import useAuth from "./hooks/useAuth"
import Header from "./sharedComponents/Header";
import Loading from "./component/Loading";
import { Outlet } from "react-router-dom";


function App() {
  const { loading } = useAuth();

  if(loading) {
    return <Loading />
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
