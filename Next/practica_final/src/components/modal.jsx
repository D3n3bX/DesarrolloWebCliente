import React from 'react';

const Modal = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-md">
      <p className="text-red-500">{message}</p>
      <button onClick={onClose} className="mt-4 bg-tertiary text-white p-2 rounded">
        Cerrar
      </button>
    </div>
  </div>
);

export default Modal;
