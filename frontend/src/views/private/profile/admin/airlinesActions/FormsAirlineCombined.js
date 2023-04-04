import Tabs from "components/Tabs";
import React, { useState } from "react";
import AddAirlineUser from "./AddAirlineUser";
import AddAirline from "./AddAirline";

const FormsAirlineCombined = () => {
    const [currentForm, setCurrentForm] = useState("user-airline");

    const handleCurrentForm = (form) => {
        setCurrentForm(form);
    };

    return (
        <>
            <Tabs
                withUser="user-airline"
                withoutUser="airline"
                withUserTitle="Register Airline"
                withoutUserTitle="Add Airline"
                currentForm={currentForm}
                handleCurrentForm={handleCurrentForm}
            />

            {currentForm === "user-airline" ? (
                <AddAirlineUser />
            ) : (
                <AddAirline />
            )}
        </>
    );
};

export default FormsAirlineCombined;
