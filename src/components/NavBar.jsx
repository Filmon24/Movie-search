import { Link } from "react-router-dom";
import "../css/Navbar.css";
function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="brand-link">
                    <img 
                        src="/MovieLogo.jpeg" 
                        alt="Movie Logo" 
                        className="movie-logo"
                    />
                    <span className="brand-text">Movie App</span>
                </Link>   
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/new" className="nav-link">New Movies</Link>
                <Link to="/favorites" className="nav-link">favorites</Link>
            </div>
        </nav>
    )
}

export default NavBar