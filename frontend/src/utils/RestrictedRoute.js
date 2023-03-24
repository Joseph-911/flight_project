import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import AuthContext from "context/AuthContext";

const RestrictedRoute = () => {
    const { user } = useContext(AuthContext);
    return user ? <Navigate to="/" /> : <Outlet />;
};

export default RestrictedRoute;
