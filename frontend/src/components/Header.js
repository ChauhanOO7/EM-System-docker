import React from 'react';
import {Link} from "react-router-dom";

export default function Header({onLogout,user}) {

    return (
      <nav className='decnav'>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/employlist">Employlist</Link></li>
        </ul>
        <div>
          <p style={{color:"white"}}>{user}</p>
          <button onClick={onLogout}>LOGOUT</button>
        </div>

      </nav>
    );
  }