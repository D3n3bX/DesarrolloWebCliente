'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';

function editInfoPage() {

    const router = useRouter();

    const [userInfo, setUserInfo] = useState({
        Ciudad: '',
        Intereses: '',
    });

    const [isLoading, setLoading] = useState(false);
    const [isErrorModalVisible, setErrorModalVisible] = useState(false);

    async function handleModify(e) {
        e.preventDefault();
        const queryParams = new URLSearchParams(window.location.search);
        const userId = queryParams.get('userId');
      
        console.log('userId dentro de handleModify: ' + userId);
       
        setLoading(true);
    
        try {
          const response = await fetch(`/api/registeredUser/modify/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
          });
    
          setLoading(false);
    
          if (response.ok) {
            console.log('Registro de comercio exitoso');
            router.push(routeDir);
          } else {
            console.error('Error en el registro del comercio');
            setErrorModalVisible(true);
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      }

      function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          [name]: value,
        }));
      }

      return (
        <div className='h-screen w-screen flex flex-col justify-center items-center p-6 bg-tertiary'>
          <div className='max-w-full mx-0 p-6 bg-quaternary shadow-md rounded-md'>
            <h2 className='text-2xl font-semibold mb-4'>Modificar Información del Comercio</h2>
            <div className='mb-4'>
              <label className='block text-primary-700 text-sm mb-2' htmlFor='NombreComercio'>
              Ciudad:
                <input
                  type='text'
                  id='Ciudad'
                  name='Ciudad'
                  value={userInfo.Ciudad}
                  onChange={handleInputChange}
                  className='mt-1 p-2 border rounded w-full bg-text'
                />
              </label>
            </div>
            <div className='mb-4'>
              <label className='block text-primary-700 text-sm mb-2' htmlFor='Direccion'>
              Intereses:
                <input
                  type='text'
                  id='Intereses'
                  name='Intereses'
                  value={userInfo.Intereses}
                  onChange={handleInputChange}
                  className='mt-1 p-2 border rounded w-full bg-text'
                />
              </label>
            </div>
            <button
                type='submit'
                onClick={handleModify}
                disabled={isLoading}
                className='bg-tertiary text-white p-2 rounded hover:bg-secondary transition duration-300'
            >
                {isLoading ? 'Modificando...' : 'Modificar'}
            </button>
    
            {isErrorModalVisible && (
                <Modal message={'Error en la modificación. Inténtalo de nuevo'} onClose={() => setErrorModalVisible(false)} />
            )}
            </div>
        </div>
      );
}

export default editInfoPage;