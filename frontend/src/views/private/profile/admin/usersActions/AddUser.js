import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";
import MessagesContext from "context/MessagesContext";

import { RegisterForm } from "components/Forms";
import { handleInputChange, handleImageInputChange } from "utils/HandleStates";

const AddUser = () => {
    const { api } = useContext(AuthContext);
    const { addMessage } = useContext(MessagesContext);

    // Form fields errors
    const [error, setError] = useState(null);

    // Form fields states
    const [formInputs, setFormInputs] = useState({});

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post("register/", formInputs, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (data) {
                addMessage("User added successfully", "success");
                navigate("/profile");
            }

            setError(null);
        } catch (error) {
            setError(error.response.data);
        }
    };

    return (
        <div className="form-wrapper">
            <form
                method="POST"
                encType="multipart/form-data"
                className="form"
                onSubmit={handleFormSubmit}
            >
                <h2 className="form-title">Add New User</h2>

                <RegisterForm
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

export default AddUser;
