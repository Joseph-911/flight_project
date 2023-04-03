import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
    return <div onClick={props.closeModal} className="backdrop"></div>;
};

const ModalOverlay = (props) => {
    return (
        <div className="modal">
            <div className="modal-header">
                <button onClick={props.closeModal}>
                    <ion-icon name="close"></ion-icon>
                </button>
            </div>
            <div className="modal-content">{props.children}</div>
        </div>
    );
};

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop closeModal={props.closeModal} />,
                document.getElementById("backdrop")
            )}

            {ReactDOM.createPortal(
                <ModalOverlay
                    children={props.children}
                    closeModal={props.closeModal}
                />,
                document.getElementById("modal")
            )}
        </>
    );
};

export default Modal;
