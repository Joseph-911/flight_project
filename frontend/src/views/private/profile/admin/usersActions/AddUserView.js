import React, { useContext, useState } from "react";

import AuthContext from "context/AuthContext";
// import { RegisterForm } from "components/Forms";

const AddUserView = () => {
    const { api } = useContext(AuthContext);

    // Form fields errors
    const [error, setError] = useState(null);

    // Form fields states
    const [formInputs, setFormInputs] = useState({});

    const handleFormSubmit = async (e) => {
        e.preventDefault();
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

                <input
                    type="submit"
                    className="btn btn-xl btn-primary"
                    value="Add"
                />
            </form>
        </div>
    );
};

export default AddUserView;
