'use client'
import Login from '../../components/Login';

function AdminPage() {

  function handleLogin() {
    setLoggedIn(true);
  }
  
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-white p-8 shadow-md rounded-md'>
        <Login
          onLogin={handleLogin}
          apiRoute='api/admin/'
          routeDir='admin/adminLogged'
        />
      </div>
    </div>
  );
}

export default AdminPage;
