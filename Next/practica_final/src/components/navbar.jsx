"use client"
import { useState } from 'react';
import Link from 'next/link';

function NavBar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className='bg-secondary p-3 fixed w-full z-50 flex items-center justify-between'>
      {/* Título a la izquierda */}
      <div className='text-text text-2xl'>
        CityHub
      </div>

      {/* Menú visible en pantallas grandes */}
      <ul className='gap-6 hidden lg:flex'>
        <NavItem href='/'>Home</NavItem>
        <NavItem href='/admin'>Administradores</NavItem>
        <NavItem href='/registeredUser'>Usuarios registrados</NavItem>
        <NavItem href='/commerce'>Comercio</NavItem>
      </ul>

      {/* Iniciar sesión y registrarse a la derecha */}
      <ul className='hidden lg:flex gap-6'>
        <NavItem href='/loginUser'>Iniciar sesión</NavItem>
        <NavItem href='/registerUser'>Registrarse</NavItem>
      </ul>

      {/* Sidebar para pantallas pequeñas */}
      <div className='lg:hidden'>
        <button onClick={toggleSidebar} className='text-white'>
          ☰
        </button>
        {isSidebarOpen && <MobileSidebar closeSidebar={toggleSidebar} />}
      </div>
    </nav>
  );
}

const NavItem = ({ href, children }) => (
  <li className='mb-2 md:mb-0'>
    <Link className='text-text hover:text-primary transition duration-300' href={href} passHref>
      {children}
    </Link>
  </li>
);

const MobileSidebar = ({ closeSidebar }) => (
  <div className='fixed inset-0 bg-secondary bg-opacity-75 z-50'>
    <div className='flex justify-end p-6'>
      <button onClick={closeSidebar} className='text-white'>
        ✖
      </button>
    </div>
    <ul className='flex flex-col items-center'>
      <NavItem href='/'>Home</NavItem>
      <NavItem href='/admin'>Administradores</NavItem>
      <NavItem href='/registeredUser'>Usuarios registrados</NavItem>
      <NavItem href='/commerce'>Comercio</NavItem>
      <NavItem href='/loginUser'>Iniciar sesión</NavItem>
      <NavItem href='/registerUser'>Registrarse</NavItem>
    </ul>
  </div>
);

export default NavBar;
