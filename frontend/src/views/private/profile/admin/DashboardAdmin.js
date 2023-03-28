import React from "react";
import { adminActionsList } from "utils/actionsLists";
import ActionsList from "../ActionsList";
import { useLocation } from "react-router-dom";

const DashboardAdmin = () => {
    let location = useLocation();

    const actionPath = `${location.pathname}/administrator`;

    return (
        <ActionsList actionsList={adminActionsList} actionPath={actionPath} />
    );
};

export default DashboardAdmin;
