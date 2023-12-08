'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';

function DeleteCommerce({ apiRoute, routeDir }) {
    const router = useRouter();
    const [commerceInfo, setCommerceInfo] = useState({ NombreComercio: '' });
    const [isLoading, setLoading] = useState(false);
    const [isErrorModalVisible, setErrorModalVisible] = useState(false);

    // Define handleInputChange to update commerceInfo when the input changes
    function handleInputChange(e) {
        const { name, value } = e.target;
        setCommerceInfo((prevCommerceInfo) => ({
            ...prevCommerceInfo,
            [name]: value,
        }));
    }

    async function handleDelete(e) {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await fetch(apiRoute, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commerceInfo),
            });

            setLoading(false);

            if (response.ok) {
                console.log('Comercio eliminado');
                router.push(routeDir);
            } else {
                console.error('Error eliminando el comercio');
                setErrorModalVisible(true);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center p-6 bg-tertiary'>
        <div className='max-w-full mx-0 p-6 bg-quaternary shadow-md rounded-md'>
                <h2 className='text-2xl font-semibold mb-4'>Eliminar Comercio</h2>
                <form onSubmit={handleDelete}>
                    <label>
                        Nombre del Comercio:
                        <input
                            type="text"
                            name="NombreComercio"
                            value={commerceInfo.NombreComercio}
                            onChange={handleInputChange} 
                        />
                    </label>

                    <button
                        type='submit'
                        disabled={isLoading}
                        className='bg-tertiary text-white p-2 rounded hover:bg-secondary transition duration-300'
                    >
                        {isLoading ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DeleteCommerce;
