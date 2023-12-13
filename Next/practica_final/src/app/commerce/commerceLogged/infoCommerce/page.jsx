'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function InfoCommercePage() {
  const [commerceInfo, setCommerceInfo] = useState({});
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const commerceId = queryParams.get('id');

    console.log('commerceId: ' + commerceId);

    if (commerceId) {
      fetch(`/api/commerce/info/${commerceId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error fetching commerce data');
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            console.log('data: ' + data)
            setCommerceInfo(data); 
            console.log('commerceInfo: ' + commerceInfo.data);
          } else {
            console.error('Commerce not found:', data.message);
          }
        })
        .catch((error) => {
          console.error('Error fetching commerce data:', error);
        });
    }
  }, [router.query]);

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center p-6 bg-tertiary'>
      <div className='max-w-sm mx-auto p-6 bg-quaternary shadow-md rounded-md'>
      <h2 className='text-2xl font-semibold mb-4'>Información del Comercio</h2>
      <p>Nombre del comercio: {commerceInfo?.NombreComercio}</p>
      <p>CIF: {commerceInfo?.CIF}</p>
      <p>Direccion: {commerceInfo?.Direccion}</p>
      <p>Ciudad: {commerceInfo?.Ciudad}</p>
      <p>Email: {commerceInfo?.Email}</p>
      <p>Telefono: {commerceInfo?.Telefono}</p>
      <p>Resumen: {commerceInfo?.Resumen}</p>
      <p>Actividad: {commerceInfo?.Actividad}</p>
      <p>Scoring: {commerceInfo?.Scoring}</p>
      <p>Número de votos: {commerceInfo?.NumeroPuntuacion}</p>

      <h2>Reseñas:</h2>
      <ul>
        {commerceInfo?.Reseñas && commerceInfo.Reseñas.map((review, index) => (
          <li key={index}>{review}</li>
        ))}
      </ul>
      {/* Add more elements as needed to display other information */}
    </div>
  </div>
  );
}

export default InfoCommercePage;