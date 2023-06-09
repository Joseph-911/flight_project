import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";
import MessagesContext from "context/MessagesContext";
import { updateFlight } from "api/airlineActions";
import { handleInputChange } from "utils/HandleStates";
import { FlightForm } from "components/Forms";

const UpdateFlight = (props) => {
    const location = useLocation();
    const flightID = location.state.id;

    const { api } = useContext(AuthContext);
    const { addMessage } = useContext(MessagesContext);
    const navigate = useNavigate();

    const [flightData, setFlightData] = useState([]);
    const [formInputs, setFormInputs] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        updateFlight(api, "get", flightID, setFlightData, setError);
    }, [api, flightID]);

    useEffect(() => {
        if (flightData && flightData.length !== 0) {
            let {
                origin_country_id,
                destination_country_id,
                departure_time,
                landing_time,
                remaining_tickets,
                price,
            } = flightData;

            departure_time = departure_time.slice(0, 16);
            landing_time = landing_time.slice(0, 16);

            setFormInputs({
                origin_country_id,
                destination_country_id,
                departure_time,
                landing_time,
                remaining_tickets,
                price,
            });
        }
    }, [flightData]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateFlight(api, "put", flightID, setIsValid, setError, formInputs);
    };

    useEffect(() => {
        if (isValid) {
            addMessage(isValid, "success");
            navigate("/profile");
        }
    }, [addMessage, isValid, navigate]);

    return (
        <div className="form-wrapper">
            <form method="PUT" className="form" onSubmit={handleFormSubmit}>
                <h2 className="form-title">Update Flight</h2>
                <FlightForm
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    handleInputChange={handleInputChange}
                    error={error}
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

export default UpdateFlight;
