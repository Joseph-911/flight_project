import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AuthContext from "context/AuthContext";
import MessagesContext from "context/MessagesContext";
import CreditCard from "components/CreditCard";
import { addTicket } from "api/customerActions";

const FlightBookingView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { api } = useContext(AuthContext);
    const { addMessage } = useContext(MessagesContext);

    const [error, setError] = useState(null);
    const [noFlight, setNoFlight] = useState(null);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [data, setData] = useState([]);
    let [formInputs, setFormInputs] = useState({});

    useEffect(() => {
        addTicket(
            api,
            id,
            "get",
            setPermissionDenied,
            setNoFlight,
            setData,
            setError,
            setIsValid
        );
    }, [api, id]);

    useEffect(() => {
        if (permissionDenied) {
            addMessage(`Opps! ${permissionDenied}`, "error");
            navigate(-1);
        }
    }, [navigate, permissionDenied, addMessage]);

    useEffect(() => {
        if (data.length !== 0) {
            let { first_name, last_name, credit_card_no } = data.customer;
            setFormInputs((values) => ({
                ...values,
                first_name: first_name,
                last_name: last_name,
                credit_card_no: credit_card_no,
            }));
        }
    }, [data]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addTicket(
            api,
            id,
            "post",
            setPermissionDenied,
            setNoFlight,
            setData,
            setError,
            setIsValid
        );
    };

    useEffect(() => {
        if (isValid) {
            addMessage(isValid, "success");
            navigate("/profile");
        }
    }, [isValid, navigate, addMessage]);

    return (
        <>
            {noFlight ? (
                <p>{noFlight}</p>
            ) : (
                <div className="form-wrapper">
                    <form
                        method="POST"
                        className="form"
                        onSubmit={handleFormSubmit}
                    >
                        <h2 className="form-title">Buy Ticket</h2>

                        {data.length !== 0 && (
                            <div className="form-block">
                                <p>
                                    <span className="bold">Destinations: </span>
                                    {data.flight.from_to}
                                </p>
                                <p>
                                    <span className="bold">
                                        Departure Time:
                                    </span>
                                    {data.flight.formatted_departure_datetime}
                                </p>
                                <p>
                                    <span className="bold">Landing Time: </span>
                                    {data.flight.formatted_landing_datetime}
                                </p>
                                <p>
                                    <span className="bold">Price: </span>$
                                    {data.flight.price}
                                </p>
                            </div>
                        )}

                        <div className="form-block">
                            <CreditCard formInputs={formInputs} />
                        </div>

                        {error && (
                            <div className="form-block">
                                <div className="field-errors">
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}

                        <input
                            type="submit"
                            className="btn btn-xl btn-primary"
                            value="Confirm"
                        />
                    </form>
                </div>
            )}
        </>
    );
};

export default FlightBookingView;
