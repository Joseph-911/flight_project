import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getFlight } from "api/common/flightsAPI";

const FlightView = () => {
    const { id } = useParams();

    const [flight, setFlight] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getFlight(id, setFlight, setError);
    }, [id]);

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div className="flight-details">
                    <div className={`flight-location ${flight.destination_country === flight.origin_country ? 'single' : 'multi'}`}>
                        {flight.destination_country ===
                        flight.origin_country ? (
                            <p>{flight.from_to}</p>
                        ) : (
                            <>
                                <p>{flight.origin_country}</p>
                                <p>{flight.destination_country}</p>
                            </>
                        )}
                    </div>
                    <div className="flight-time">
                        <div className="datetime">
                            <p>{flight.formatted_departure_date}</p>
                            <p>{flight.formatted_departure_time}</p>
                        </div>
                        <div className="duration">
                            <div>
                                <span className="icon">
                                    <ion-icon name="airplane"></ion-icon>
                                </span>
                                <span className="content">
                                    {flight.flight_duration}
                                </span>
                            </div>
                        </div>
                        <div className="datetime">
                            <p>{flight.formatted_landing_date}</p>
                            <p>{flight.formatted_landing_time}</p>
                        </div>
                    </div>

                    <div className="flight-action">
                        <Link to="/" className="btn btn-xl btn-primary">Book</Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default FlightView;
