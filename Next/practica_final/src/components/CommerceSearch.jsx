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
  const handleCommerceClick = (id) => {
    // Redirige a la página del comercio seleccionado
    router.push(`${routeDir}/${id}`);
  };

  // JSX del componente SearchCommerce
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar por nombre, ciudad o actividad"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {searchResults.length > 0 && (
        <div>
          <h2>Resultados de la búsqueda:</h2>
          <ul>
            {searchResults.map((commerce) => (
              <li key={commerce.id} onClick={() => handleCommerceClick(commerce.id)}>
                {`${commerce.NombreComercio} - ${commerce.Ciudad} - ${commerce.Actividad}`}
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
  );
}

export default SearchCommerce;
