import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";
import MessagesContext from "context/MessagesContext";
import { CustomerForm } from "components/Forms";
import { handleInputChange } from "utils/HandleStates";
import { addCustomer } from "api/administratorsActions";
import CreditCard from "components/CreditCard";

const AddCustomer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { target } = location.state;
    const { api } = useContext(AuthContext);
    const { addMessage } = useContext(MessagesContext);

    // Form fields errors
    const [error, setError] = useState(null);
    const [isValid, setIsValid] = useState(false);

    // Form fields states
    const [formInputs, setFormInputs] = useState({});

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addCustomer(api, target, setError, setIsValid, formInputs);
    };

    useEffect(() => {
        if(isValid) {
            addMessage(isValid, 'success')
            navigate('/profile')
        }
    }, [addMessage, navigate, isValid])

    return (
        <div className="form-wrapper">
            <form method="POST" className="form" onSubmit={handleFormSubmit}>
                <h2 className="form-title">Add Customer</h2>

                <CustomerForm
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    handleInputChange={handleInputChange}
                    error={error}
                    userSelect={true}
                />

                <div className="form-block">
                    <CreditCard formInputs={formInputs} />
                </div>

                <input
                    type="submit"
                    value="Add"
                    className="btn btn-xl btn-primary"
                    name="add-customer"
                />
            </form>
        </div>
    );
};

export default AddCustomer;
