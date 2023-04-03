import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const locationState = location.state;

    useEffect(() => {
        if (!locationState) {
            navigate("/");
        }
    });

    return (
        <div>
            Sender: {locationState.sender}, Target: {locationState.target}
        </div>
    );
};

export default AddView;
