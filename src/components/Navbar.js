/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React from "react";
import { Link } from "react-router-dom";    //Used Link rather than href thing
import "../App.css";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <i className="bi bi-house"></i>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/facility-list" className="nav-link">Facility List</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/reservation" className="nav-link">Reservation</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle" id="dropdown" data-bs-toggle="dropdown">
                                User
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdown">
                                <li><Link to="/user-info" className="dropdown-item">User Info</Link></li>
                                <li><Link to="/reservation-history" className="dropdown-item">Reservation History</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="/user-info" className="nav-link user-icon">
                                <img src="/assignImage/user.png" alt="user.png" style={{ width: '40px', height: '40px' }} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;