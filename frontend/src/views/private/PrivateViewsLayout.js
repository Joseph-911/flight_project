import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "utils/CustomRoutes";

import {
    Profile,
    ProfileAdministratorUsers,
    ProfileAdministratorUsersAdd,
} from "routes/privateRoutes";

const PrivateViewsLayout = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="" element={<Profile />} />
                <Route
                    path="/administrator/users"
                    element={<ProfileAdministratorUsers />}
                />
                <Route
                    path="/administrator/users/add"
                    element={<ProfileAdministratorUsersAdd />}
                />
            </Route>
        </Routes>
    );
};

export default PrivateViewsLayout;
