/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/

import "../App.css";
import React from "react";
import { useState, useEffect } from "react";

const UserInfo = () => {
    const [userImage, setUserImage] = useState("/assignImage/user.png");    //default value for img
    const [password, setPassword] = useState("******");                     //default value for pw
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("abc@stonybrook.edu");

    useEffect(() => {   //fetch email, username, image data from localStorage (server -> localStorage)
        const serverEmail = localStorage.getItem("email");
        const serverUserName = localStorage.getItem("userName");
        const serverUserImage = localStorage.getItem("userImage");

        //initialize data with data from server
        if(serverEmail) setEmail(serverEmail);
        if(serverUserName) setUserName(serverUserName);
        if(serverUserImage) setUserImage(serverUserImage);
    }, []);


    const saveImage = () => {
        const imageInput = document.getElementById("imageInput"); //image input from html
        const fileName = imageInput?.files?.[0]; 
        if(!fileName) { //if image is not selected
            console.error("no file");
            window.alert("No Image Selected!");
            return;
        } else if(fileName) {
            //used FileReader() in order to read file contents
            const reader = new FileReader();  
            //onload executes when file-reading is completed   
            reader.onload = () => {
                const newImage = reader.result;
                setUserImage(newImage);
                localStorage.setItem("userImage", newImage);
                window.alert("Image has been changed!");
            };
            reader.readAsDataURL(fileName);
        }
    };

    const savePassword = () => {    //save user password
        localStorage.setItem("password", password);
        window.alert("Password has been changed!");
    };

    const saveUserName = () => {    //save username
        localStorage.setItem("useName", userName);
        window.alert("Name has been changed!");
    }

    return (
        <div style={ {paddingLeft: "40%"} }>
            <p></p><h2>User Information</h2><p></p>
            <img src={userImage} alt="User" id="userImage" style={{ width: "300px"}} />
            <p></p>
            <div>
                <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#imageModal">
                    Change Image
                </button>
                <div className="modal" id="imageModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Change your image</h5>
                                <button className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <input id="imageInput" type="file" accept="image/*" />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-primary" data-bs-dismiss="modal" onClick={saveImage}>
                                    Save New Image
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <p />
            <p>Email: {email}</p>
            
            <div>
                <p>Password: {password}</p>
                <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#passwordModal">
                    Change Password
                </button>
                <div className="modal" id="passwordModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Change your password</h5>
                                <button className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(newPW) => setPassword(newPW.target.value)}
                                    placeholder="Enter new password"
                                />
                            </div>
                            
                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-primary" data-bs-dismiss="modal" onClick={savePassword}>
                                    Save Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p></p>
            <div>
                <p>Name: {userName}</p>
                <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#userNameModal">
                    Change Name
                </button>
                <div className="modal" id="userNameModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Change your Name</h5>
                                <button className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={userName}
                                    onChange={(newName) => setUserName(newName.target.value)}
                                    placeholder="Enter new password"
                                />
                            </div>
                            
                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-primary" data-bs-dismiss="modal" onClick={saveUserName}>
                                    Save Name
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
