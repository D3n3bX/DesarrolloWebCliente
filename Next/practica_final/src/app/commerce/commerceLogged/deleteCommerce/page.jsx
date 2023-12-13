'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
function DeleteCommercePage() {
  const router = useRouter();

    const [borrar, setDelete] = useState('');

    const handleDelete = async () => {
        try {
            const queryParams = new URLSearchParams(window.location.search);
            const commerceId = queryParams.get('id');
            setDelete(true);
        
            const response = await fetch(`/api/commerce/deleteCommerce/${commerceId}`, {
                method: 'DELETE',
            });
        
            if (!response.ok) {
                throw new Error('Error deleting commerce data');
            }
        
            setDelete(false);
        
            // Puedes redirigir a la página de inicio u otra página después de la eliminación.
            router.push('/');
            } catch (error) {
            console.error('Error al eliminar el comercio:', error);
            setDelete(false);
        }
    };
    
    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center p-6 bg-tertiary'>
            <div className='max-w-full mx-0 p-6 bg-quaternary shadow-md rounded-md'>
                <button onClick={handleDelete} disabled={borrar}>
                {borrar ? 'Eliminando...' : 'Borrar comercio'}
                </button>
            </div>
        </div>
    );
}

export default DeleteCommercePage;
