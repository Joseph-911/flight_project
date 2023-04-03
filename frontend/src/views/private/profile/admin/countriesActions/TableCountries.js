import React, { useEffect } from "react";

const TableCountries = (props) => {
    const countries = props.data;

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {countries.map((country, idx) => {
                    return (
                        <tr key={`all-countries-${idx}`}>
                            <td>{country.id}</td>
                            <td>{country.name}</td>
                            <td>
                                <button className="btn btn-md btn-primary">
                                    View
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableCountries;
