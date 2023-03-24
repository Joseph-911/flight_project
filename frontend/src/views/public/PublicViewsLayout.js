import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Login } from "routes/publicRoutes";
import { RestrictedRoute } from "utils/CustomRoutes";

const PublicViewsLayout = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route element={<RestrictedRoute />}>
                <Route path="/login" element={<Login />}></Route>
            </Route>
        </Routes>
    );
};

export default PublicViewsLayout;
