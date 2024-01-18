import React, { useEffect } from 'react'
import { useState } from 'react'
import { urlContext } from './context';

function Login () {
    const login = async (username, password) => {
        try {
            const response = await fetch(`${urlContext}/users`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const result = await response.json();
            console.log(result);
            return result
        } catch (err) {
            console.error(err);
        }
    }
    

    return
}

export default Login; 