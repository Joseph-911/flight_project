import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AdminAddingActions from "./admin/AdminAddingActions";

const AddView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const locationState = location.state;
    const [component, setComponent] = useState();

    useEffect(() => {
        if (!locationState) {
            navigate("/");
        } else {
            const sender = locationState.sender;
            const target = locationState.target;

            switch (locationState.sender) {
                case "administrator":
                    setComponent(
                        <AdminAddingActions sender={sender} target={target} />
                    );
                    break;
                default:
                    break;
            }
        }
    }, [locationState, navigate]);

    return <>{component}</>;
};

export default AddView;
