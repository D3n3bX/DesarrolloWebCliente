export default function Home() {
  return (
    <div className="bg-quaternary min-h-screen flex flex-col justify-between">

      <section id="banner" className="bg-secondary text-white text-center p-16"> {/* Aumenté el valor de py-12 a py-16 */}
          <h1 className="text-4xl font-bold mb-4 text-text">Bienvenido a CityHub</h1>
          <p className="text-lg">Encuentra y promociona comercios locales</p>
      </section>

      <section id="comercios-destacados" className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4"> Comercios destacadas de la semana</h2>
        {/* Agrega aquí el contenido de comercios destacados */}
      </section>

      <section id="registro-login" className="text-center py-8">
        <div>
            <h2 className="text-2xl font-bold mb-4">Regístrate o Inicia Sesión</h2>
            {/* Agrega aquí tus botones de registro e inicio de sesión */}
        </div>
      </section>

      <section id="busqueda-comercios" className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Buscar Comercios</h2>
          {/* Agrega aquí tu formulario de búsqueda */}
      </section>
    </div>
  );
}
