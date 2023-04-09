import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getCountryDestinationFlights,
    getCountryById,
} from "api/common/countriesAPI";
import PageTitle from "components/PageTitle";
import Flight from "components/Flight";

const CountryDestinationFlightsView = () => {
    const { id } = useParams();

    const [flights, setFlights] = useState([]);
    const [country, setCountry] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCountryById(id, setCountry, setError);
    }, [id]);

    useEffect(() => {
        country && getCountryDestinationFlights(id, setFlights);
    }, [id, country]);

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    <PageTitle title={`${country.name} Destination Flights`} />

                    {flights.length === 0 ? (
                        <p>No flights found to {country.name}</p>
                    ) : (
                        <ul className="flights-list">
                            {flights.map((flights, idx) => {
                                return (
                                    <Flight
                                        key={`country-origin-flight-${idx}`}
                                        flight={flights}
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

export default CountryDestinationFlightsView;
