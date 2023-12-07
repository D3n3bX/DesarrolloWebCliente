"use client"
import RegisterCommerce from "@/components/RegisterCommerce";
function RegisterCommercePage() {
    
    function handleLogin() {
        setLoggedIn(true);
    }

    return(
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-secondary p-8 shadow-md rounded-md'>
                <RegisterCommerce
                onLogin={handleLogin}
                apiRoute='/api/commerce/'
                routeDir='/admin/adminLogged'
                />
            </div>
        </div>
    )
    
}

export default RegisterCommercePage;