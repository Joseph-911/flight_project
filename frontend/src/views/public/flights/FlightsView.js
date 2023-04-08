import React, { useEffect, useState } from "react";

import PageTitle from "components/PageTitle";
import { fetchData } from "utils/fetchData";
import { getAllFlights } from "api/common/flightsAPI";
import Flight from "components/Flight";

const FlightsView = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        fetchData(getAllFlights, setFlights);
    }, []);

    return (
        <>
            <PageTitle title="All Flights" />

            {flights.length === 0 ? (
                <p>No flights found</p>
            ) : (
                <ul className="flights-list">
                    {flights.map((flight, idx) => {
                        return (
                            <Flight
                                key={`all-flights-item-${idx}`}
                                flight={flight}
                            />
                        );
                    })}
                </ul>
            )}
        </>
    );
};

export default FlightsView;
