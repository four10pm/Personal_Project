import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { userContext, tokenContext } from './context'
import '../styles/navigation.css'

function Navigation() {

    const userInfo = useContext(userContext)
    const myName = userInfo.name
    const myToken = useContext(tokenContext)

    return (
        <div className="navbar">
            <Link to="/" className="navItem navLink" > Date Ideas </Link>
            <Link to="/cities" className="navItem navLink"> City Dates </Link>
            <Link to="/account" className="navItem navLink"> Account </Link>
            <Link to="/contribute" className="navItem navLink"> Contribute </Link>
            {<p className="welcome navItem"> Hello, {userInfo.name}! </p>}
            {!myToken && <p className="welcome navItem"> Please log in! </p>}
            {myToken && <p className="welcome NavItem"> You're logged in! </p>}
        </div>
    )
}

export default Navigation; 