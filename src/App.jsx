import { useContext } from "react"
import AuthContext from "./provider/authProvider/AuthContext"


function App() {
  const data = useContext(AuthContext);
  console.log(data);

  return (
    <>
      <p className="font-bold text-xl"></p>
    </>
  )
}

export default App
