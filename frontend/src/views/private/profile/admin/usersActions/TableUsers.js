import React from "react";

import { getUser } from "api/administratorsActions";
import ViewButton from "components/ViewButton";

const TableUsers = (props) => {
    const users = props.data;

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, idx) => {
                    return (
                        <tr key={`all-users-${idx}`}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>
                                {user.is_superuser ? (
                                    <span>&#128081;</span>
                                ) : (
                                    ""
                                )}
                                {user.user_role ? user.user_role : "----------"}
                            </td>
                            <td>
                                <ViewButton func={getUser} pk={user.id} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableUsers;
