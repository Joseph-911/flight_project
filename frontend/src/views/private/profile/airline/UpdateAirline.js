import React, { useContext, useEffect, useState } from "react";

import AuthContext from "context/AuthContext";
import MessagesContext from "context/MessagesContext";
import { updateAirline } from "api/airlineActions";
import { handleInputChange } from "utils/HandleStates";
import { AirlineForm } from "components/Forms";
import { useNavigate } from "react-router-dom";

const UpdateAirline = () => {
    const { api } = useContext(AuthContext);
    const { addMessage } = useContext(MessagesContext);
    const navigate = useNavigate();

    const [airlineData, setAirlineData] = useState([]);
    const [formInputs, setFormInputs] = useState({});
    const [error, setError] = useState(null);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        updateAirline(api, "get", setAirlineData, setError);
    }, [api]);

    useEffect(() => {
        const { country_id, name } = airlineData;
        setFormInputs({ country_id, name });
    }, [airlineData]);

    const handleFormSubmit = (e) => {
        console.log(formInputs);
        e.preventDefault();
        updateAirline(api, "put", setIsValid, setError, formInputs);
    };

    useEffect(() => {
        if (isValid) {
            addMessage(isValid, "success");
            navigate("/profile");
        }
    }, [isValid, addMessage, navigate]);

    return (
        <div className="form-wrapper">
            <form method="POST" className="form" onSubmit={handleFormSubmit}>
                <h2 className="form-title">Update Airline</h2>

                <AirlineForm
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

export default UpdateAirline;
