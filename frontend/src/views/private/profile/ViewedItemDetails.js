import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import CountryItem from "components/CountryItem";

const ViewedItemDetails = (props) => {
    const [component, setComponent] = useState();

    useEffect(() => {
        switch (props.theTarget) {
            case "users":
                setComponent(<Avatar user={props.data} details={true} />);
                break;
            case "countries":
                setComponent(<CountryItem data={props.data} />);
                break;
            default:
                break;
        }
    }, [props.theTarget, props.data]);

    return <div>{component}</div>;
};

export default ViewedItemDetails;
