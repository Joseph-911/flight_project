import React, { useContext, useEffect, useState } from "react";

import AuthContext from "context/AuthContext";
import MessagesContext from "context/MessagesContext";
import { updateCustomer } from "api/customerActions";
import { handleInputChange } from "utils/HandleStates";
import { CustomerForm } from "components/Forms";
import { useNavigate } from "react-router-dom";

const UpdateCustomer = () => {
    const { api } = useContext(AuthContext);
    const { addMessage } = useContext(MessagesContext);
    const navigate = useNavigate();

    const [customerData, setCustomerData] = useState([]);
    const [formInputs, setFormInputs] = useState({});
    const [error, setError] = useState(null);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        updateCustomer(api, "get", setCustomerData, setError);
    }, [api]);

    useEffect(() => {
        const { first_name, last_name, address, credit_card_no, phone_no } =
            customerData;

        setFormInputs({
            first_name,
            last_name,
            address,
            credit_card_no,
            phone_no,
        });
    }, [customerData]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateCustomer(api, "put", setIsValid, setError, formInputs);
    };

    useEffect(() => {
        if (isValid) {
            addMessage(isValid, "success");
            navigate("/profile");
        }
    }, [isValid, addMessage, navigate]);

    return (
        <div className="form-wrapper">
            <form method="PUT" className="form" onSubmit={handleFormSubmit}>
                <h2 className="form-title">Update Customer</h2>

                <CustomerForm
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    handleInputChange={handleInputChange}
                    error={error}
                    userSelect={false}
                />

                <input
                    type="submit"
                    value="Update"
                    className="btn btn-xl btn-primary"
                />
            </form>
        </div>
    );
};

export default UpdateCustomer;
