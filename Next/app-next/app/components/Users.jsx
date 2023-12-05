const url = 'https://reqres.in/api/users'
async function getUsers() {
    const result = await fetch(url);
    const js = await result.json();
    console.log(js);
    return js.data;
}

async function Users() {
    const users = await getUsers();
    return (
        <div>
            <h1> Users </h1>

            <ul className="grid grid-cols-3">
                {users.map((user) => (

                <li className="bg-slate-400 m-2 rounded-lg" key={user.id}>
                    <p> Name: {user.first_name} </p>
                   
                    <p> Email: {user.email} </p>
             
                </li>
                ))}
            </ul>
        </div>  
    );
}

export default Users