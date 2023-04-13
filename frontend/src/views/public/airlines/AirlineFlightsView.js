import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getAirlineById, getAirlineFlights } from "api/common/airlinesAPI";
import PageTitle from "components/PageTitle";
import Flight from "components/Flight";

const AirlineFlightsView = () => {
    const { id } = useParams();

    const [flights, setFlights] = useState([]);
    const [airline, setAirline] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAirlineById(id, setAirline, setError);
    }, [id]);

    useEffect(() => {
        airline && getAirlineFlights(id, setFlights);
    }, [id, airline]);

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    <PageTitle title={`${airline.name} Flights`} />

                    {flights.length === 0 ? (
                        <p>
                            No flights found that belong to "{airline.name}"
                            company
                        </p>
                    ) : (
                        <ul className="flights-list">
                            {flights.map((flight, idx) => {
                                return (
                                    <Flight
                                        key={`airline-flights-${idx}`}
                                        flight={flight}
                                    />
                                );
                            })}
                        </ul>
                    )}
                </>
            )}
        </>
    );
};

export default AirlineFlightsView;
