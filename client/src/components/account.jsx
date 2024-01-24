import React, { useEffect, useContext, useState } from 'react'
import { urlContext, nameContext } from './context';
import Login from './login';
import Register from './register';
import { getCityById } from '../fetching';

function Account ({token, setToken}) {
    const [user, setUser] = useState({})
    const myName=useContext(nameContext)
    const [myCity, setMyCity] = useState({})

    return (
       
        <div>
            
            
                <div> 
                    <Login setToken={setToken} token={token} user={user} setUser={setUser} setMyCity={setMyCity} myCity={myCity} />
                    <Register setToken={setToken} token={token} user={user} setUser={setUser}/>
                </div>
            {token && 
            <div> 
                { console.log(user)}
                {console.log(myCity)}
                <p> Welcome {myName}! </p>
                <p> Your city is {user.city} </p>
                
            </div>}
        </div>
       
    ) 
}
 
export default Account; 