import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";
import MessagesContext from "context/MessagesContext";
import { AirlineForm } from "components/Forms";
import { handleInputChange } from "utils/HandleStates";
import { addAirline } from "api/administratorsActions";

const AddAirline = () => {
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
        addAirline(api, target, setError, setIsValid, formInputs);
    };

    useEffect(() => {
        if (isValid) {
            addMessage("Airline company added successfully", "success");
            navigate("/profile");
        }
    }, [isValid, addMessage, navigate]);

    return (
        <div className="form-wrapper">
            <form method="POST" className="form" onSubmit={handleFormSubmit}>
                <h2 className="form-title">Add Airline</h2>

                <AirlineForm
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
                    name="add-airline"
                />
            </form>
        </div>
    );
};

export default AddAirline;
