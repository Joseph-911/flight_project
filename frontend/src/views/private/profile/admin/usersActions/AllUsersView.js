import React, { useContext, useEffect, useState } from "react";

import PageTitle from "components/PageTitle";
import Page403 from "components/Page403";
import { getAllUsers } from "api/administratorActions";
import TableUsers from "./TableUsers";
import { SearchForm } from "components/Forms";
import AuthContext from "context/AuthContext";

const AllUsersView = () => {
    const { api } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getAllUsers(api, setUsers, setError, setLoading);
    }, [api]);

    const handleSearch = (e) => {
        e.preventDefault();
        getAllUsers(api, setUsers, setError, setLoading, searchQuery);
    };

    return (
        <>
            {error ? (
                <Page403 />
            ) : loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <PageTitle title="All Users" />
                    <SearchForm
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleSearch={handleSearch}
                    />
                    {users.length !== 0 ? (
                        <TableUsers users={users} />
                    ) : (
                        <p>No users found!</p>
                    )}
                </>
            )}
        </>
    );
};

export default AllUsersView;
