import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "utils/CustomRoutes";

import { Profile, ProfileAll } from "routes/privateRoutes";

const PrivateViewsLayout = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="" element={<Profile />} />
                <Route path="/all" element={<ProfileAll />} />
            </Route>
        </Routes>
    );
};

export default PrivateViewsLayout;
