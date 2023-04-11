import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";
// import MessagesContext from "context/MessagesContext";
import { updateFlight } from "api/airlineActions";
import { handleInputChange } from "utils/HandleStates";
import { FlightForm } from "components/Forms";

const UpdateFlight = (props) => {
    const location = useLocation();
    const flightID = location.state.id;

    const { api } = useContext(AuthContext);
    // const { addMessage } = useContext(MessagesContext);
    // const navigate = useNavigate();

    const [flightData, setFlightData] = useState([]);
    const [formInputs, setFormInputs] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        updateFlight(api, "get", flightID, setFlightData, setError);
    }, [api, flightID]);

    useEffect(() => {
        if (flightData && flightData.length !== 0) {
            console.log("YES");
            let {
                origin_country_id,
                destination_country_id,
                departure_time,
                landing_time,
                remaining_tickets,
                price,
            } = flightData;

            console.log(flightData);
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
        // console.log(departure_time);

        // const formattedDatetime1 = datetime1.toISOString().slice(0, 16);
        // const formattedDatetime2 = datetime2.toISOString().slice(0, 16);
        // console.log(flightData);
    }, [flightData]);

    // useEffect(() => {
    //     console.log(formInputs);
    // }, [formInputs]);

    return (
        <div className="form-wrapper">
            <div className="form">
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
            </div>
        </div>
    );
};

export default UpdateFlight;
