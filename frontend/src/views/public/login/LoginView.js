import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthContext from "context/AuthContext";
import MessagesContext from "context/MessagesContext";
// import Message from "components/Message";

const LoginView = () => {
    const { userLogin } = useContext(AuthContext);
    const { addMessage } = useContext(MessagesContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const [inputType, setInputType] = useState("password");
    const [icon, setIcon] = useState("eye");

    const handleLogin = async (e) => {
        setError(null);
        e.preventDefault();
        await userLogin(username, password, setError);
    };

    const handlePasswordToggle = () => {
        if (inputType === "password") {
            setInputType("text");
            setIcon("eye-off");
        } else {
            setInputType("password");
            setIcon("eye");
        }
    };

    useEffect(() => {
        if (error) {
            addMessage(error, "error");
        }
    }, [error, addMessage]);

    return (
        <div className="form-wrapper">
            <form method="POST" onSubmit={handleLogin} className="form">
                <h2 className="form-title">Welcome Back</h2>
                <div className="form-block">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        required
                    />
                </div>
                <div className="form-block">
                    <label htmlFor="password">Password</label>
                    <div className="password-input-wrapper">
                        <input
                            type={inputType}
                            name="password"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                        <span
                            role="button"
                            className="password-toggle"
                            onClick={handlePasswordToggle}
                        >
                            <ion-icon name={icon}></ion-icon>
                        </span>
                    </div>
                </div>
                <div className="form-footer">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </p>
                </div>
                <input
                    className="btn btn-xl btn-primary"
                    type="submit"
                    value="Login"
                />
            </form>
        </div>
    );
};

export default LoginView;
