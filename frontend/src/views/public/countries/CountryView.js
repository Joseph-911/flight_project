import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getCountryById } from "api/countriesActions";
import { fetchData } from "utils/fetchData";

const CountryView = () => {
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getCountry = () => {
            fetchData(() => getCountryById(id), setCountry, setError);
        };
        getCountry();
    }, [id]);

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : country ? (
                <div className="displayed-item">
                    <div className="displayed-item-info">
                        <div className="displayed-item-image">
                            <img src={country.flag} alt="Country Flag" />
                        </div>
                        <p className="displayed-item-title">{country.name}</p>
                    </div>
                    <div className="displayed-item-links">
                        <Link className="btn btn-md btn-primary" to="/">
                            All Airlines
                        </Link>
                        <Link className="btn btn-md btn-primary" to="/">
                            Origin Flights
                        </Link>
                        <Link className="btn btn-md btn-primary" to="/">
                            Destination Flights
                        </Link>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default CountryView;
