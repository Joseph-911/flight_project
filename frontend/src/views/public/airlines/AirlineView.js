import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getAirlineById } from "api/common/airlinesAPI";
import { fetchData } from "utils/fetchData";

const AirlineView = () => {
    const [airline, setAirline] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getAirline = () => {
            fetchData(() => getAirlineById(id), setAirline, setError);
        };
        getAirline();
    }, [id]);

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : airline ? (
                <div className="displayed-item">
                    <div className="displayed-item-info">
                        <div className="displayed-item-image">
                            <img
                                src={airline.user_thumbnail}
                                alt="Airline Profile"
                            />
                        </div>
                        <p className="displayed-item-title">{airline.name}</p>
                        <p>Country: {airline.country_name}</p>
                        <p>Flights: {airline.flight_count}</p>
                    </div>

                    <div className="displayed-item-links">
                        <Link to="/" className="btn btn-md btn-primary">
                            All Flights
                        </Link>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default AirlineView;
