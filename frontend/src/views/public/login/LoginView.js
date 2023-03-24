import React, { useState, useContext, useEffect } from "react";

import AuthContext from "context/AuthContext";

const LoginView = () => {
    const { userLogin } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        await userLogin(username, password);
    };

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
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
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
