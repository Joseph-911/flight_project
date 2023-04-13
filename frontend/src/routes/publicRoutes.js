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
import FlightsView from "views/public/flights/FlightsView";
import CountryAirlinesView from "views/public/countries/CountryAirlinesView";
import CountryOriginFlightsView from "views/public/countries/CountryOriginFlightsView";
import CountryDestinationFlightsView from "views/public/countries/CountryDestinationFlightsView";
import AirlineFlightsView from "views/public/airlines/AirlineFlightsView";

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
            <div className="animate-fade-up">
                <HomeView />
            </div>
        </>
    );
};

export const Login = () => {
    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="animate-fade-up">
                <LoginView />
            </div>
        </>
    );
};

export const Register = () => {
    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className="animate-fade-up">
                <RegisterView />
            </div>
        </>
    );
};

export const Countries = () => {
    return (
        <>
            <Helmet>
                <title>All Countries</title>
            </Helmet>
            <div className="animate-fade-up">
                <CountriesView />
            </div>
        </>
    );
};

export const Country = () => {
    return (
        <>
            <Helmet>
                <title>Country</title>
            </Helmet>
            <div className="animate-fade-up">
                <CountryView />
            </div>
        </>
    );
};

export const CountryAirlines = () => {
    return (
        <>
            <Helmet>
                <title>Country Airlines</title>
            </Helmet>
            <div className="animate-fade-up">
                <CountryAirlinesView />
            </div>
        </>
    );
};

export const CountryOriginFlights = () => {
    return (
        <>
            <Helmet>
                <title>Country Origin Flights</title>
            </Helmet>
            <div className="animate-fade-up">
                <CountryOriginFlightsView />
            </div>
        </>
    );
};

export const CountryDestinationFlights = () => {
    return (
        <>
            <Helmet>
                <title>Country Destination Flights</title>
            </Helmet>
            <div className="animate-fade-up">
                <CountryDestinationFlightsView />
            </div>
        </>
    );
};

export const Airlines = () => {
    return (
        <>
            <Helmet>
                <title>All Airlines</title>
            </Helmet>
            <div className="animate-fade-up">
                <AirlinesView />
            </div>
        </>
    );
};

export const Airline = () => {
    return (
        <>
            <Helmet>
                <title>Airline</title>
            </Helmet>
            <div className="animate-fade-up">
                <AirlineView />
            </div>
        </>
    );
};

export const AirlineFlights = () => {
    return (
        <>
            <Helmet>
                <title>Airline Flights</title>
            </Helmet>
            <div className="animate-fade-up">
                <AirlineFlightsView />
            </div>
        </>
    );
};

export const Flights = () => {
    return (
        <>
            <Helmet>
                <title>All Flights</title>
            </Helmet>
            <div className="animate-fade-up">
                <FlightsView />
            </div>
        </>
    );
};
