import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import UpdateAirline from "./airline/UpdateAirline";

const ProfileEditView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [editComponent, setEditCompnent] = useState();

    useEffect(() => {
        if (!location.state) {
            navigate("/");
        } else {
            switch (location.state.role) {
                case "airline company":
                    setEditCompnent(<UpdateAirline />);
                    break;
                case "customer":
                    setEditCompnent(<p>You are: {location.state.role}</p>);
                    break;
                default:
                    break;
            }
        }
    }, [location.state, navigate]);

    return <div>{location.state && editComponent}</div>;
};

export default ProfileEditView;
