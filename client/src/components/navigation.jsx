import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { nameContext } from './context'
import '../styles/navigation.css'

function Navigation () {
    const [selectedDate, setSelectedDate] = useState(null)
    const [token, setToken] = useState(null)
    const myName = useContext(nameContext)

    return (
        <div className="navbar"> 
            <Link to="/" className="navItem"> Date Ideas </Link>
            <Link to="/account" className="navItem"> Account </Link>
            <Link to="/contribute" className="navItem"> Contribute </Link> 
            {<p className="welcome navItem"> Hello, {myName}! </p>}
            {!token && <p className="welcome navItem"> Please log in! </p>}
        </div> 
    )
}

export default Navigation; 