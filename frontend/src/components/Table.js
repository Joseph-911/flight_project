import React, { useEffect, useState } from "react";
import TableAdministrators from "views/private/profile/admin/administratorsActions/TableAdministrators";
import TableAirlines from "views/private/profile/admin/airlinesActions/TableAirlines";
import TableCountries from "views/private/profile/admin/countriesActions/TableCountries";
import TableCustomers from "views/private/profile/admin/customersActions/TableCustomers";
import TableUsers from "views/private/profile/admin/usersActions/TableUsers";
import TableFlights from "views/private/profile/airline/flightsActions/TableFlights";

const Table = (props) => {
    const [component, setComponent] = useState();

    useEffect(() => {
        switch (props.dataName) {
            case "users":
                setComponent(<TableUsers data={props.data} />);
                break;
            case "airlines":
                setComponent(<TableAirlines data={props.data} />);
                break;
            case "countries":
                setComponent(<TableCountries data={props.data} />);
                break;
            case "customers":
                setComponent(<TableCustomers data={props.data} />);
                break;
            case "administrators":
                setComponent(<TableAdministrators data={props.data} />);
                break;
            case "flights":
                setComponent(<TableFlights data={props.data} />);
                break;
            default:
                break;
        }
    }, [props.dataName, props.data]);

    return <>{component}</>;
};

export default Table;
