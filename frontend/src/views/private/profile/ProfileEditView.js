import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import UpdateAirline from "./airline/UpdateAirline";
import UpdateCustomer from "./customer/UpdateCustomer";
import UpdateFlight from "./airline/flightsActions/UpdateFlight";

const ProfileEditView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [editComponent, setEditCompnent] = useState();

    useEffect(() => {
        if (!location.state) {
            navigate("/");
        } else {
            switch (location.state.target) {
                case "airline company":
                    setEditCompnent(<UpdateAirline />);
                    break;
                case "customer":
                    setEditCompnent(<UpdateCustomer />);
                    break;
                case "flight":
                    setEditCompnent(<UpdateFlight />);
                    break;
                default:
                    break;
            }
        }
    }, [location.state, navigate]);

    return <div>{location.state && editComponent}</div>;
};

export default ProfileEditView;
