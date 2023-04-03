import React, { useContext, useEffect, useState } from "react";

import AuthContext from "context/AuthContext";
import Modal from "./Modal";
import ViewedItemDetails from "views/private/profile/ViewedItemDetails";
import { useNavigate } from "react-router-dom";

const ViewButton = (props) => {
    const { api } = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleButtonClicked = () => {
        props.func(api, props.pk, setData, setError);
    };

    const handleCloseModal = () => {
        setData(null);
    };

    useEffect(() => {
        if (error) {
            navigate("/");
        }
    });

    return (
        <>
            <button
                className="btn btn-md btn-primary"
                onClick={handleButtonClicked}
            >
                View
            </button>
            {data && (
                <Modal closeModal={handleCloseModal}>
                    <ViewedItemDetails
                        data={data}
                        theTarget={props.theTarget}
                    />
                </Modal>
            )}
        </>
    );
};

export default ViewButton;
