/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/

import React from "react";
import { useState } from "react";

const UserInfo = () => {
    const [userImage, setUserImage] = useState("/assignImage/user.png");    //default value for img
    const [password, setPassword] = useState("******");                     //default value for pw

    const saveImage = () => {   //save user image file doesn work for now 
        setUserImage(userImage);    
        window.alert("Image has been changed!");
    };

    const savePassword = () => {    //save user password
        setPassword(password);
        window.alert("Password has been changed!");
    };

    return (
        <div style={ {paddingLeft: "40%"} }>
            <h2>User Information</h2>
            <img src={userImage} alt="User" style={{ width: "300px" }} />
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
                                <input type="file" accept="image/*" onChange={saveImage} />
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
            <p>Email: abc@stonybrook.edu</p>
            
            <div>
                <p>{password}</p>
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
        </div>
    );
};

export default UserInfo;
