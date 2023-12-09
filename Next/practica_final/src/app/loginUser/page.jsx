'use client'
import React, { useState } from 'react';

import Login from '../../components/Login';

function LoginPage() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setuserId] = useState(null);

  function handleLogin(id) {
    console.log("id received in handleLogin: " + id);
    setLoggedIn(true);
    setuserId(id);
  }
  
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-secondary p-8 shadow-md rounded-md'>
        <Login
          onLogin={handleLogin}
          apiRoute='/api/registeredUser/'
          routeDir='/registeredUser'
        />
      </div>
    </div>
  );
}

export default LoginPage;
