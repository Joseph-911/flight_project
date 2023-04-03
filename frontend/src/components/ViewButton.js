import React, { useContext, useEffect, useState } from "react";

import AuthContext from "context/AuthContext";
import Modal from "./Modal";
import Avatar from "views/private/profile/Avatar";

const ViewButton = (props) => {
    const { api } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [error, setError] = useState([]);

    const handleButtonClicked = () => {
        props.func(api, props.pk, setData, setError);
    };

    const handleCloseModal = () => {
        setData(null);
    };

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
                    <Avatar user={data} details={true} />
                </Modal>
            )}
        </>
    );
};

export default ViewButton;
