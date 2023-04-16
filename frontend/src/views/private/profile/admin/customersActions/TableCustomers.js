import React from "react";

import { getUser, removeCustomer } from "api/administratorsActions";
import ViewButton from "components/ViewButton";
import DeleteButton from "components/DeleteButton";

const TableCustomers = (props) => {
    const customers = props.data;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Full name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Credit Card</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer, idx) => {
                    return (
                        <tr key={`all-customers-${idx}`}>
                            <td>{customer.id}</td>
                            <td>{customer.username}</td>
                            <td>{customer.full_name}</td>
                            <td>{customer.address}</td>
                            <td>
                                {customer.phone_no.slice(0, 3)}-
                                {customer.phone_no.slice(3, 6)}-
                                {customer.phone_no.slice(6)}
                            </td>
                            <td>
                                {customer.credit_card_no.slice(0, 4)}
                                {" ****".repeat(3)}
                            </td>
                            <td>
                                <ViewButton
                                    func={getUser}
                                    pk={customer.user_id}
                                    theTarget="users"
                                />
                            </td>
                            <td>
                                <DeleteButton
                                    title={customer.full_name}
                                    btnSize="md"
                                    func={removeCustomer}
                                    pk={customer.id}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableCustomers;
