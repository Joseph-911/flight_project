import React from "react";
import { useLocation } from "react-router-dom";

import { adminActionsList } from "utils/actionsLists";
import ActionsList from "../ActionsList";

const DashboardAdmin = () => {
    let location = useLocation();

    const actionPath = `${location.pathname}`;

    return (
        <ActionsList
            sender="administrator"
            actionsList={adminActionsList}
            actionPath={actionPath}
        />
    );
};

export default DashboardAdmin;
