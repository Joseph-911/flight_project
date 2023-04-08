import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getCountryAirlines, getCountryById } from "api/common/countriesAPI";
import PageTitle from "components/PageTitle";

const CountryAirlinesView = () => {
    const { id } = useParams();

    const [airlines, setAirlines] = useState([]);
    const [country, setCountry] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCountryById(id, setCountry, setError);
    }, [id]);

    useEffect(() => {
        country && getCountryAirlines(id, setAirlines);
    }, [id, country]);

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    <PageTitle title={`${country.name} Airlines`} />

                    {airlines.length === 0 ? (
                        <p>No airlines found from {country.name}</p>
                    ) : (
                        <ul className="display-list">
                            {airlines.map((airline, idx) => {
                                return (
                                    <li
                                        key={`country-airline-${idx}`}
                                        className="display-item animate-up"
                                    >
                                        <Link
                                            to={`/airlines/${airline.id}`}
                                            className="display-link"
                                        >
                                            <div className="display-image">
                                                <img
                                                    src={airline.user_thumbnail}
                                                    alt="Airline Profile"
                                                />
                                            </div>
                                            <p className="title">
                                                {airline.name}
                                            </p>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </>
            )}
        </>
    );
};

export default CountryAirlinesView;
