import React, { useState } from "react";
import AddCustomerUser from "./AddCustomerUser";
import AddCustomer from "./AddCustomer";
import Tabs from "components/Tabs";

const FormsCustomerCombined = () => {
    const [currentTab, setcurrentTab] = useState("user-customer");

    const handleCurrentTab = (tab) => {
        setcurrentTab(tab);
    };

    return (
        <>
            <Tabs
                tabs={[
                    {
                        name: "Register Customer",
                        target: "user-customer",
                    },
                    { name: "Add Customer", target: "customer" },
                ]}
                currentTab={currentTab}
                handleCurrentTab={handleCurrentTab}
            />

            {currentTab === "user-customer" ? (
                <AddCustomerUser />
            ) : (
                <AddCustomer />
            )}
        </>
    );
};

export default FormsCustomerCombined;
