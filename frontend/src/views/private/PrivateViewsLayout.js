import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "utils/CustomRoutes";

import { Profile } from "routes/privateRoutes";

const PrivateViewsLayout = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="" element={<Profile />} />
            </Route>
        </Routes>
    );
};

export default PrivateViewsLayout;
