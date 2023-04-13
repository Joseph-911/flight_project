import DeleteButton from "components/DeleteButton";
import React from "react";

const TableTickets = (props) => {
    const tickets = props.data;
    return (
        <table className="table">
            <thead>
                <tr>
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
                            <td>{ticket.flight.from_to}</td>
                            <td>{ticket.flight.airline_company_id}</td>
                            <td>
                                {ticket.flight.formatted_departure_datetime}
                            </td>
                            <td>{ticket.flight.formatted_landing_datetime}</td>
                            <td>{ticket.flight.flight_duration}</td>
                            <td>${ticket.flight.price}</td>
                            <td>
                                <DeleteButton title={`Flight`} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableTickets;
