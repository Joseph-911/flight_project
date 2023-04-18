import React, { useState } from "react";

import Tabs from "components/Tabs";
import AddAirlineUser from "./AddAirlineUser";
import AddAirline from "./AddAirline";

const FormsAirlineCombined = () => {
    const [currentTab, setcurrentTab] = useState("user-airline");

    const handleCurrentTab = (tab) => {
        setcurrentTab(tab);
    };

    return (
        <>
            <Tabs
                tabs={[
                    {
                        name: "Register Airline",
                        target: "user-airline",
                    },
                    { name: "Add Airline", target: "airline" },
                ]}
                currentTab={currentTab}
                handleCurrentTab={handleCurrentTab}
            />

            {currentTab === "user-airline" ? (
                <AddAirlineUser />
            ) : (
                <AddAirline />
            )}
        </>
    );
};

export default FormsAirlineCombined;
