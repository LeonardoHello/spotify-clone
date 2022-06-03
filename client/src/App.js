import Login from "./components/Login";
import Dashboard from "./components/Dashboard";


const App = () => {
  const code = new URLSearchParams(window.location.search).get('code')

  return (
    code !== null ? <Dashboard code={code}/> : <Login/>
  );
}
 
export default App;
