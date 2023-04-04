// import React, { useContext, useState } from "react";

// import AuthContext from "context/AuthContext";
// import MessagesContext from "context/MessagesContext";
// import { CustomerForm } from "components/Forms";
// import { handleInputChange } from "utils/HandleStates";

const AddCustomer = () => {
    // const { api } = useContext(AuthContext);
    // const { addMessage } = useContext(MessagesContext);

    // Form fields errors
    // const [error, setError] = useState(null);

    // Form fields states
    // const [formInputs, setFormInputs] = useState({});

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="form-wrapper">
            <form method="POST" className="form" onSubmit={handleFormSubmit}>
                <h2 className="form-title">Add Customer</h2>

                {/* <CustomerForm
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    handleInputChange={handleInputChange}
                    error={error}
                    userSelect={true}
                /> */}

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
