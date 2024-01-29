import React, { useState, useContext } from 'react'
import { urlContext, tokenContext } from './context';
import '../styles/account.css'

function Login({ token, setToken, user, setUser }) {
    const APIurl = useContext(urlContext)
    const [message, setMessage] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [myCity, setMyCity] = useState("")

    const login = async (event) => {
        event.preventDefault()
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
            setToken(result.token)
            setUser(result.user)
            return result
        } catch (error) {
            setMessage(error.message);
            console.log(error.message)
        }
    }

    return (
        <>
            <form className="loginForm" method="post" onSubmit={login}>
                <p className="message please"> <em> Please log in: </em></p>
                <label> Email: &nbsp;
                    <input name="email" id="LIemailfield" onChange={(event) => { setUsername(event.target.value) }} />
                </label>
                <label> Password: &nbsp;
                    <input name="password" id="LIpasswordfield" type="password" onChange={(event) => { setPassword(event.target.value) }} />
                </label>
                <button className="loginButton" id="loginButton"> Login </button>
            </form>
            <div>
                {message && (message !== 'Login successful!' && message !== 'Registration succesful!') && <p> {message} </p>}
                {message === 'Login successful' && <p id="loginsuccess">Login successful!</p> && getCityById(myCity)}
            </div>

        </>)
}

export default Login; 