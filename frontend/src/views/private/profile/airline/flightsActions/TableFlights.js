import DeleteButton from "components/DeleteButton";
import { useNavigate } from "react-router-dom";

import React from "react";

const TableFlights = (props) => {
    const navigate = useNavigate();

    const handleRouteChange = (id) => {
        navigate("/profile/edit", {
            state: { target: "flight", id: id },
        });
    };

    const flights = props.data;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>From - To</th>
                    <th>Departure Time</th>
                    <th>Landing Time</th>
                    <th>Flight Duration</th>
                    <th>Price</th>
                    <th>Tickets - Total</th>
                    <th>Tickets - Sold</th>
                    <th>Tickets - Remaining</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {flights.map((flight, idx) => {
                    return (
                        <tr key={`company-all-flight-${idx}`}>
                            <td>{flight.id}</td>
                            <td>{flight.from_to}</td>
                            <td>{flight.formatted_departure_datetime}</td>
                            <td>{flight.formatted_landing_datetime}</td>
                            <td>{flight.flight_duration}</td>
                            <td>${flight.price}</td>
                            <td>
                                {flight.tickets_sold + flight.remaining_tickets}
                            </td>
                            <td>{flight.tickets_sold}</td>
                            <td>{flight.remaining_tickets}</td>
                            <td>
                                <button
                                    onClick={() => handleRouteChange(flight.id)}
                                    className="btn btn-sm btn-primary"
                                >
                                    Edit
                                </button>
                                <DeleteButton
                                    title={`${flight.from_to} flight`}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableFlights;
