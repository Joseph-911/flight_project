import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";
import MessagesContext from "context/MessagesContext";
import { AirlineForm, RegisterForm } from "components/Forms";
import { handleImageInputChange, handleInputChange } from "utils/HandleStates";
import { addAirline } from "api/administratorsActions";

const AddAirlineUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { target } = location.state;
    const { api } = useContext(AuthContext);
    const { addMessage } = useContext(MessagesContext);

    // Form fields errors
    const [error, setError] = useState(null);
    const [isValid, setIsValid] = useState(false);

    // // Form fields states
    const [formInputs, setFormInputs] = useState({});

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addAirline(api, target, setError, setIsValid, formInputs);
    };

    useEffect(() => {
        if (isValid) {
            addMessage(isValid, "success");
            navigate("/profile");
        }
    }, [isValid, addMessage, navigate]);

    return (
        <div className="form-wrapper">
            <form
                method="POST"
                encType="multipart/form-data"
                className="form"
                onSubmit={handleFormSubmit}
            >
                <h2 className="form-title">Register Airline</h2>

                <RegisterForm
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    handleInputChange={handleInputChange}
                    handleImageInputChange={handleImageInputChange}
                    error={error}
                />

                <AirlineForm
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    handleInputChange={handleInputChange}
                    error={error}
                    userSelect={false}
                />

                <input
                    type="submit"
                    value="Register"
                    className="btn btn-xl btn-primary"
                />
            </form>
        </div>
    );
};

export default AddAirlineUser;
