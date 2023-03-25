import React from "react";
import { Helmet } from "react-helmet";

import HomeView from "views/public/home/HomeView";
import LoginView from "views/public/login/LoginView";
import CountriesView from "views/public/countries/CountriesView";
import CountryView from "views/public/country/CountryView";

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

export const Countries = () => {
    return (
        <>
            <Helmet>
                <title>All Countries</title>
            </Helmet>
            <CountriesView />
        </>
    );
};

export const Country = () => {
    return (
        <>
            <Helmet>
                <title>Country</title>
            </Helmet>
            <CountryView />
        </>
    );
};
