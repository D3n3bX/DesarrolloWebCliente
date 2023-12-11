'use client'
import React, { useState, useEffect } from 'react';
import Login from '../../components/Login';

/*
  FUNCION
    AdminPage()
    Un administrador puede iniciar sesión para poder gestionar los comercios
    Parámetros:
      - Ninguno
    Return:
      - Formulario para iniciar sesión
*/
function AdminPage() {
  
  const [adminInfo, setAdminInfo] = useState({ loggedIn: false, adminId: null }); // Creo un estado adminInfo para indicar si se ha hecho login y el adminId
  const [routeDir, setRouteDir] = useState(''); // Creo un estado routeDir para indiacar a la ruta a la que se tiene que redirigir con su parámtero

  useEffect(() => {
    if (adminInfo.loggedIn && adminInfo.adminId) {
      const routeDir = `/admin/adminLogged?adminId=${adminInfo.adminId}`;
      setRouteDir(routeDir);
      console.log("routeDir: " + routeDir);
    }
  }, [adminInfo.loggedIn, adminInfo.adminId]);

  /*
    FUNCION (asíncrona)
      handleLogin(id)
      Maneja el intento de inicio de sesión al enviar una solicitud a la API de inicio de sesión
    Parámetros:
      - id: id del administrador que inicia sesión
    Return:
      - Realiza una solicitud a la API, maneja la respuesta y redirige al usuario si el inicio de sesión es exitoso
  */
  async function handleLogin(id) {
    console.log("id received in handleLogin: " + id);
    setAdminInfo({ loggedIn: true, adminId: id });
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-secondary p-8 shadow-md rounded-md'>
        <Login
          onLogin={handleLogin}
          apiRoute='api/admin/'
          routeDir={routeDir} // Paso la url y como parámetro adminId
        />
      </div>
    </div>
  );
}

export default AdminPage;
