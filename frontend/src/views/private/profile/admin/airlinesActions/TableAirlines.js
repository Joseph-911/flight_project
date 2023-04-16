import React from "react";

import { getUser, removeAirline } from "api/administratorsActions";
import ViewButton from "components/ViewButton";
import DeleteButton from "components/DeleteButton";

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
                            <td>
                                <DeleteButton
                                    title={airline.name}
                                    btnSize="md"
                                    func={removeAirline}
                                    pk={airline.id}
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
