import React, { useEffect } from "react";

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
        <div className="messages-wrapper">
            <div className={`banner-alert message-${props.level}`}>
                <p className="message">{props.message}</p>
                <span className="counter"></span>
            </div>
        </div>
    );
};

export default Message;
