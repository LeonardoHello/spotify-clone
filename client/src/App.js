import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useState, useEffect } from "react";


const App = () => {
  const [code, setCode] = useState('');

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get('code'))
  })

  useEffect(() => {
    console.log(code);
  }, [code])

  return (
    code !== null ? <Dashboard code={code}/> : <Login/>
  );
}
 
export default App;
