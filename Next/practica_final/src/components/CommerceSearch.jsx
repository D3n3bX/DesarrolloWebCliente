'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Define el componente SearchCommerce
function SearchCommerce({ apiRoute, routeDir }) {
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para almacenar los resultados de la búsqueda
  const [searchResults, setSearchResults] = useState([]);

  // Instancia del router de Next.js
  const router = useRouter();

  // Función para manejar la búsqueda
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      // Realiza la búsqueda en la API con un método POST
      const response = await fetch('api/commerce/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }), // Envía el término de búsqueda en el cuerpo de la solicitud
      });

      const data = await response.json();
      console.log('data:', data);

      // Actualiza los resultados de la búsqueda
      setSearchResults(data.foundCommerce ? [data.foundCommerce] : []);

    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  // Función para manejar el clic en un comercio
  // const handleCommerceClick = (id) => {
  //   // Redirige a la página del comercio seleccionado
  //   router.push(`${routeDir}/${id}`);
  // };

  // JSX del componente SearchCommerce
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center p-6 bg-tertiary'>
      <div className='max-w-sm mx-auto p-6 bg-quaternary shadow-md rounded-md'>
      <h2 className='text-2xl font-semibold mb-4'>Buscador</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar por nombre, ciudad o actividad"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          type="submit" 
          className='bg-tertiary text-white p-2 rounded hover:bg-secondary transition duration-300'>
            Buscar
        </button>
      </form>

      {searchResults.length > 0 && (
        <div>
          <h2>Resultados de la búsqueda:</h2>
          <ul>
            {searchResults.map((commerce) => (
              <li>
                <div>
                  <h3>{commerce.NombreComercio}</h3>
                  <p>Ciudad: {commerce.Ciudad}</p>
                  <p>Actividad: {commerce.Actividad}</p>
                  <p>Resumen: {commerce.Resumen}</p>
                  <p>CIF: {commerce.CIF}</p>
                  <p>Dirección: {commerce.Direccion}</p>
                  <p>Email: {commerce.Email}</p>
                  <p>Teléfono: {commerce.Telefono}</p>
                  <p>Scoring: {commerce.Scoring}</p>
                  <p>Número de Puntuaciones: {commerce.NumeroPuntuacion}</p>
                  <p>Reseñas:</p>
                  <ul>
                    {commerce.Reseñas.map((reseña, index) => (
                      <li key={index}>{reseña}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchResults.length === 0 && (
        <div>
          <h2>Sin resultados</h2>
        </div>
      )}
    </div>
  </div>
  );
}

// Exporta el componente SearchCommerce por defecto
export default SearchCommerce;

