import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PageTitle from "components/PageTitle";
import { fetchData } from "utils/fetchData";
import { getAllAirlines } from "api/airlinesActions";

const AirlinesView = () => {
    const [airlines, setAirlines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData(getAllAirlines, setAirlines);
        setLoading(false);
    }, []);

    return (
        <>
            <PageTitle title="All Airlines" />

            {loading ? (
                <p>Loading...</p>
            ) : airlines.length === 0 ? (
                <p>No airlines found</p>
            ) : (
                <ul className="display-list">
                    {airlines.map((item, idx) => {
                        return (
                            <li
                                key={`airline-item-${idx}`}
                                className="display-item animate-up"
                            >
                                <Link
                                    to={`/airlines/${item.id}`}
                                    className="display-link"
                                >
                                    <div className="display-image">
                                        <img
                                            src={item.user_thumbnail}
                                            alt="Airline Profile"
                                        />
                                    </div>
                                    <p className="title">{item.name}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}

            {/* {airlines.length === 0 ? (
                <p>No airlines found</p>
            ) : (
                <ul className="display-list">
                    {airlines.map((item, idx) => {
                        return (
                            <li
                                key={`airline-item-${idx}`}
                                className="display-item animate-up"
                            >
                                <Link
                                    to={`/airlines/${item.id}`}
                                    className="display-link"
                                >
                                    <div className="display-image">
                                        <img
                                            src={item.user_thumbnail}
                                            alt="Airline Profile"
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

export default AirlinesView;
