import { getCountry, removeCountry } from "api/administratorsActions";
import DeleteButton from "components/DeleteButton";
import ViewButton from "components/ViewButton";
import React from "react";

const TableCountries = (props) => {
    const countries = props.data;

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th></th>
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
                                <ViewButton
                                    func={getCountry}
                                    pk={country.id}
                                    theTarget="countries"
                                />
                            </td>
                            <td>
                                <DeleteButton
                                    title={country.name}
                                    btnSize="md"
                                    func={removeCountry}
                                    pk={country.id}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableCountries;
