import React, { useEffect, useState } from "react";

import AddUser from "./usersActions/AddUser";
import FormsCustomerCombined from "./customersActions/FormsCustomerCombined";
import FormsAirlineCombined from "./airlinesActions/FormsAirlineCombined";
import FormsAdministratorCombined from "./administratorsActions/FormsAdministratorCombined";

const AdminAddingActions = (props) => {
    const [formComponent, setFormComponent] = useState(props.target);
    const [component, setComponent] = useState();

    useEffect(() => {
        switch (formComponent) {
            case "users":
                setComponent(
                    <AddUser target={props.target} sender={props.sender} />
                );
                break;
            case "customers":
                setComponent(
                    <FormsCustomerCombined
                        target={props.target}
                        sender={props.sender}
                    />
                );
                break;
            case "airlines":
                setComponent(
                    <FormsAirlineCombined
                        target={props.target}
                        sender={props.sender}
                    />
                );
                break;
            case "administrators":
                setComponent(
                    <FormsAdministratorCombined
                        target={props.target}
                        sender={props.sender}
                    />
                );
                break;
            default:
                break;
        }
    }, [formComponent, setFormComponent, props.target, props.sender]);

    return <>{component}</>;
};

export default AdminAddingActions;
