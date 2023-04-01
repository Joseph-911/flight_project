import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useRef,
} from "react";
import ReactDOM from "react-dom";

const MessagesContext = createContext();

export const MessagesProvider = (props) => {
    const [message, setMessage] = useState(null);
    const messageRef = useRef();

    const addMessage = useCallback((content, level) => {
        setMessage(null);
        setTimeout(() => {
            const newMessage = { content, level };
            setMessage(newMessage);
        }, 100);
    }, []);

    const closeMessage = () => {
        messageRef.current.classList.add("deactive");
        setTimeout(() => {
            setMessage(null);
        }, 200);
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [message, addMessage]);

    const messagesContextData = {
        addMessage,
    };

    return (
        <MessagesContext.Provider value={messagesContextData}>
            {props.children}
            {message &&
                ReactDOM.createPortal(
                    <div className="messages-wrapper">
                        <div
                            className={`banner-alert message-${message.level}`}
                            ref={messageRef}
                        >
                            <p className="message">{message.content}</p>
                            <span className="counter"></span>
                            <span
                                className="close"
                                role="button"
                                onClick={closeMessage}
                            >
                                <ion-icon name="close"></ion-icon>
                            </span>
                        </div>
                    </div>,
                    document.getElementById("messages")
                )}
        </MessagesContext.Provider>
    );
};

export default MessagesContext;
