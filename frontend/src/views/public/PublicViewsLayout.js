import React from "react";
import { Routes, Route } from "react-router-dom";

import {
    Page404,
    Home,
    Login,
    Register,
    Countries,
    CountryAirlines,
    Country,
    CountryOriginFlights,
    CountryDestinationFlights,
    Airlines,
    Airline,
    AirlineFlights,
    Flights,
    Flight,
    FlightBooking,
} from "routes/publicRoutes";

import { RestrictedRoute } from "utils/CustomRoutes";

const PublicViewsLayout = () => {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/countries/:id" element={<Country />} />
            <Route
                path="/countries/:id/airlines"
                element={<CountryAirlines />}
            />
            <Route
                path="/countries/:id/flights/origin"
                element={<CountryOriginFlights />}
            />
            <Route
                path="/countries/:id/flights/destination"
                element={<CountryDestinationFlights />}
            />
            <Route path="/airlines" element={<Airlines />} />
            <Route path="/airlines/:id" element={<Airline />} />
            <Route path="/airlines/:id/flights" element={<AirlineFlights />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/flight/:id" element={<Flight />} />
            <Route path="/flight/:id/book" element={<FlightBooking />} />
            <Route element={<RestrictedRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
};

export default PublicViewsLayout;
