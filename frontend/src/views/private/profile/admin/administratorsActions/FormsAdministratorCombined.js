import React, { useState } from "react";

import Tabs from "components/Tabs";
import AddAdministratorUser from "./AddAdministratorUser";
import AddAdministrator from "./AddAdministrator";

const FormsAdministratorCombined = () => {
    const [currentForm, setCurrentForm] = useState("user-administrator");

    const handleCurrentForm = (form) => {
        setCurrentForm(form);
    };

    return (
        <>
            <Tabs
                withUser="user-administrator"
                withoutUser="administrator"
                withUserTitle="Register Administrator"
                withoutUserTitle="Add Administrator"
                currentForm={currentForm}
                handleCurrentForm={handleCurrentForm}
            />

            {currentForm === "user-administrator" ? (
                <AddAdministratorUser />
            ) : (
                <AddAdministrator />
            )}
        </>
    );
};

export default FormsAdministratorCombined;
