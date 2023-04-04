import React, { useState } from "react";
import AddCustomerUser from "./AddCustomerUser";
import AddCustomer from "./AddCustomer";
import Tabs from "components/Tabs";

const FormsCustomerCombined = () => {
    const [currentForm, setCurrentForm] = useState("user-customer");

    const handleCurrentForm = (form) => {
        setCurrentForm(form);
    };

    return (
        <>
            <Tabs
                withUser="user-customer"
                withoutUser="customer"
                withUserTitle="Register Customer"
                withoutUserTitle="Add Customer"
                currentForm={currentForm}
                handleCurrentForm={handleCurrentForm}
            />

            {currentForm === "user-customer" ? (
                <AddCustomerUser />
            ) : (
                <AddCustomer />
            )}
        </>
    );
};

export default FormsCustomerCombined;
