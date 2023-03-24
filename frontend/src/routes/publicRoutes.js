import React from "react";
import { Helmet } from "react-helmet";

import HomeView from "views/public/home/HomeView";
import LoginView from "views/public/login/LoginView";

export const Home = () => {
    return (
        <>
            <Helmet>
                <title>Flight Project</title>
            </Helmet>
            <HomeView />
        </>
    );
};

export const Login = () => {
    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <LoginView />
        </>
    );
};
