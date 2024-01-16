import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { NameContext } from './context'
import '../styles/navigation.css'

function Navigation () {
    const [selectedDate, setSelectedDate] = useState(null)
    const [token, setToken] = useState(null)
    const myName = useContext(NameContext)

    return (
        <div className="navbar"> 
            <Link to="/homepage.jsx" className="navItem"> Date Ideas </Link>
            <Link to="/account.jsx" className="navItem"> Account </Link>
            {<p className="welcome navItem"> Hello, {myName}! </p>}
            {!token && <p className="welcome navItem"> Please log in! </p>}
        </div> 
    )
}

export default Navigation; 