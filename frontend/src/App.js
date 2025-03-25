import './App.css';
import Header from './components/Header';
import Create from './components/create';
import Dashboard from './components/dashboard';
import Update from './components/update';
import Employlist from './components/employlist';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [logged,setLogged]=useState(false);
  useEffect(() => {
    const isLoggedIn = Cookies.get('Username');
    setLogged(isLoggedIn);
  }, []);

  const handleLogout = () => {
    Cookies.remove('Username');
    setLogged(false);
  };
  async function handlelogin(email,password)
  {
      const data={
          "email":email,
          "password":password
      };

      try
      {
        const response=await axios.post(`${process.env.REACT_APP_backendurl}/admins`,data);
        
        if(response.data)
        {
          Cookies.set("Username",response.data.name);
          setLogged(true);
        }
        else
        {
          setLogged(false);
          alert('Invalid login details. Please try again...');
        } 
      }
      catch(error)
      {
        console.error(error);
        setLogged(false);
        alert('An error occurred. Please try again...');
      }
 
      
  } 
  return (
    <>
    <Router>
    {logged ? <>
      
      <Routes>

          <Route exact path="/"  element={<><Header  user={Cookies.get("Username")} onLogout={handleLogout} />
          <Dashboard/>
          </>}/>
          <Route exact path="/employlist" element={<><Header  user={Cookies.get("Username")} onLogout={handleLogout} />
          <Employlist/>
          </>}/>
          <Route exact path="/create" element={<><Header  user={Cookies.get("Username")} onLogout={handleLogout} />
          <Create/>
          </>}/>
          <Route exact path="/update" element={<><Header  user={Cookies.get("Username")} onLogout={handleLogout} />
          <Update/>
          </>}/>

      </Routes>

    
    </>
    : <Login onLogin={handlelogin}/>
    }
    </Router>


    </>
  );
}

export default App;


function Login({onLogin}) {

  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const [error,setError]=useState(false);
  
  async function handlelogin(e)
  {
      e.preventDefault();
      if(email.length===0 || password.length===0)
      {
          setError(true);
          return;
      }
      setPassword("");
      setEmail("");

      onLogin(email,password);
  }   

  function handlechange(e)
  {
      if(e.target.name==="email")  setEmail(e.target.value);
      else    setPassword(e.target.value);

  }
  return (
      <div className="loginpage">
          <h1>Login</h1>
          <form method="post" onSubmit={handlelogin}>
          <label htmlFor="_email">Email : </label>
          <input type="text" id="_email" name="email" value={email} onChange={(e)=>{handlechange(e)}}/>
          {error && email!==null && email.length<=0?<label id="warning">Email should not be empty!</label>:""}
          <label htmlFor="_pass">Password : </label>
          <input type="text" id="_pass" name="password" value={password} onChange={(e)=>{handlechange(e)}}/>
          {error && password!==null && password.length<=0?<label id="warning">Password should not be empty!</label>:""}
          <button>Login</button>
          </form>

      </div>
  );
}
