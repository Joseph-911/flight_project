import React, { useState } from "react";

import Tabs from "components/Tabs";
import AddAdministratorUser from "./AddAdministratorUser";
import AddAdministrator from "./AddAdministrator";

const FormsAdministratorCombined = () => {
    const [currentTab, setcurrentTab] = useState("user-administrator");

    const handleCurrentTab = (tab) => {
        setcurrentTab(tab);
    };

    return (
        <>
            <Tabs
                tabs={[
                    {
                        name: "Register Administrator",
                        target: "user-administrator",
                    },
                    { name: "Add Administrator", target: "administrator" },
                ]}
                currentTab={currentTab}
                handleCurrentTab={handleCurrentTab}
            />

            {currentTab === "user-administrator" ? (
                <AddAdministratorUser />
            ) : (
                <AddAdministrator />
            )}
        </>
    );
};

export default FormsAdministratorCombined;
