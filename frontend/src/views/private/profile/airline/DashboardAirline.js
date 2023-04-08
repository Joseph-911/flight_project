import React from "react";
import { useLocation } from "react-router-dom";

import { airlineActionsList } from "utils/actionsLists";
import ActionsList from "../ActionsList";

const DashboardAirline = () => {
    let location = useLocation();
    const actionPath = `${location.pathname}`;

    return (
        <ActionsList
            sender="airline"
            actionsList={airlineActionsList}
            actionPath={actionPath}
        />
    );
};

export default DashboardAirline;
