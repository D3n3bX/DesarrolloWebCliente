import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Modal from './Modal';

/*
  FUNCION
    Register({apiRoute, routeDir})
    Los user (normales) se pueden registrar
    Parámetros:
      - apiRoute: ruta de la API que se encarga del login
      - routeDir: direccion a donde redirigira despues de loguears
    Return:
      - Formulario para registrarse
*/
function Register({ apiRoute, routeDir }) {

  const router = useRouter(); // Creo un router que me permitirá redirigir al usuario a una página específica

  // Creo un estado credenctials para almacenar lso datos necesarios para crearse una cuenta 
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    Nombre: '',
    Edad: 0,
    Ciudad: '',
    Intereses: '',
    PermiteRecibirOfertas: false
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

  /*
  FUNCION (asíncrona)
    handleRegister(e)
    Maneja el intento de registro al enviar una solicitud a la API de registrarse
  Parámetros:
    - e: evento de click en el botón de inicio de sesión
  Return:
    - Realiza una solicitud a la API, maneja la respuesta y redirige al usuario si el inicio de sesión es exitoso
*/
  async function handleRegister(e) {
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
        console.log('Registro exitoso');
        router.push(routeDir);
      } else {
        console.error('Error en el registro');
        setErrorModalVisible(true);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error); // Manejo errores de red u otros errores durante la solicitud
    }
  }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center p-6 bg-tertiary'>
      <div className='max-w-full mx-0 p-6 bg-quaternary shadow-md rounded-md'>
        <h2 className='text-2xl font-semibold mb-4'>Registrarse</h2>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='username'>
            Nombre de usuario:
            <input
              type='text'
              id='username'
              name='username'
              value={credentials.username}
              onChange={handleInputChange}
              className='mt-1 p-2 border rounded w-full bg-text'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='email'>
            Correo electrónico:
            <input
              type='email'
              id='email'
              name='email'
              value={credentials.email}
              onChange={handleInputChange}
              className='mt-1 p-2 border rounded w-full bg-text'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='password'>
            Contraseña:
            <input
              type='password'
              id='password'
              name='password'
              value={credentials.password}
              onChange={handleInputChange}
              className='mt-1 p-2 border rounded w-full bg-text'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='Nombre'>
            Nombre:
            <input
              type='text'
              id='Nombre'
              name='Nombre'
              value={credentials.Nombre}
              onChange={handleInputChange}
              className='mt-1 p-2 border rounded w-full bg-text'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='Edad'>
            Edad:
            <input
              type='number'
              id='Edad'
              name='Edad'
              value={credentials.Edad}
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
              value={credentials.Ciudad}
              onChange={handleInputChange}
              className='mt-1 p-2 border rounded w-full bg-text'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='Intereses'>
            Intereses:
            <input
              type='text'
              id='Intereses'
              name='Intereses'
              value={credentials.Intereses}
              onChange={handleInputChange}
              className='mt-1 p-2 border rounded w-full bg-text'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='PermiteRecibirOfertas'>
            Permitir recibir ofertas:
            <input
              type='checkbox'
              id='PermiteRecibirOfertas'
              name='PermiteRecibirOfertas'
              checked={credentials.PermiteRecibirOfertas}
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

export default Register;