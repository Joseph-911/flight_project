import React from "react";
import { Helmet } from "react-helmet";

import PageNotFoundView from "views/public/404/Page404View";
import HomeView from "views/public/home/HomeView";
import LoginView from "views/public/login/LoginView";
import RegisterView from "views/public/register/RegisterView";
// Countries
import CountriesView from "views/public/countries/CountriesView";
import CountryView from "views/public/countries/CountryView";
import CountryAirlinesView from "views/public/countries/CountryAirlinesView";
import CountryFlightsView from "views/public/countries/CountryFlightsView";
// Airlines
import AirlinesView from "views/public/airlines/AirlinesView";
import AirlineView from "views/public/airlines/AirlineView";
import AirlineFlightsView from "views/public/airlines/AirlineFlightsView";
// Flights
import FlightsView from "views/public/flights/FlightsView";
import FlightView from "views/public/flights/FlightView";
import FlightBookingView from "views/public/flights/FlightBookingView";

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
                <title>Home</title>
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

export const CountryFlights = () => {
    return (
        <>
            <Helmet>
                <title>Country Origin Flights</title>
            </Helmet>
            <div className="animate-fade-up">
                <CountryFlightsView />
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

export const Flight = () => {
    return (
        <>
            <Helmet>
                <title>Flight</title>
            </Helmet>
            <div className="animate-fade-up">
                <FlightView />
            </div>
        </>
    );
};

export const FlightBooking = () => {
    return (
        <>
            <Helmet>
                <title>Flight Booking</title>
            </Helmet>
            <div className="animate-fade-up">
                <FlightBookingView />
            </div>
        </>
    );
};
