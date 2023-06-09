import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "utils/CustomRoutes";

import {
    Profile,
    ProfileAdd,
    ProfileAll,
    ProfileEdit,
    CreateCustomer,
} from "routes/privateRoutes";

const PrivateViewsLayout = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="" element={<Profile />} />
                <Route path="/all" element={<ProfileAll />} />
                <Route path="/add" element={<ProfileAdd />} />
                <Route path="/edit" element={<ProfileEdit />} />
                <Route path="/create-customer" element={<CreateCustomer />} />
            </Route>
        </Routes>
    );
};

export default PrivateViewsLayout;
