import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";
import MessagesContext from "context/MessagesContext";
import Modal from "./Modal";

const DeleteButton = (props) => {
    const { api } = useContext(AuthContext);
    const { addMessage } = useContext(MessagesContext);
    const navigate = useNavigate();
    const [modal, setModal] = useState();
    const [error, setError] = useState(null);
    const [isValid, setIsValid] = useState();

    const handleButtonClicked = () => {
        setModal(true);
    };

    const handleCloseModal = () => {
        setModal(false);
        setError(null);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        props.func(api, props.pk, setIsValid, setError);
    };

    useEffect(() => {
        if (isValid) {
            addMessage(isValid, "info");
            navigate("/profile");
        }
    }, [navigate, isValid, addMessage]);

    return (
        <>
            <button
                className={`btn btn-danger btn-${props.btnSize}`}
                onClick={handleButtonClicked}
            >
                Delete
            </button>

            {modal && (
                <Modal closeModal={handleCloseModal}>
                    <div className="form-wrapper">
                        <form className="form" onSubmit={handleFormSubmit}>
                            <div className="form-block">
                                <p>
                                    Are you sure you want to delete "
                                    {props.title}"?
                                </p>
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
                                className="btn btn-md btn-danger"
                                value="Delete"
                            />
                        </form>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default DeleteButton;
