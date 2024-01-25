import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { nameContext } from './context'
import '../styles/navigation.css'

function Navigation ({token}) {
    const [selectedDate, setSelectedDate] = useState(null)
    const myName = useContext(nameContext)

    return (
        <div className="navbar"> 
            <Link to="/" className="navItem"> Date Ideas </Link>
            <Link to="/cities" className="navItem"> City Dates </Link> 
            <Link to="/account" className="navItem"> Account </Link>
            <Link to="/contribute" className="navItem"> Contribute </Link> 
            {<p className="welcome navItem"> Hello, {myName}! </p>}
            {!token && <p className="welcome navItem"> Please log in! </p>}
            {token && <p className="welcome NavItem"> You're logged in! </p>}
        </div> 
    )
}

export default Navigation; 