'use client'
import React, { useState } from 'react';
import SearchCommerce from '@/components/CommerceSearch';

export default function Home() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [routeDir, setRouteDir] = useState(''); // Creo un estado routeDir para indiacar a la ruta a la que se tiene que redirigir con su parámtero

  function handleLogin() {
    setLoggedIn(true);
  }

  return (
    <div className="bg-quaternary min-h-screen flex flex-col justify-between">
      <section id="banner" className="bg-secondary text-white text-center p-16">
        <h1 className="text-4xl font-bold mb-4 text-text">Bienvenido a CityHub</h1>
        <p className="text-lg">Encuentra y promociona comercios locales</p>
      </section>

      <section id="busqueda-comercios" className="text-center py-8">
        <SearchCommerce />
        {/* Asegúrate de pasar las rutas correctas como props apiRoute y routeDir */}
      </section>

      <section id="comercios-destacados" className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4"> Comercios destacadas de la semana</h2>
        {/* Agrega aquí el contenido de comercios destacados */}
      </section>
    </div>
  );
}
