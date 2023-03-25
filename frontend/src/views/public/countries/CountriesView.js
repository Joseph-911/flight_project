import React, { useEffect, useState } from "react";

import PageTitle from "components/PageTitle";
import { fetchData } from "utils/fetchData";
import { getAllCountries } from "api/countriesActions";
import { Link } from "react-router-dom";

const CountriesView = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetchData(getAllCountries, setCountries);
    }, []);

    return (
        <>
            <PageTitle title="All Countries" />

            {countries.length === 0 ? (
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
        </>
    );
};

export default CountriesView;
