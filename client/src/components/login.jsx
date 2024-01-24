import React, { useEffect, useState, useContext } from 'react'
import { urlContext, nameContext } from './context';

function Login({ token, setToken, user, setUser}) {
    const APIurl = useContext(urlContext)
    const [message, setMessage] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [myName, setMyName] = useState("")
    const [myCity, setMyCity] = useState("")

    const login = async (event) => {
        event.preventDefault()
        console.log(username, password)
        try {
            const response = await fetch(`${APIurl}/users/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            const result = await response.json();
            console.log("result", result);
            setToken(result.token)
            setUser(result.user)
            setMyName(result.user.name)
            setMyCity(result.user.city)
            return result
        } catch (error) {
            setMessage(error.message);
        }
    }


        const getCityById = async(cityId) => {
            console.log(user.city)
            try {
                const response = await fetch(`${APIurl}/cities/${cityId}`)
                const data = await response.json();
                console.log(data)
            } catch (error) {
                console.log(error.message)
            }
            getCityById();
        }

    return (
        <>
            < nameContext.Provider value={myName} >
                <form className="loginForm" method="post" onSubmit={login}>
                    <p className="message please"> <em> Please log in: </em></p>
                    <label> Email:
                        <input name="email" id="LIemailfield" onChange={(event) => { setUsername(event.target.value) }} />
                    </label>
                    <label> Password:
                        <input name="password" id="LIpasswordfield" type="password" onChange={(event) => { setPassword(event.target.value) }} />
                    </label>
                    <button name="loginButton" id="loginButton"> Login </button>
                </form>
                <div>
                    {message && (message !== 'Login successful!' && message !== 'Registration succesful!') && <p> {message} </p>}
                    {message === 'Login successful' && <p id="loginsuccess">Login successful!</p> && getCityById(myCity)}
                </div>
            </nameContext.Provider>
        </>)
}

export default Login; 