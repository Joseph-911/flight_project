import React, { useContext, useEffect, useState } from "react";

import AuthContext from "context/AuthContext";
import { updateAirline } from "api/airlineActions";
import { handleInputChange } from "utils/HandleStates";
import { AirlineForm } from "components/Forms";

const UpdateAirline = () => {
    const { api } = useContext(AuthContext);
    const [airlineData, setAirlineData] = useState([]);

    const [formInputs, setFormInputs] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        updateAirline(api, "get", setAirlineData);
    }, [api]);

    useEffect(() => {
        const { country_id, name } = airlineData;
        setFormInputs({ country_id, name });
    }, [airlineData]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(formInputs);
    };

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
