import Link from 'next/link';

function Footer() {
    return (
        <footer className="flex flex-col items-center bg-primary text-center text-text">
            <div className="container px-6 pt-6">
                {/* Social media icons container */}
                <div className="mb-6 flex justify-center">
                {/* ... (código de los iconos sociales) */}
                </div>
        
                {/* Newsletter sign-up form */}
                <div>
                    <form action="">
                        <div className="gird-cols-1 grid items-center justify-center gap-4 md:grid-cols-3">
                        {/* ... (código del formulario de suscripción) */}
                        </div>
                    </form>
                </div>
        
                {/* Copyright information */}
                <div className="mb-6">
                    <p>
                        Si quieres promocionar tu comercio no dudes en enviar un correo a: contacta@CityHub.com 
                    </p>
                </div>
        
                {/* Links section */}
                <div className="grid md:grid-cols-2 lg:grid-cols-5">
                    {/* ... (código de las secciones de enlaces) */}
                    <Link href='/'>Home</Link>
                    <Link href='/admin'>Administradores</Link>
                    <Link href='/registeredUser'>Usuarios registrados</Link>
                    <Link href='/anonymousUser'>Usuarios no registrados</Link>
                    <Link href='/commerce'>Comercio</Link>
                </div>
            </div>
        
            {/* Copyright section */}
            <div className="w-full p-4 text-center">
                © 2023 Copyright:
                <a className="text-text"> CityHub</a>
            </div>
        </footer>
      );
}

export default Footer;