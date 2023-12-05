"use client"
import Users from "../components/Users"

function pulsar() {
    console.log("Pulsado");
}

function UserPage() {
    
    return(
        <div>
            <Users></Users>
            <button onClick={pulsar}>pulsar</button>
        </div>
        
    )
}
export default UserPage