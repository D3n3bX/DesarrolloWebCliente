'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Review from '@/components/Review';

function ReviewPage() {
    
    const [loggedIn, setLoggedIn] = useState(false);
    
    function handleLogin() {
        setLoggedIn(true);
    }
    
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-secondary p-8 shadow-md rounded-md'>
                <Review
                onLogin={handleLogin}
                apiRoute='/api/commerce/review'
                routeDir='/registeredUser'
                />
            </div>
        </div>
    );
    
}

export default ReviewPage