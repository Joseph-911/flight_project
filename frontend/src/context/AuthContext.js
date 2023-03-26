import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = (props) => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.withCredentials = true;

    const api = axios.create({
        baseURL: "http://127.0.0.1:8000/api/",
    });

    const [user, setUser] = useState(
        () => JSON.parse(localStorage.getItem("user")) || null
    );

    const userLogout = useCallback(() => {
        api.post("logout/");
        localStorage.removeItem("user");
        setUser(null);
    }, [api]);

    useEffect(() => {
        const handleStorageChange = () => {
            if (!localStorage.getItem("user")) {
                userLogout();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [userLogout]);

    const authContextData = {
        api,
        user,
        setUser,
        userLogout,
    };

    return (
        <AuthContext.Provider value={authContextData}>
            {props.children}
        </AuthContext.Provider>
    );
};
