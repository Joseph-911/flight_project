import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";
import MessagesContext from "context/MessagesContext";
import { CustomerForm } from "components/Forms";
import { handleInputChange } from "utils/HandleStates";
import CreditCard from "components/CreditCard";
import { createCustomer } from "api/userActions";

const CreateCutomerView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { api } = useContext(AuthContext);
    const { addMessage } = useContext(MessagesContext);

    // Form status
    const [error, setError] = useState(null);
    const [isValid, setIsValid] = useState(false);

    // Form fields states
    const [formInputs, setFormInputs] = useState({});

    useEffect(() => {
        if (!location.state) {
            navigate("/");
        }
    }, [navigate, location]);

    // Handle Form Submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        createCustomer(api, setIsValid, setError, formInputs);
    };

    useEffect(() => {
        if (isValid) {
            addMessage(isValid, "success");
            navigate(-1);
        }
    }, [navigate, addMessage, isValid]);

    return (
        <div className="form-wrapper">
            <form method="POST" className="form" onSubmit={handleFormSubmit}>
                <h2 className="form-title">Create Customer</h2>

                <CustomerForm
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    handleInputChange={handleInputChange}
                    error={error}
                    userSelect={false}
                />

                <div className="form-block">
                    <CreditCard formInputs={formInputs} />
                </div>

                <input
                    type="submit"
                    value="Create"
                    className="btn btn-xl btn-primary"
                />
            </form>
        </div>
    );
};

export default CreateCutomerView;
