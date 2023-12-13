'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function CommerceLoggedPage() {
    const [username, setUsername] = useState('');
    const[id, setId] = useState('');
    const router = useRouter();
    
    useEffect(() => {
        
        const queryParams = new URLSearchParams(window.location.search); 
        const commerceId = queryParams.get('commerceId'); // Obtengo el valor de commerceId de la URL
        console.log(commerceId)

        if (commerceId) { // Verifico que commerId esté definido antes de realizar la solicitud
          console.log('commerceId desde commerceLoggedPage: ' + commerceId);
      
          fetch(`/api/commerce/${commerceId}`)  // Realizo una solicitud GET al servidor para obtener la información del usuario comercio
            .then((response) => {
              if (!response.ok) {
                throw new Error('Error al obtener los datos del comercio');
              }
              return response.json();
            })
            .then((data) => {
              setUsername(data.username);
              setId(data.id);
              console.log('username: ' + username);
              console.log('id: ' + id);
            })
            .catch((error) => {
              console.error('Error al obtener los datos del comercio:', error);
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
                <Link href= {`/commerce/commerceLogged/infoCommerce?id=${id}`}>Mostrar informacion</Link>
                <Link href= {`/commerce/commerceLogged/editCommerce?id=${id}`}>Editar informacion</Link>
                <Link href={`/commerce/commerceLogged/deleteCommerce?id=${id}`}>Eliminar comercio</Link>
              </ul>
            </div>
        </div>
    </div>
    );
}

export default CommerceLoggedPage;
