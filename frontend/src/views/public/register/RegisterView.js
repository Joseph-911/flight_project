import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "context/AuthContext";
import { RegisterForm } from "components/Forms";
import { handleImageInputChange, handleInputChange } from "utils/HandleStates";

const RegisterView = () => {
    const { api, userLogin } = useContext(AuthContext);

    // Form fields errors
    const [error, setError] = useState(null);

    // Form fields
    const [formInputs, setFormInputs] = useState({});

    // Handle form submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post("register/", formInputs, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (data) {
                await userLogin(formInputs.username, formInputs.password1);
            }
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
                <h2 className="form-title">Join Us!</h2>

                <RegisterForm
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    handleInputChange={handleInputChange}
                    handleImageInputChange={handleImageInputChange}
                    error={error}
                />

                <div className="form-footer">
                    <p>
                        Do you have an account? <Link to="/login">Login</Link>
                    </p>
                </div>

                <input
                    type="submit"
                    value="Sign up"
                    className="btn btn-xl btn-primary"
                />
            </form>
        </div>
    );
};

export default RegisterView;
