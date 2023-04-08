import React from "react";
import { Link } from "react-router-dom";

const Flight = (props) => {
    const flight = props.flight;
    return (
        <li className="flight-item">
            <div className="flight-locations">
                <h3 className="flight-section-title">Destinations</h3>
                <div className="locations">
                    <div className="location location-from">
                        <p>
                            <span className="text-xs bold">FROM</span>
                            <span className="bold">
                                {flight.origin_country}
                            </span>
                        </p>
                        <div>
                            <ion-icon name="airplane"></ion-icon>
                        </div>
                    </div>
                    <div className="location location-to">
                        <p>
                            <span className="text-xs bold">TO</span>
                            <span className="bold">
                                {flight.destination_country}
                            </span>
                        </p>
                        <div>
                            <ion-icon name="airplane"></ion-icon>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flight-date">
                <h3 className="flight-section-title">Duration</h3>
                <div className="dates">
                    <div className="date">
                        <span className="text-xs bold">DEPARTURE</span>
                        <p>{flight.formatted_departure_date}</p>
                        <p>{flight.formatted_departure_time}</p>
                    </div>
                    <div className="date">
                        <span className="text-xs bold">LANDING</span>
                        <p>{flight.formatted_landing_date}</p>
                        <p>{flight.formatted_landing_time}</p>
                    </div>
                </div>
                <p className="flight-duration">
                    <ion-icon name="time"></ion-icon>
                    {flight.flight_duration}
                </p>
            </div>
            <div className="flight-footer">
                <div className="flight-company">
                    <div className="flight-company-img">
                        <img src={flight.airline_company_thumbnail} alt="Airline Company Thumbnail" />
                    </div>
                    <p>{flight.airline_company}</p>
                </div>
                <div className="flight-price">
                    <span className="price">${flight.price}</span>
                    <span>{flight.remaining_tickets} Tickets left</span>
                </div>
            </div>
            <div>
                <Link className="btn btn-xl btn-primary">Details</Link>
            </div>
        </li>
    );
};

export default Flight;
