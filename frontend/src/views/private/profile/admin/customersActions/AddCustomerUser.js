import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";
import MessagesContext from "context/MessagesContext";
import { CustomerForm, RegisterForm } from "components/Forms";
import { handleImageInputChange, handleInputChange } from "utils/HandleStates";
import { addCustomer } from "api/administratorsActions";

const AddCustomerUser = () => {
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
        addCustomer(api, target, setError, setIsValid, formInputs)
    }

    useEffect(() => {
        if (isValid) {
            addMessage(isValid, 'success')
            navigate('/profile')
        }
    }, [navigate, addMessage, isValid])

    return (
        <div className="form-wrapper">
            <form method="post" encType="multipart/form-data" className="form" onSubmit={handleFormSubmit}>
                <h2 className="form-title">Register Customer</h2>

                <RegisterForm
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    handleInputChange={handleInputChange}
                    handleImageInputChange={handleImageInputChange}
                    error={error}
                />

                <CustomerForm
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
                    name="add-user-customer"
                />
            </form>
        </div>
    );
};

export default AddCustomerUser;
