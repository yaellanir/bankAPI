
import './App.css';
import React from 'react'
import NavBar from './Components/NavBar/NavBar';
import Form from './Components/form/Form';
import useFetch from "./Hooks/useFetch"


function App() {
  
const [data] = useFetch('https://bank-api-bkw3.onrender.com/api/users')
console.log(data);

  return (
    <div className="App">
      <NavBar/>
      <Form/>
    </div>
  );
}

export default App;
