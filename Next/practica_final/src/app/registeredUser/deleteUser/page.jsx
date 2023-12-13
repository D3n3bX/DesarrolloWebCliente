'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
function DeleteCommercePage() {
  const router = useRouter();

    const [borrar, setDelete] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();

        const queryParams = new URLSearchParams(window.location.search);
        const userId = queryParams.get('userId');

        console.log('userId:' + userId);
        setDelete(true);

        try {
            const response = await fetch(`/api/registeredUser/deleteUser/${userId}`, {
                method: 'DELETE',
            });
        
            if (!response.ok) {
                throw new Error('Error deleting user data');
            }
        
            setDelete(false);
        
            // Puedes redirigir a la página de inicio u otra página después de la eliminación.
            router.push('/');
            } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            setDelete(false);
        }
    };
    
    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center p-6 bg-tertiary'>
            <div className='max-w-full mx-0 p-6 bg-quaternary shadow-md rounded-md'>
                <button onClick={handleDelete} disabled={borrar}>
                {borrar ? 'Eliminando...' : 'Borrar usuario'}
                </button>
            </div>
        </div>
    );
}

export default DeleteCommercePage;
