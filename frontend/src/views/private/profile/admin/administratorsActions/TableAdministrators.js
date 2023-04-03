import React from "react";

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

export default TableAdministrators;
