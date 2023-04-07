import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";
import MessagesContext from "context/MessagesContext";
import { CountryForm } from "components/Forms";
import { handleInputChange, handleImageInputChange } from "utils/HandleStates";
import { addCountry } from "api/administratorsActions";

const AddCountry = () => {
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addCountry(api, target, setError, setIsValid, formInputs);
        
        setTimeout(() => {
            let suggestionsList = document.getElementById('suggestions-list');

            if (suggestionsList) {
                let suggestionsButtons = suggestionsList.querySelectorAll('span[role="button"]');

                suggestionsButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        let countryName = btn.getAttribute('value')
                        let nameInput = document.querySelector('input[name="name"]');
                        nameInput.value = countryName
                        setFormInputs((values) => ({ ...values, name: countryName }));
                    })
                });
            }
        }, 200);
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
                <CountryForm
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    handleInputChange={handleInputChange}
                    handleImageInputChange={handleImageInputChange}
                    error={error}
                />

                <input
                    type="submit"
                    className="btn btn-xl btn-primary"
                    value="Add"
                />
            </form>
        </div>
    );
};

export default AddCountry;
