'use client'
import React, { useState } from 'react';
import Login from '../../components/Login';

function AdminPage() {
  
    const [loggedIn, setLoggedIn] = useState(false);
    const [adminId, setAdminId] = useState(null);

    function handleLogin(id) {
      console.log("id received in handleLogin: " + id);
      setLoggedIn(true);
      setAdminId(id);
    }

    console.log("adminId: " + adminId);

    const routeDir = `/admin/adminLogged?adminId=${adminId}`;
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
