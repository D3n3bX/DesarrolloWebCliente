"use client"
import React, { useState } from 'react';
import DeleteCommerce from '@/components/DeleteCommerce';

function RegisterCommercePage() {
    const [deleteIn, setDeleteIn] = useState(false);

    function handleDelete() {
        setDeleteIn(true);
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-secondary p-8 shadow-md rounded-md'>
                <DeleteCommerce
                    onDelete={handleDelete}
                    apiRoute='/api/commerce/'
                    routeDir='/admin/adminLogged'
                />
            </div>
        </div>
    );
}

export default RegisterCommercePage;
