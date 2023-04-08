import React from "react";
import { Routes, Route } from "react-router-dom";

import {
    Home,
    Login,
    Countries,
    Country,
    Airlines,
    Airline,
    Register,
    Page404,
    Flights,
} from "routes/publicRoutes";

import { RestrictedRoute } from "utils/CustomRoutes";

const PublicViewsLayout = () => {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/countries/:id" element={<Country />} />
            <Route path="/airlines" element={<Airlines />} />
            <Route path="/airlines/:id" element={<Airline />} />
            <Route path="/flights" element={<Flights />} />
            <Route element={<RestrictedRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
};

export default PublicViewsLayout;
