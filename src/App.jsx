import { Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth"
import Header from "./sharedComponents/Header";


function App() {
  const data = useAuth();
  console.log(data);

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
