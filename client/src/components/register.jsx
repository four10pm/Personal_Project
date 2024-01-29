import React, { useEffect, useState, useContext } from 'react'
import { urlContext, userContext, tokenContext } from './context';
import '../styles/account.css'

function Register({ token, setToken }) {
    const APIurl = useContext(urlContext)
    const [message, setMessage] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const register = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${APIurl}/users/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    username: username,
                    password: password
                })
            });
            const result = await response.json();
            setMessage("Registration successful! Please log in")
            return result
        } catch (error) {
            setMessage(error.message);
        }
    }


    return (
        <>
            <form className="registrationform" method="post" onSubmit={(event) => { register(event) }}>
                <p className="message please"> <em> Please sign up: </em></p>
                <label> Email: &nbsp;
                    <input name="email" id="emailfield" onChange={(event) => { setUsername(event.target.value) }} />
                </label>
                <label> Password: &nbsp;
                    <input name="password" id="passwordfield" type="password" onChange={(event) => { setPassword(event.target.value) }} />
                </label>
                <label> Name: &nbsp;
                    <input name="name" id="namefield" onChange={(event) => { setName(event.target.value) }} />
                </label>
                <button id="registerButton" className="loginButton"> Register </button>
            </form>
            <div>
                {message && (message !== 'Login successful!' && message !== 'Registration succesful!') && <p> {message} </p>}
                {message === 'Registration successful' && <p id="regmessage">Registration successful!</p>}
            </div>
        </>)
}

export default Register; 