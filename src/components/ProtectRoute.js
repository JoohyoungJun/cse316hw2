/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

//protect routes which require authentication
const ProtectRoute = ({ children }) => {
    const [authVerified, setAuthVerified] = useState(false);    //check and update Authverfication
    const [loading, setLoading] = useState(true);   //check and update loading process

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                await refreshAuthToken();
                setAuthVerified(true);  //verification success
            } catch {
                setAuthVerified(false); //authVerification faild
            } finally {
                setLoading(false);  //verification successed or failed, load ends. 
            }
        };

        verifyAuth();
    }, []);

    if (loading) {  //print loading 
        return <p>Loading...</p>;
    }

    if (!authVerified) {    //not verified(not signed-in, redirect user to signin page)
        return <Navigate to="/sign-in" replace />;
    }

    return children;
};

export default ProtectRoute;

const refreshAuthToken = async () => {
    try {
        //get refresh token from localStorage
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token found.");

        //post request to server, refresh token
        const res = await axios.post("http://localhost:3001/token", { token: refreshToken });

        console.log("New access token received:", res.data.accessToken);
        //save new access token
        localStorage.setItem("authToken", res.data.accessToken);
    } catch (err) {//error while refreshing token 
        console.error("Failed to refresh auth token:", err.response?.data || err.message);
        throw err;
    }
};
