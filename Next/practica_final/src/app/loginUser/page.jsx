'use client'
import React, { useState, useEffect } from 'react';
import Login from '../../components/Login';

function LoginPage() {

  const [userInfo, setUserInfo] = useState({ loggedIn: false, userId: null }); // Creo un estado adminInfo para indicar si se ha hecho login y el adminId
  const [routeDir, setRouteDir] = useState(''); // Creo un estado routeDir para indiacar a la ruta a la que se tiene que redirigir con su parámtero


  useEffect(() => {
    if (userInfo.loggedIn && userInfo.userId) {
      const routeDir = `/registeredUser?userId=${userInfo.userId}`;
      setRouteDir(routeDir);
      console.log("routeDir: " + routeDir);
    }
  }, [userInfo.loggedIn, userInfo.userId]);

  function handleLogin(id) {
    console.log("id received in handleLogin: " + id);
    setUserInfo({ loggedIn: true, userId: id });
  }
  
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-secondary p-8 shadow-md rounded-md'>
        <Login
          onLogin={handleLogin}
          apiRoute='/api/registeredUser/'
          routeDir={routeDir} // Paso la url y como parámetro adminId
        />
      </div>
    </div>
  );
}

export default LoginPage;
