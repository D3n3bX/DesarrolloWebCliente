import React from 'react';

const Modal = ({ message, onClose }) => (
  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
    <div className='bg-quaternary p-6 rounded-md'>
      <p className='text-primary'>{message}</p>
      <button onClick={onClose} className='mt-4 bg-tertiary text-white p-2 rounded hover:bg-secondary transition duration-300'>
        Cerrar
      </button>
    </div>
  </div>
);

export default Modal;
