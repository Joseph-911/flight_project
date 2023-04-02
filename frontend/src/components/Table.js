import React, { useEffect, useState } from "react";
import TableUsers from "views/private/profile/admin/usersActions/TableUsers";

const Table = (props) => {
    const [component, setComponent] = useState();

    useEffect(() => {
        if (props.dataName === "users") {
            setComponent(<TableUsers users={props.data} />);
        }
    }, [props.dataName, props.data]);

    return <>{component}</>;
};

export default Table;
