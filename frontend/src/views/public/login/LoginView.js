import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "context/AuthContext";
import Message from "components/Message";

const LoginView = () => {
    const { userLogin } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        setError(null);
        e.preventDefault();
        await userLogin(username, password, setError);
    };

    return (
        <div className="form-wrapper">
            {error && (
                <Message level="error" message={error} setState={setError} />
            )}
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
