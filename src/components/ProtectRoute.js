import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectRoute = ({ children }) => {
    const [authVerified, setAuthVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                await refreshAuthToken();
                setAuthVerified(true);
            } catch {
                setAuthVerified(false);
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!authVerified) {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
};

export default ProtectRoute;

const refreshAuthToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token found.");

        const res = await axios.post("http://localhost:3001/token", { token: refreshToken });

        console.log("New access token received:", res.data.accessToken);
        localStorage.setItem("authToken", res.data.accessToken);
    } catch (err) {
        console.error("Failed to refresh auth token:", err.response?.data || err.message);
        throw err;
    }
};
