/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React from "react";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [userName, setUserName] = useState("");

    const insertEmail = (e) => {
        setEmail(e.target.value);
    };

    const insertPw = (e) => {
        setPw(e.target.value);
    };

    const insertUserName = (e) => {
        setUserName(e.target.value);
    };

    const submission = async () => {
        try {
            await axios.post("http://localhost:3001/sign-up", 
                { email: email, userName: userName, pw: pw, });
            window.alert("User Registed Successfully!");
        } catch (error) {
            console.error("sign-up error: ", error);
        }
        
    };
    
    return (
        <div style={ {display: 'flex', flexDirection: 'column',  alignItems: 'center'} }>
            <p></p><h1><strong>Sign Up</strong></h1>
            <p></p>
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
                <p></p>
                <div>
                    <label>User Name: </label>
                    <input type="text" value={userName} onChange={insertUserName} required />
                </div>
                <button type="submit" className="btn btn-outline-primary"
                        style ={{marginTop: "10px"}}>Sign Up</button>
            </form>
            
        </div>
    );
}

export default SignUp;