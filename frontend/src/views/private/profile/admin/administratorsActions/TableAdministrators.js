import React from "react";

import { getUser, removeAdministrator } from "api/administratorsActions";
import ViewButton from "components/ViewButton";
import DeleteButton from "components/DeleteButton";

const TableAdministrators = (props) => {
    const administrators = props.data;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Full name</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {administrators.map((administrator, idx) => {
                    return (
                        <tr key={`all-administrators-${idx}`}>
                            <td>{administrator.id}</td>
                            <td>
                                {administrator.is_superuser === "True" ? (
                                    <span>&#128081;</span>
                                ) : (
                                    ""
                                )}
                                {administrator.username}
                            </td>
                            <td>{administrator.full_name}</td>
                            <td>
                                <ViewButton
                                    func={getUser}
                                    pk={administrator.user_id}
                                    theTarget="users"
                                />
                            </td>
                            <td>
                                <DeleteButton
                                    title={administrator.full_name}
                                    btnSize="md"
                                    func={removeAdministrator}
                                    pk={administrator.id}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableAdministrators;
