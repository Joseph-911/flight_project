import React, { useContext, useEffect, useState } from "react";

import PageTitle from "components/PageTitle";
import Page403 from "components/Page403";
import { getAllData } from "api/rolesActions";
import { SearchForm } from "components/Forms";
import AuthContext from "context/AuthContext";
import Table from "components/Table";

const ViewAllData = (props) => {
    const { api } = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getAllData(
            props.sender,
            props.dataName,
            api,
            setData,
            setError,
            setLoading
        );
    }, [api, props.dataName, props.sender]);

    const handleSearch = (e) => {
        e.preventDefault();
        getAllData(
            props.sender,
            props.dataName,
            api,
            setData,
            setError,
            setLoading,
            searchQuery
        );
    };

    return (
        <>
            {error ? (
                <Page403 />
            ) : loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <PageTitle
                        title={`All ${
                            props.dataName.charAt(0).toUpperCase() +
                            props.dataName.slice(1)
                        }`}
                    />
                    {props.isForm ? (
                        <SearchForm
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            handleSearch={handleSearch}
                            placeholder={
                                props.dataName === "countries"
                                    ? "Enter country name"
                                    : "Enter username"
                            }
                        />
                    ) : (
                        " "
                    )}
                    {data.length !== 0 ? (
                        <Table data={data} dataName={props.dataName} />
                    ) : (
                        <p>No {props.dataName} found!</p>
                    )}
                </>
            )}
        </>
    );
};

export default ViewAllData;
