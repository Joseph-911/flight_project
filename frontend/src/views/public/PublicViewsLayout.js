import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Login } from "routes/publicRoutes";

const PublicViewsLayout = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
    );
};

export default PublicViewsLayout;
