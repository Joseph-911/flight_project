import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";
import MessagesContext from "context/MessagesContext";
import { AdministratorForm } from "components/Forms";
import { handleInputChange } from "utils/HandleStates";
import { addAdministrator } from "api/administratorsActions";

const AddAdministrator = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { target } = location.state;
    const { api } = useContext(AuthContext);
    const { addMessage } = useContext(MessagesContext);

    // Form status
    const [error, setError] = useState(null);
    const [isValid, setIsValid] = useState(false);

    // Form fields states
    const [formInputs, setFormInputs] = useState({});

    // Handle Form Submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        addAdministrator(api, target, setError, setIsValid, formInputs);
    };

    useEffect(() => {
        if (isValid) {
            addMessage(isValid, "success");
            navigate("/profile");
        }
    }, [isValid, addMessage, navigate]);

    return (
        <div className="form-wrapper">
            <form method="POST" className="form" onSubmit={handleFormSubmit}>
                <h2 className="form-title">Add Administrator</h2>

                <AdministratorForm
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    handleInputChange={handleInputChange}
                    error={error}
                    userSelect={true}
                />

                <input
                    type="submit"
                    value="Add"
                    className="btn btn-xl btn-primary"
                />
            </form>
        </div>
    );
};

export default AddAdministrator;
