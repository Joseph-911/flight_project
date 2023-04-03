import React from "react";

import { getUser } from "api/administratorsActions";
import ViewButton from "components/ViewButton";

const TableAirlines = (props) => {
    const airlines = props.data;

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Country</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {airlines.map((airline, idx) => {
                    return (
                        <tr key={`all-airlines-${idx}`}>
                            <td>{airline.id}</td>
                            <td>{airline.username}</td>
                            <td>{airline.name}</td>
                            <td>{airline.country_name}</td>
                            <td>
                                <ViewButton
                                    func={getUser}
                                    pk={airline.user_id}
                                    theTarget="users"
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableAirlines;
