import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PageTitle from "components/PageTitle";
import { fetchData } from "utils/fetchData";
import { getAllCountries } from "api/common/countriesAPI";

const CountriesView = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData(getAllCountries, setCountries);
        setLoading(false);
    }, []);

    return (
        <>
            <PageTitle title="All Countries" />

            {loading ? (
                <p>Loading...</p>
            ) : countries.length === 0 ? (
                <p>No countries found</p>
            ) : (
                <ul className="display-list">
                    {countries.map((item, idx) => {
                        return (
                            <li
                                key={`country-item-${idx}`}
                                className="display-item animate-up"
                            >
                                <Link
                                    to={`/countries/${item.id}`}
                                    className="display-link"
                                >
                                    <div className="display-image">
                                        <img
                                            src={item.flag}
                                            alt="Country Flag"
                                        />
                                    </div>
                                    <p className="title">{item.name}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
            {/* {countries.length === 0 ? (
                <p>No countries found</p>
            ) : (
                <ul className="display-list">
                    {countries.map((item, idx) => {
                        return (
                            <li
                                key={`country-item-${idx}`}
                                className="display-item animate-up"
                            >
                                <Link
                                    to={`/countries/${item.id}`}
                                    className="display-link"
                                >
                                    <div className="display-image">
                                        <img
                                            src={item.flag}
                                            alt="Country Flag"
                                        />
                                    </div>
                                    <p className="title">{item.name}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )} */}
        </>
    );
};

export default CountriesView;
