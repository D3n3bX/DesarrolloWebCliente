import Link from 'next/link';

function RegisteredUserPage() {
    
    return (
      <div className='h-screen w-screen flex flex-col justify-center items-center p-6 bg-tertiary'>
        <div className='max-w-full mx-0 p-6 bg-quaternary shadow-md rounded-md'>
              <h1>Bienvenido, usuario!</h1>
              <div className="additional-content">
                {/* Agrega contenido adicional aquí */}
                <p>¿Qué deseas hacer?</p>
                <ul>
                  <Link href="/registeredUser/review">Hacer una reseña</Link>
                </ul>
              </div>
          </div>
      </div>
    );
    
}

export default RegisteredUserPage