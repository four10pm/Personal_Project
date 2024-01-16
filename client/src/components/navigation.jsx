import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { NameContext } from './context'

function Navigation () {
    const [selectedDate, setSelectedDate] = useState(null)
    const [token, setToken] = useState(null)
    const myName = useContext(NameContext)

    return (
        <div className="navbar"> 
            <Link to="/homepage.jsx" className="navLink"> Date Ideas </Link>
            <Link to="/account.jsx" className="navLink"> Account </Link>
            {<h3 className="welcome navItem"> Hello, {myName} </h3>}
            {!token && <h3 className="welcome navItem"> Please log in! </h3>}
        </div> 
    )
}

export default Navigation; 