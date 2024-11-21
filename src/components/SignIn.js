/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React from "react";
import { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    const submission = () => {

    };

    const insertEmail = () => {

    };

    const insertPw = () => {

    };

    return (
        <div style={ {display: 'flex', flexDirection: 'column',  alignItems: 'center'} }>
            <h1><strong>Sign in</strong></h1>
            <p></p><p></p>
            <form onSubmit={submission}>
                <div>
                    <label>Email: </label>
                    <input type="email" value={email} onChange={insertEmail} required />
                </div>
                <p></p>
                <div>
                    <label>Password: </label>
                    <input type="password" value={pw} onChange={insertPw} required />
                </div>
                <div style ={{marginTop: "10px"}}>
                    <button type="submit" className="btn btn-outline-primary">Sign In</button>
                    <Link to="/sign-up">
                    <button type="button" className="btn btn-outline-primary" 
                        style={ {marginLeft: "20px"} }>Sign Up</button>
                    </Link>
                </div>
            </form>
            
        </div>
    );
}

export default SignIn;