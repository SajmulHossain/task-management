import useAuth from "./hooks/useAuth"
import Header from "./sharedComponents/Header";
import Loading from "./component/Loading";
import Todo from "./component/Todo";


function App() {
  const { loading } = useAuth();

  if(loading) {
    return <Loading />
  }

  return (
    <>
      <Header />
      <main>
        <Todo />
      </main>
    </>
  )
}

export default App
