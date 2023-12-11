'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function AdminLoggedPage() {
    const [username, setUsername] = useState(''); // Creo un estado username para indicar el username del administrador qiue inició sesión
    const router = useRouter();
    
    useEffect(() => {
        
        const queryParams = new URLSearchParams(window.location.search); 
        const adminId = queryParams.get('adminId'); // Obtengo el valor de adminId de la URL

        // Verificar que adminId esté definido antes de realizar la solicitud
        if (adminId) {
          console.log('adminId desde adminLoggedPage: ' + adminId);
      
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
              console.log('username: ' + username);
            })
            .catch((error) => {
              console.error('Error al obtener los datos del usuario:', error);
            });
        }
      }, [router.query]);
      
  
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center p-6 bg-tertiary'>
      <div className='max-w-full mx-0 p-6 bg-quaternary shadow-md rounded-md'>
            <h1>Bienvenido, {username}!</h1>
            <div className="additional-content">
              {/* Agrega contenido adicional aquí */}
              <p>¿Qué deseas hacer?</p>
              <ul>
                <Link href="/admin/adminLogged/registerCommerce">Registrar un comercio</Link>
                <Link href="/admin/adminLogged/deleteCommerce">Eliminar un comercio</Link>
              </ul>
            </div>
        </div>
    </div>
    );
}

export default AdminLoggedPage;
