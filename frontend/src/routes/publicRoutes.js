import React from "react";
import { Helmet } from "react-helmet";

import HomeView from "views/public/home/HomeView";
import LoginView from "views/public/login/LoginView";
import CountriesView from "views/public/countries/CountriesView";
import CountryView from "views/public/countries/CountryView";
import AirlinesView from "views/public/airlines/AirlinesView";
import AirlineView from "views/public/airlines/AirlineView";
import RegisterView from "views/public/register/RegisterView";
import PageNotFoundView from "views/public/404/Page404View";

export const Page404 = () => {
    return (
        <>
            <Helmet>
                <title>Opps!</title>
            </Helmet>
            <PageNotFoundView />
        </>
    );
};

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

export const Register = () => {
    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <RegisterView />
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

export const Airlines = () => {
    return (
        <>
            <Helmet>
                <title>All Airlines</title>
            </Helmet>
            <AirlinesView />
        </>
    );
};

export const Airline = () => {
    return (
        <>
            <Helmet>
                <title>Airline</title>
            </Helmet>
            <AirlineView />
        </>
    );
};
