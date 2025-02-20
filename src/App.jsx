import useAuth from "./hooks/useAuth"


function App() {
  const data = useAuth();
  console.log(data);

  return (
    <>
      <p className="font-bold text-xl"></p>
    </>
  )
}

export default App
