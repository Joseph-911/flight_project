import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getAirlineById } from "api/common/airlinesAPI";
import AirlineItem from "components/AirlineItem";

const AirlineView = () => {
    const [airline, setAirline] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getAirlineById(id, setAirline, setError);
    }, [id]);

    return <>{airline ? <AirlineItem airline={airline} /> : <p>{error}</p>}</>;
};

export default AirlineView;
