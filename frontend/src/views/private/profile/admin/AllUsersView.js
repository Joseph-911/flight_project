import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PageTitle from "components/PageTitle";
import { getAllUsers } from "api/administratorActions";
import Page403 from "components/Page403";

const AllUsersView = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers("users/");
                if (data) {
                    setUsers(data);
                }
                setLoading(false);
            } catch (error) {
                if (error.response.status === 403) {
                    setError(true);
                }
            }
        };
        fetchUsers();
    }, [navigate]);

    return (
        <>
            {error ? (
                <Page403 />
            ) : loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <PageTitle title="All Users" />
                    {users.length !== 0 ? (
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
                                                {user.user_role
                                                    ? user.user_role
                                                    : "----------"}
                                            </td>
                                            <td>
                                                <Link
                                                    to="/"
                                                    className="btn btn-md btn-primary"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p>No users found!</p>
                    )}
                </>
            )}
        </>
    );
};

export default AllUsersView;
