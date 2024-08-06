import image from "../../assets/CitySurfLogo.png"
import "./Nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass } from '@fortawesome/free-solid-svg-icons'

function Nav(){
    return(
        <nav className="navbar bg-dark">
            <a className="navbar-brand" href="#">
                <img src={image} height="30" className="d-inline-block align-top" alt="" />
                <span className="brand-text">CitySurf</span>
            </a>
            <div className="nav-items">
                
                <a className='btn btn-dark btn-outline-custom'>
                        <FontAwesomeIcon className="discover-icon" icon={faCompass} color="#E2B714"/>

                    <span>Discover</span>
                </a>
                <a className='btn btn-dark btn-outline-custom'>Login</a>
            </div>
        </nav>
    )
}

export default Nav;