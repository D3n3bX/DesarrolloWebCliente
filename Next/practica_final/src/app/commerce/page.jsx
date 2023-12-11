'use client'
import React, { useState, useEffect } from 'react';
import Login from '../../components/Login';

function CommercePage() {

  const [commerceInfo, setCommerceInfo] = useState({ loggedIn: false, commerceId: null }); // Creo un estado adminInfo para indicar si se ha hecho login y el commerceId
  const [routeDir, setRouteDir] = useState(''); // Creo un estado routeDir para indiacar a la ruta a la que se tiene que redirigir con su parámtero

  useEffect(() => {
    if (commerceInfo.loggedIn && commerceInfo.commerceId) {
      const routeDir = `/commerce/commerceLogged?commerceId=${commerceInfo.commerceId}`;
      setRouteDir(routeDir);
      console.log("routeDir: " + routeDir);
    }
  }, [commerceInfo.loggedIn, commerceInfo.commerceId]);

  function handleLogin(id) {
    console.log("id received in handleLogin: " + id);
    setCommerceInfo({ loggedIn: true, commerceId: id });
  }
  
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-secondary p-8 shadow-md rounded-md'>
        <Login
          onLogin={handleLogin}
          apiRoute='/api/commerce/login'
          routeDir={routeDir} // Paso la url y como parámetro adminId
        />
      </div>
    </div>
  );
}

export default CommercePage;
