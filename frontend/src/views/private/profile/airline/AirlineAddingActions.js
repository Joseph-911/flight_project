import React, { useEffect, useState } from "react";

import AddFlight from "./flightsActions/AddFlight";

const AirlineAddingActions = (props) => {
    const [formComponent, setFormComponent] = useState(props.target);
    const [component, setComponent] = useState();

    useEffect(() => {
        switch (formComponent) {
            case "flights":
                setComponent(
                    <AddFlight target={props.target} sender={props.sender} />
                );
                break;
            default:
                break;
        }
    }, [formComponent, setFormComponent, props.target, props.sender]);

    return <>{component}</>;
};

export default AirlineAddingActions;
