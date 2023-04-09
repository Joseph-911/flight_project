import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getCountryOriginFlights,
    getCountryById,
} from "api/common/countriesAPI";
import PageTitle from "components/PageTitle";
import Flight from "components/Flight";

const CountryOriginFlightsView = () => {
    const { id } = useParams();

    const [flights, setFlights] = useState([]);
    const [country, setCountry] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCountryById(id, setCountry, setError);
    }, [id]);

    useEffect(() => {
        country && getCountryOriginFlights(id, setFlights);
    }, [id, country]);

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    <PageTitle title={`${country.name} Origin Flights`} />

                    {flights.length === 0 ? (
                        <p>No flights found from {country.name}</p>
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

export default CountryOriginFlightsView;
