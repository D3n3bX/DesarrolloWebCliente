import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Modal from './Modal';

function RegisterCommerce({ apiRoute }) {
  const router = useRouter();

  const [commerceInfo, setCommerceInfo] = useState({
    NombreComercio: '',
    CIF: '',
    Direccion: '',
    Email: '',
    TelefonoContacto: '',
  });

  const [isLoading, setLoading] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setCommerceInfo((prevCommerceInfo) => ({
      ...prevCommerceInfo,
      [name]: value,
    }));
  }

  async function handleRegister(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(apiRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commerceInfo),
      });

      setLoading(false);

      if (response.ok) {
        console.log('Registro de comercio exitoso');
      } else {
        console.error('Error en el registro del comercio');
        setErrorModalVisible(true);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center p-6 bg-tertiary'>
      <div className='max-w-full mx-0 p-6 bg-quaternary shadow-md rounded-md'>
        <h2 className='text-2xl font-semibold mb-4'>Registrar Comercio</h2>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='NombreComercio'>
            Nombre del comercio:
            <input
              type='text'
              id='NombreComercio'
              name='NombreComercio'
              value={commerceInfo.NombreComercio}
              onChange={handleInputChange}
              className='mt-1 p-2 border rounded w-full bg-text'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='CIF'>
            CIF:
            <input
              type='text'
              id='CIF'
              name='CIF'
              value={commerceInfo.CIF}
              onChange={handleInputChange}
              className='mt-1 p-2 border rounded w-full bg-text'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='Direccion'>
            Dirección:
            <input
              type='text'
              id='Direccion'
              name='Direccion'
              value={commerceInfo.Direccion}
              onChange={handleInputChange}
              className='mt-1 p-2 border rounded w-full bg-text'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='Email'>
            E-mail:
            <input
              type='email'
              id='Email'
              name='Email'
              value={commerceInfo.Email}
              onChange={handleInputChange}
              className='mt-1 p-2 border rounded w-full bg-text'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='TelefonoContacto'>
            Teléfono de contacto:
            <input
              type='text'
              id='TelefonoContacto'
              name='TelefonoContacto'
              value={commerceInfo.TelefonoContacto}
              onChange={handleInputChange}
              className='mt-1 p-2 border rounded w-full bg-text'
            />
          </label>
        </div>
        <div className='flex justify-between'>
          <Link href='../loginUser' className='align-start text-xs font-thin text-primary hover:underline'>
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </div>
        <button
          type='submit'
          onClick={handleRegister}
          disabled={isLoading}
          className='bg-tertiary text-white p-2 rounded hover:bg-secondary transition duration-300'
        >
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </button>

        {isErrorModalVisible && (
          <Modal message={'Error en el registro. Inténtalo de nuevo'} onClose={() => setErrorModalVisible(false)} />
        )}
      </div>
    </div>
  );
}

export default RegisterCommerce;
