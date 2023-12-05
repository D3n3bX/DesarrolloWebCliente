"use client";
import { useState } from 'react';
import Link from 'next/link';

function NavBar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className='bg-secondary p-6'>
      {/* Menú visible en pantallas grandes */}
      <ul className='flex-wrap justify-center gap-6 hidden lg:flex'>
          <NavItem href='/'>Home</NavItem>
          <NavItem href='/admin'>Administradores</NavItem>
          <NavItem href='/registeredUser'>Usuarios registrados</NavItem>
          <NavItem href='/anonymousUser'>Usuarios no registrados</NavItem>
          <NavItem href='/commerce'>Comercio</NavItem>
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

// Componente para un ítem de la barra de navegación
const NavItem = ({ href, children }) => (
  <li className='mb-2 md:mb-0'>
    <Link className='text-text hover:text-primary transition duration-300' href={href} passHref>
        {children}
    </Link>
  </li>
);

// Componente para el sidebar en pantallas pequeñas
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
        <NavItem href='/anonymousUser'>Usuarios no registrados</NavItem>
        <NavItem href='/commerce'>Comercio</NavItem>
    </ul>
  </div>
);

export default NavBar;
