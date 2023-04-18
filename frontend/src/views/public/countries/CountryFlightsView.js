import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getCountryById,
    getCountryOriginFlights,
    getCountryDestinationFlights,
    getCountryDepartureFlights,
    getCountryArrivalFlights,
} from "api/common/countriesAPI";
import PageTitle from "components/PageTitle";
import Flight from "components/Flight";
import Tabs from "components/Tabs";

const CountryFlightsView = () => {
    const { id } = useParams();
    const [currentTab, setCurrentTab] = useState("origin-flights");

    const handleCurrentTab = (tab) => {
        setCurrentTab(tab);
    };

    const [flights, setFlights] = useState([]);
    const [country, setCountry] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCountryById(id, setCountry, setError);
    }, [id]);

    useEffect(() => {
        if (country) {
            if (currentTab === "origin-flights") {
                getCountryOriginFlights(id, setFlights);
            } else if (currentTab === "destination-flights") {
                getCountryDestinationFlights(id, setFlights);
            } else if (currentTab === "origin-flights-soon") {
                getCountryDepartureFlights(id, setFlights);
            } else if (currentTab === "destination-flights-soon") {
                getCountryArrivalFlights(id, setFlights);
            }
        }
    }, [id, country, currentTab]);

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    <Tabs
                        tabs={[
                            {
                                name: "Origin Flights",
                                target: "origin-flights",
                            },
                            {
                                name: "Destination Flights",
                                target: "destination-flights",
                            },
                            {
                                name: "Origin Flights in 12 Hours",
                                target: "origin-flights-soon",
                            },
                            {
                                name: "Destination Flights in 12 Hours",
                                target: "destination-flights-soon",
                            },
                        ]}
                        currentTab={currentTab}
                        handleCurrentTab={handleCurrentTab}
                    />

                    <PageTitle
                        title={`${country.name} ${
                            currentTab === "origin-flights"
                                ? "Origin Flights"
                                : currentTab === "destination-flights"
                                ? "Destination Flights"
                                : currentTab === "origin-flights-soon"
                                ? "Origin Flights - in 12 Hours"
                                : currentTab === "destination-flights-soon"
                                ? "Destination Flights - in 12 Hours"
                                : ""
                        }`}
                    />

                    {flights.length === 0 ? (
                        <p>
                            No flights found
                            {currentTab === "origin-flights"
                                ? " from "
                                : " to "}
                            {country.name}
                        </p>
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
        </div>
    );
};

export default CountryFlightsView;
