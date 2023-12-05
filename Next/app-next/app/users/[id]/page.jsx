const url = 'https://reqres.in/api/users/'

async function getId( params ) {
    const response = await fetch(url + params);
    const js = await response.json();
    //console.log(js);
    return js.data;
}

async function UserIdPage( {params} ) {
    const user = await getId(params.id);
    console.log(user)
    return (
        <div className="grid-flow-row, grid-flow-col">
            <h1> ID de usuario </h1>
            {/* Imprimimos los datos de usuario */}
            <p> ID: {user.id} </p>
            <p> First name: {user.first_name} </p>
            <p> Last name: {user.last_name} </p>
            <p> Email: {user.email} </p>
            <img src={user.avatar} alt="Avatar" />
        </div>
    ); 
        
}
export default UserIdPage