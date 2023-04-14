import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AuthContext from "context/AuthContext";
import { getFlight } from "api/common/flightsAPI";

const FlightView = () => {
    const { userRole } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [flight, setFlight] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getFlight(id, setFlight, setError);
    }, [id]);

    const handleBuyTicket = async () => {
        const roleData = await userRole();

        if (!roleData.role) {
            navigate(`/profile/create-customer`, {
                state: { isBuying: true },
            });
        } else {
            navigate(`/flight/${id}/book`);
        }
    };

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div className="flight-details">
                        <div
                            className={`flight-location ${
                                flight.destination_country ===
                                flight.origin_country
                                    ? "single"
                                    : "multi"
                            }`}
                        >
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
                            <button
                                onClick={handleBuyTicket}
                                className="btn btn-xl btn-primary"
                            >
                                Book for ${flight.price}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default FlightView;
