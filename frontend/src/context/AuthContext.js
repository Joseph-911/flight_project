import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import MessagesContext from "./MessagesContext";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = (props) => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.withCredentials = true;

    const api = axios.create({
        baseURL: "https://flight-project.azurewebsites.net/api/",
    });

    const [user, setUser] = useState(() => Cookies.get("user") || null);
    const [userDetails, setUserDetails] = useState([]);
    const { addMessage } = useContext(MessagesContext);

    const navigate = useNavigate();

    /* --------------------------------------------- */
    /* ----------------- User Login ---------------- */
    /* --------------------------------------------- */
    const userLogin = async (username, password, setError) => {
        try {
            const { data } = await api.post("login/", {
                username: username,
                password: password,
            });

            if (data) {
                Cookies.set("user", data);
                setUser(data);
                addMessage("Logged in successfully", "success");
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    /* --------------------------------------------- */
    /* ----------------- User Role ----------------- */
    /* --------------------------------------------- */
    const userRole = async () => {
        try {
            const { data } = await api.get("user-role/");
            return data;
        } catch (error) {
            return null;
        }
    };

    /* --------------------------------------------- */
    /* ---------------- User Logout ---------------- */
    /* --------------------------------------------- */
    const userLogout = useCallback(() => {
        api.post("logout/");
        Cookies.remove("user");
        setUser(null);
        navigate("/");
        addMessage("Your logged out", "info");
    }, [api, navigate, addMessage]);

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
        const userInfo = async () => {
            const { data } = await axios.get(
                "https://flight-project.azurewebsites.net/api/user-details/"
            );
            setUserDetails(data);
        };
        if (token) {
            setUser(token);
            userInfo();
        }
    }, [user]);

    const authContextData = {
        api,
        user,
        userDetails,
        userLogin,
        userLogout,
        userRole,
    };

    return (
        <AuthContext.Provider value={authContextData}>
            {props.children}
        </AuthContext.Provider>
    );
};
