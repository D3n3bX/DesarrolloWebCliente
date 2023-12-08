'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';

function SearchCommerce({ apiRoute, routeDir }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  async function handleSearch(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`${apiRoute}?NombreComercio=${searchQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);

      if (response.ok) {
        console.log('Comercio encontrado');
        // Handle the response or redirect as needed
      } else {
        console.error('Error buscando el comercio');
        setErrorModalVisible(true);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center p-6 bg-tertiary'>
      <div className='max-w-full mx-0 p-6 bg-quaternary shadow-md rounded-md'>
        <h2 className='text-2xl font-semibold mb-4'>Buscar Comercio por Nombre</h2>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='searchQuery'>
            Nombre del Comercio:
            <input
              type='text'
              id='searchQuery'
              name='searchQuery'
              value={searchQuery}
              onChange={handleInputChange}
              className='mt-1 p-2 border rounded w-full bg-text'
            />
          </label>
        </div>
        <button
          type='submit'
          onClick={handleSearch}
          disabled={isLoading}
          className='bg-tertiary text-white p-2 rounded hover:bg-secondary transition duration-300'
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
        {isErrorModalVisible && (
          <Modal message={'Error en la búsqueda. Inténtalo de nuevo'} onClose={() => setErrorModalVisible(false)} />
        )}
      </div>
    </div>
  );
}

export default SearchCommerce;
