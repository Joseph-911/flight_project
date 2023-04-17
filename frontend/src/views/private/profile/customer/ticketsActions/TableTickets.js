import React from "react";

import { removeTicket } from "api/customerActions";
import DeleteButton from "components/DeleteButton";

const TableTickets = (props) => {
    const tickets = props.data;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>From - To</th>
                    <th>Airline Company</th>
                    <th>Departure Time</th>
                    <th>Landing Time</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tickets.map((ticket, idx) => {
                    return (
                        <tr key={`customer-ticket-${idx}`}>
                            <td>{ticket.id}</td>
                            <td>{ticket.flight.from_to}</td>
                            <td>{ticket.flight.airline_company_id}</td>
                            <td>
                                {ticket.flight.formatted_departure_datetime}
                            </td>
                            <td>{ticket.flight.formatted_landing_datetime}</td>
                            <td>{ticket.flight.flight_duration}</td>
                            <td>${ticket.flight.price}</td>
                            <td>
                                <DeleteButton
                                    btnSize="md"
                                    title={`ticket - ${ticket.flight.from_to}`}
                                    func={removeTicket}
                                    pk={ticket.id}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableTickets;
