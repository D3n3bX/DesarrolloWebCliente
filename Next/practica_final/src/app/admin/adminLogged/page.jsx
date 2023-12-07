'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterCommerce from '@/components/RegsiterCommerce';

function AdminLoggedPage() {
    const [username, setUsername] = useState('');
    const router = useRouter();
    
    useEffect(() => {
      // Obtener el valor de adminId de la URL
      const { adminId } = router.query ?? {};
      console.log('adminId desde adminLoggedPage: ' + adminId);
      
      // Verificar que adminId esté definido antes de realizar la solicitud
      if (adminId) {
          console.log('adminId desde if: ' + adminId)
          // Realizar una solicitud GET al servidor para obtener la información del usuario administrador
          fetch(`/api/admin/${adminId}`)
              .then((response) => {
                  if (!response.ok) {
                      throw new Error('Error al obtener los datos del usuario');
                  }
                  return response.json();
              })
              .then((data) => {
                  setUsername(data.username);
              })
              .catch((error) => {
                  console.error('Error al obtener los datos del usuario:', error);
              });
      }
  }, [router.query?.adminId]);
  
  function handleLogin() {
    setLoggedIn(true);
  }

  return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-secondary p-8 shadow-md rounded-md'>
          <h1>Bienvenido, {username}!</h1>
          <div className="additional-content">
            {/* Agrega contenido adicional aquí */}
            <p>¿Qué deseas hacer?</p>
            <div className='min-h-screen flex items-center justify-center'>
              <div className='bg-secondary p-8 shadow-md rounded-md'>
                  <RegisterCommerce
                  onLogin={handleLogin}
                  apiRoute='api/commerce/'
                  />
              </div>
          </div>
          </div>
        </div>
      </div>
    );
}

export default AdminLoggedPage;
