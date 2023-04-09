import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getCountryById } from "api/common/countriesAPI";

const CountryView = () => {
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getCountryById(id, setCountry, setError);
    }, [id]);

    return (
        <>
            {country ? (
                <div className="displayed-item">
                    <div className="displayed-item-info">
                        <div className="displayed-item-image">
                            <img src={country.flag} alt="Country Flag" />
                        </div>
                        <p className="displayed-item-title">{country.name}</p>
                    </div>
                    <div className="displayed-item-links">
                        <Link
                            className="btn btn-md btn-primary"
                            to={`/countries/${id}/airlines`}
                        >
                            All Airlines
                        </Link>
                        <Link className="btn btn-md btn-primary" to={`/countries/${id}/flights/origin`}>
                            Origin Flights
                        </Link>
                        <Link className="btn btn-md btn-primary" to={`/countries/${id}/flights/destination`}>
                            Destination Flights
                        </Link>
                    </div>
                </div>
            ) : (
                <p>{error}</p>
            )}
        </>
    );
};

export default CountryView;
