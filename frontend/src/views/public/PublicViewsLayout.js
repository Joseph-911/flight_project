import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Login, Countries } from "routes/publicRoutes";
import { RestrictedRoute } from "utils/CustomRoutes";

const PublicViewsLayout = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Countries />} />
            <Route element={<RestrictedRoute />}>
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    );
};

export default PublicViewsLayout;
