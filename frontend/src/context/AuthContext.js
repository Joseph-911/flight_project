import React, { createContext, useState } from "react";
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

    const [user, setUser] = useState(false);

    const [error, setError] = useState(null);

    const userLogin = async (email, password) => {
        try {
            const { data } = await api.post("login/", {
                username: email,
                password: password,
            });

            if (data.error) {
                setError(data.error);
            } else {
                setUser(true);
            }
        } catch (error) {
            return;
        }
    };

    const authContextData = {
        api,
        user,
        userLogin,
        error,
    };

    return (
        <AuthContext.Provider value={authContextData}>
            {props.children}
        </AuthContext.Provider>
    );
};
