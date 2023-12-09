'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';

/*
  FUNCION
    Review({ scoring, reviews, onReviewSubmit })
    Permite a los usuarios hacer una revisión de un comercio
  Parámetros:
    - scoring: Número de puntuaciones
    - reviews: Array de reseñas
    - onReviewSubmit: Función para manejar la presentación de una nueva revisión
  Return:
    - Formulario para hacer una revisión
*/
function Review({ apiRoute, routeDir }) {
    
    const router = useRouter(); // Creo un router que me permitirá redirigir al usuario a una página específica

    // Creo un estado credenctials para almacenar lso datos necesarios para crearse una cuenta 
    const [credentials, setCredentials] = useState({
        NombreComercio: '',
        Scoring: '',
        Reseña: ''
    });

    const [isLoading, setLoading] = useState(false); // Creo un estado isLoading para indicar si se esta registrando o se ha finalizado dicho proceso
    const [isErrorModalVisible, setErrorModalVisible] = useState(false); // Creo un estado isErrorModalVisible para indicar si el modal debe aparece o no

    /*
    FUNCION
      handleInputChange(e)
      Maneja el cambio en los campos de entrada del formulario de inicio de sesión
    Parámetros:
      - e: evento de cambio
    Return:
      - Actualiza el estado de las credenciales con los nuevos valores
    */
    function handleInputChange(e) {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
        }));
    }

    async function handleSubmitReview(e) {
        e.preventDefault();

        setLoading(true); // Setteo el estado de carga mientras se procesa la solicitud de registro

        try {
        // Realizo una solicitud POST a la API de resgistrarse con los credenciales
        const response = await fetch(apiRoute, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials), // Paso los credenciales que se han introducido
        });

        setLoading(false); // Finalizo el estado de carga después de la solicitud

        if (response.ok) {
            console.log('Registro de la review exitoso');
            router.push(routeDir);
        } else {
            console.error('Error en el registro de la review');
            setErrorModalVisible(true);
        }
        } catch (error) {
        console.error('Error en la solicitud:', error); // Manejo errores de red u otros errores durante la solicitud
        }
    }

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center p-6 bg-tertiary'>
            <div className='max-w-full mx-0 p-6 bg-quaternary shadow-md rounded-md'>
                <h2 className='text-2xl font-semibold mb-4'>Deja tu reseña</h2>
                <div className='mb-4'>
                    <label className='block text-primary-700 text-sm mb-2' htmlFor='NombreComercio'>
                    Nombre de comercio:
                    <input
                    type='text'
                    id='NombreComercio'
                    name='NombreComercio'
                    value={credentials.NombreComercio}
                    onChange={handleInputChange}
                    className='mt-1 p-2 border rounded w-full bg-text'
                    />
                    </label>
                    <label className='block text-primary-700 text-sm mb-2' htmlFor='Score'>
                    Puntuación:
                    <select
                        id='score'
                        name='score'
                        value={credentials.Scoring}
                        onChange={handleInputChange}
                        className='mt-1 p-2 border rounded w-full bg-text'
                    >
                        <option value={0}>Selecciona una puntuación</option>
                        <option value={1}>1 - Muy malo</option>
                        <option value={2}>2 - Malo</option>
                        <option value={3}>3 - Regular</option>
                        <option value={4}>4 - Bueno</option>
                        <option value={5}>5 - Excelente</option>
                    </select>
                    </label>
                </div>
                <div className='mb-4'>
                    <label className='block text-primary-700 text-sm mb-2' htmlFor='reviewText'>
                    Reseña:
                    <textarea
                        id='Reseña'
                        name='Reseña'
                        value={credentials.Reseña}
                        onChange={handleInputChange}
                        className='mt-1 p-2 border rounded w-full bg-text'
                    />
                    </label>
                </div>
                <button
                    type='submit'
                    onClick={handleSubmitReview}
                    disabled={isLoading}
                    className='bg-tertiary text-white p-2 rounded hover:bg-secondary transition duration-300'
                >
                    {isLoading ? 'Enviando...' : 'Enviar revisión'}
                </button>
                {isErrorModalVisible && (
                    <Modal message={'Error al enviar la revisión. Inténtalo de nuevo'} onClose={() => setErrorModalVisible(false)} />
                )}

            </div>
        </div>
    );
}

export default Review;
