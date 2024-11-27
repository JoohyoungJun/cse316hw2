/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";    //Used Link rather than href thing
import { useNavigate, } from "react-router-dom";
import "../App.css";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();
    const [userImage, setUserImage] = useState("/assignImage/user.png");

    useEffect(() => {
        const serverImage = localStorage.getItem("userImage");  //get userImage from server
        if(serverImage) setUserImage(serverImage);  //update userImage if exists
    }, []);

    const clickSignOut = async () => {
        try {
            //get refreshToken from localStorage
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {    //no tokne found, error
                console.error("No refresh token found in localStorage");
                return;
            }
            
            //request server to sign-out
            await axios.post("http://localhost:3001/sign-out", { token: refreshToken });
    
            //remove tokens from localStorage
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
    
            console.log("Sign-out success");
            navigate("/sign-in"); //re-direct to sign-in page after signing out
        } catch (err) { //failure to sign out
            console.error("Sign-out error:", err.response?.data || err.message);
        }
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                            <Link to="sign-in" className="nav-link">Sign In</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={clickSignOut}>Sign Out</button>
                        </li>
                        <li className="nav-item">
                            <Link to="/user-info" className="nav-link user-icon" id="userIcon">
                                <img src={userImage} alt="user.png" id="userIcon" />

                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;