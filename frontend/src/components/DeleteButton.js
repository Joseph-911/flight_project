import React, { useState } from "react";

import Modal from "./Modal";

const DeleteButton = (props) => {
    const [modal, setModal] = useState();

    const handleButtonClicked = () => {
        setModal(true);
    };

    const handleCloseModal = () => {
        setModal(false);
    };

    return (
        <>
            <button
                className="btn btn-md btn-danger"
                onClick={handleButtonClicked}
            >
                Delete
            </button>

            {modal && (
                <Modal closeModal={handleCloseModal}>
                    <div className="form-wrapper">
                        <form className="form">
                            <div className="form-block">
                                <p>
                                    Are you sure you want to delete "
                                    {props.title}"?
                                </p>
                            </div>

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
