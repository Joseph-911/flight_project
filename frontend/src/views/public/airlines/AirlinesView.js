import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PageTitle from "components/PageTitle";
import { getAllAirlines, getAirlineByParameters } from "api/common/airlinesAPI";
import { SearchAirlineForm } from "components/Forms";
import { handleInputChange } from "utils/HandleStates";

const AirlinesView = () => {
    const [airlines, setAirlines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formInputs, setFormInputs] = useState({});
    // const [error, setError] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
 
    useEffect(() => {
        getAllAirlines(setAirlines, setLoading);
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        getAirlineByParameters(setAirlines, formInputs);
        setIsSearching(true);
    }

    const handleClearSearch = (e) => {
        getAllAirlines(setAirlines, setLoading);
        setIsSearching(false);
        setFormInputs({});
    }

    return (
        <>
            <PageTitle title="All Airlines" />

            <div className="form-wrapper-oneline">
                <form className="form-inline" onSubmit={handleFormSubmit}>
                    <SearchAirlineForm
                        formInputs={formInputs}
                        setFormInputs={setFormInputs}
                        handleInputChange={handleInputChange}
                        // error={error}
                    />

                    <div className="form-block">
                        <input type="submit" value="Search" className="btn btn-md btn-primary" />
                    </div>
                    {isSearching && <button onClick={handleClearSearch} className="btn btn-md btn-primary-outline">Clear Search</button>}
                </form>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : airlines.length === 0 ? (
                <>
                    <p className="bold">Based on your search:</p>
                    <p>No airlines found</p>
                </>
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
