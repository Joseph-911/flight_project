import React, { useEffect } from "react";

const AllUsersView = () => {
    useEffect(() => {}, []);

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
            <tbody></tbody>
        </table>
    );
};

export default AllUsersView;
