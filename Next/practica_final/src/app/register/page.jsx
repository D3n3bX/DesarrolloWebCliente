"use client"
import Register from "@/components/register";
function RegisterPage() {
    
    function handleLogin() {
        setLoggedIn(true);
    }

    return(
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-secondary p-8 shadow-md rounded-md'>
                <Register
                onLogin={handleLogin}
                apiRoute='api/unregisteredUser/'
                routeDir='admin/adminLogged'
                />
            </div>
        </div>
    )
    
}

export default RegisterPage;