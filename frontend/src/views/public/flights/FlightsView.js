import React, { useEffect, useState } from "react";

import PageTitle from "components/PageTitle";
import { getAllFlights, getFlightsByParameters } from "api/common/flightsAPI";
import Flight from "components/Flight";
import { SearchFlightsForm } from "components/Forms";
import { handleInputChange } from "utils/HandleStates";

const FlightsView = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formInputs, setFormInputs] = useState({});
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        getAllFlights(setFlights, setLoading);
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        getFlightsByParameters(setFlights, formInputs);
        setIsSearching(true);
    };

    const handleClearSearch = () => {
        getAllFlights(setFlights, setLoading);
        setIsSearching(false);
        setFormInputs({});
    };

    return (
        <>
            <PageTitle title="All Flights" />

            <div className="form-wrapper-oneline">
                <form
                    method="POST"
                    className="form-inline"
                    onSubmit={handleFormSubmit}
                >
                    <SearchFlightsForm
                        formInputs={formInputs}
                        setFormInputs={setFormInputs}
                        handleInputChange={handleInputChange}
                    />

                    <div className="form-block">
                        <input
                            type="submit"
                            value="Search"
                            className="btn btn-md btn-primary"
                        />
                    </div>

                    {isSearching && (
                        <button
                            onClick={handleClearSearch}
                            className="btn btn-md btn-primary-outline"
                        >
                            Clear Search
                        </button>
                    )}
                </form>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : flights.length === 0 ? (
                <>
                    {isSearching && (
                        <p className="bold">Based on your search:</p>
                    )}
                    <p>No flights found</p>
                </>
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
