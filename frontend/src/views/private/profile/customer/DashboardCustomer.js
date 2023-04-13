import React from "react";
import { useLocation } from "react-router-dom";

import { customerActionsList } from "utils/actionsLists";
import ActionsList from "../ActionsList";

const DashboardCustomer = () => {
    let location = useLocation();
    const actionPath = `${location.pathname}`;

    return (
        <ActionsList
            sender="customer"
            actionsList={customerActionsList}
            actionPath={actionPath}
        />
    );
};

export default DashboardCustomer;
