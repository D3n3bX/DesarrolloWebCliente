import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';

function EditCommercePage({ apiRoute, routeDir }) {
    const router = useRouter();

    const [commerceInfo, setCommerceInfo] = useState({
      NombreComercio: '',
      Direccion: '',
      Ciudad: '',
      Email: '',
      Telefono: '',
      Actividad:'',
      Titulo:'',
      Resumen:'',
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const commerceId = queryParams.get('id');
    
        console.log('commerceId: ' + commerceId);
    
    });

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
            <label className='block text-primary-700 text-sm mb-2' htmlFor='Ciudad'>
              Ciudad:
              <input
                type='text'
                id='Ciudad'
                name='Ciudad'
                value={commerceInfo.Ciudad}
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
                id='Telefono'
                name='Telefono'
                value={commerceInfo.Telefono}
                onChange={handleInputChange}
                className='mt-1 p-2 border rounded w-full bg-text'
              />
            </label>
          </div>
          <div className='mb-4'>
            <label className='block text-primary-700 text-sm mb-2' htmlFor='Actividad'>
              Actividad:
              <input
                type='text'
                id='Actividad'
                name='Actividad'
                value={commerceInfo.Actividad}
                onChange={handleInputChange}
                className='mt-1 p-2 border rounded w-full bg-text'
              />
            </label>
          </div>
          <button
            type='submit'
            onClick={handleRegister}
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

export default EditCommercePage;
