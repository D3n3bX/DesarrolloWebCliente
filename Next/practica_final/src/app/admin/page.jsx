'use client'
import React, { useState } from 'react';
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
  
    const [loggedIn, setLoggedIn] = useState(false); // Creo un estado loggedIn para indicar si se ha logeado o no
    const [adminId, setAdminId] = useState(null); // Creo un estado adminId para indicar el id del administrador que ha iniciado sesión
    /*
      FUNCION (asíncrona)
        handleLogin(id)
        Maneja el intento de inicio de sesión al enviar una solicitud a la API de inicio de sesión
      Parámetros:
        - id: id del administrador que inicia sesión
      Return:
        - Realiza una solicitud a la API, maneja la respuesta y redirige al usuario si el inicio de sesión es exitoso
    */
    function handleLogin(id) {
      console.log("id received in handleLogin: " + id);
      setLoggedIn(true);
      setAdminId(id);
    }

    console.log("adminId: " + adminId);

    const routeDir = `/admin/adminLogged?adminId=${adminId}`; // Obtengo la ruta para redirigirme a adminLoggedPage con el parámetro de adminId
    console.log("routeDir: " + routeDir);

    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-secondary p-8 shadow-md rounded-md'>
        {console.log("adminId before render: " + adminId)}
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
