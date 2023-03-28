import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = (props) => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.withCredentials = true;

    const api = axios.create({
        baseURL: "http://127.0.0.1:8000/api/",
    });

    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState([]);

    const userInfo = async (token) => {
        if (token) {
            const { data } = await api.get("user-details/", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setUserDetails(data);
        }
    };

    const userLogin = async (username, password, setError) => {
        try {
            const { data } = await api.post("login/", {
                username: username,
                password: password,
            });

            if (data) {
                Cookies.set("user", data);
                setUser(data);
                await userInfo(data);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const userLogout = useCallback(() => {
        api.post("logout/");
        Cookies.remove("user");
        setUser(null);
    }, [api]);

    useEffect(() => {
        const timer = setInterval(() => {
            const cookie = Cookies.get("user");
            if (!cookie && user) {
                userLogout();
            } else if (cookie && !user) {
                setUser(cookie);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [userLogout, user]);

    useEffect(() => {
        const token = Cookies.get("user");
        token && setUser(token);
    }, [user, setUser]);

    const authContextData = {
        api,
        user,
        userDetails,
        userLogin,
        userLogout,
    };

    return (
        <AuthContext.Provider value={authContextData}>
            {props.children}
        </AuthContext.Provider>
    );
};
