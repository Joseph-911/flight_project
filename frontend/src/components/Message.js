import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Message = (props) => {
    const setState = props.setState;
    const message = props.message;

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setState(null);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [setState, message]);

    return (
        <>
            {ReactDOM.createPortal(
                <div className="messages-wrapper">
                    <div className={`banner-alert message-${props.level}`}>
                        <p className="message">{props.message}</p>
                        <span className="counter"></span>
                    </div>
                </div>,
                document.getElementById("messages")
            )}
        </>
    );
};

export default Message;
