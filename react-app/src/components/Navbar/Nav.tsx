import image from "../../assets/CitySurfLogo.png"
import "./Nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass } from '@fortawesome/free-solid-svg-icons'
import { faCity } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import Cookies from "js-cookie";
import { useState } from "react";

function Nav({openModal, setModalOpen, loggedIn, setLoggedIn}: any){

    // Check if logged in
    setLoggedIn(!!Cookies.get('token'));

    // Prompt use to login
    const handleLogin = ()=> {
        setModalOpen(true);
    }

    const handleLogout = () =>{
        Cookies.remove('token');
        setLoggedIn(!!Cookies.get('token'));
    }
    
    return(
        <nav className="navbar bg-dark">
            <Link className="navbar-brand" to="/">
                <img src={image} height="30" className="d-inline-block align-top" alt="" />
                <span className="brand-text">CitySurf</span>
            </Link>
            <div className="nav-items">

                {loggedIn &&
                <Link to="/savedcities"  className='btn btn-dark btn-outline-custom your-cities'>
                        <FontAwesomeIcon className="discover-icon" icon={faCity} color="#E2B714"/>
                    <span>Your Cities</span>
                </Link>
                }

                <Link to="/discover"  className='btn btn-dark btn-outline-custom'>
                        <FontAwesomeIcon className="discover-icon" icon={faCompass} color="#E2B714"/>
                    <span>Discover</span>
                </Link>
                {loggedIn? <Link to="/" className='btn btn-dark btn-outline-custom' onClick={handleLogout}>Logout</Link> : 
                <a className='btn btn-dark btn-outline-custom' onClick={handleLogin}>Login</a>}
            </div>
        </nav>
    )
}

export default Nav;