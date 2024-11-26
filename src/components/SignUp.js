/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { hashutil } from '../util/hashutil.js';


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [userName, setUserName] = useState("");
    const [emailList, setEmailList] = useState([]);

    //get email lists from the server
    useEffect(() => {
        axios.get("http://localhost:3001/sign-up")
            .then(res => {
                //used map in order to extract only email value from the array
                const emails = res.data.map(element => element.email);
                setEmailList(emails); 
            })
            .catch(err => {
                console.error("Error fetching emailList: ", err);
            })
    }, []);

    const insertEmail = (e) => {
        setEmail(e.target.value);
    };

    const insertPw = (e) => {
        
        setPw(e.target.value);
    };
    const insertPwCheck = (e) => {
        setPwCheck(e.target.value);
    }

    const insertUserName = (e) => {
        setUserName(e.target.value);
    };

    const submission = async (e) => {
        e.preventDefault();
        //used some() in order to check same email address exist in db
        const emailExist = emailList.some((emailEliment) => emailEliment === email);
        
        //check if user-inserted email already exists, if so, block signing-up
        if(emailExist){
            window.alert("Email already exists");
            return;
        }
        //check if password and confirm password matches, if not, block signing-up
        if(pw !== pwCheck){
            window.alert("Confirm password is not the same with password.");
            return;
        }
        //hash password using hashutil.js
        const hashPw = hashutil(email, pw);

        try {
            await axios.post("http://localhost:3001/sign-up", 
                { email: email, userName: userName, pw: hashPw, });
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
                <div>
                    <label>Password Check: </label>
                    <input type="password" value={pwCheck} onChange={insertPwCheck} required />
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