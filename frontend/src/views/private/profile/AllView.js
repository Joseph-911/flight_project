import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ViewAllData from "./ViewAllData";

const AllView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const locationState = location.state;

    useEffect(() => {
        if (!location.state) {
            navigate("/");
        }
    });

    return <>
        {locationState && <ViewAllData isForm={true} sender={locationState.sender} dataName={locationState.target} />}
    </>;
};

export default AllView;
