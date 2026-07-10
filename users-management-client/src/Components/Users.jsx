import  { use, useState } from 'react';

const Users = ({usersPromise}) => {
    const initialUsers = use(usersPromise);
    const [users,setUsers]=useState(initialUsers)
  
    const handleAddUser=(e)=>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;

        const newUser ={name,email};

        // data sending to the server

       fetch('http://localhost:5000/users',{
        method:'POST',
        headers:{ 
            'content-type':'application/json'
        },
        body:JSON.stringify(newUser)
       })
       .then(res=>res.json())
       .then(data=>{
        console.log("data after post",data);
        const newUsers =[...users,data];
        setUsers(newUsers);
        e.target.reset()

       })

    }
    
    return (
        <div>
            <h1>users ( {users.length} ) </h1>
            <div> <h2>Add a user </h2>
            <form onSubmit={handleAddUser} className='flex flex-col gap-3'>
                <input name='name' className='input' type="text" />
                <input name='email' className='input' type="email" />
                <button className='btn w-38'>Add user </button>
                <p></p>
            </form>
            </div>
            <div>
                {
                    users.map(user => <p key={user.id}>{user.name} Email: {user.email}</p>)
                }
            </div>
      
        </div>
    );
};

export default Users;