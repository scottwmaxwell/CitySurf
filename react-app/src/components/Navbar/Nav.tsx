import image from "../../assets/CitySurfLogo.png"
import "./Nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';


function Nav({openModal, setModalOpen, session}: any){

    const handleLogin = ()=> {
        setModalOpen(true);
    }

    const handleSavedCities = ()=>{

    }
    
    return(
        <nav className="navbar bg-dark">
            <Link className="navbar-brand" to="/">
                <img src={image} height="30" className="d-inline-block align-top" alt="" />
                <span className="brand-text">CitySurf</span>
            </Link>
            <div className="nav-items">
                <Link to="/discover"  className='btn btn-dark btn-outline-custom'>
                        <FontAwesomeIcon className="discover-icon" icon={faCompass} color="#E2B714"/>
                    <span>Discover</span>
                </Link>
                {session? <Link to="/" className='btn btn-dark btn-outline-custom' onClick={handleSavedCities}>Saved Cities</Link> : 
                <a className='btn btn-dark btn-outline-custom' onClick={handleLogin}>Login</a>}
                
            </div>
        </nav>
    )
}

export default Nav;