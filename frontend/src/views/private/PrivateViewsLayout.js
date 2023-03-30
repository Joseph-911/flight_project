import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "utils/CustomRoutes";

import { Profile, ProfileAdministratorUsers } from "routes/privateRoutes";
import { PageNotFound } from "routes/publicRoutes";

const PrivateViewsLayout = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                {/* <Route path="*" element={<PageNotFound />} /> */}
                <Route path="" element={<Profile />} />
                <Route
                    path="/administrator/users"
                    element={<ProfileAdministratorUsers />}
                />
            </Route>
        </Routes>
    );
};

export default PrivateViewsLayout;
