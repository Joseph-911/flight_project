import React from "react";
import { Link } from "react-router-dom";

const AirlineItem = (props) => {
    const airline = props.airline;
    return (
        <div className="displayed-item">
            <div className="displayed-item-info">
                <div className="displayed-item-image">
                    <img src={airline.user_thumbnail} alt="Airline Profile" />
                </div>
                <p className="displayed-item-title">{airline.name}</p>
                <p>Country: {airline.country_name}</p>
                <p>Flights: {airline.flight_count}</p>
            </div>

            <div className="displayed-item-links">
                <Link to={`/airlines/${airline.id}/flights`} className="btn btn-md btn-primary">
                    All Flights
                </Link>
            </div>
        </div>
    );
};

export default AirlineItem;
