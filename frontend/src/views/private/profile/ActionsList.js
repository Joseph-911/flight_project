import React from "react";
import { useNavigate } from "react-router-dom";

const ActionsList = (props) => {
    const navigate = useNavigate();

    const handleChangeRoute = (link, target) => {
        navigate(`${props.actionPath}${link}`, {
            state: { target: target, sender: props.sender },
        });
    };

    return (
        <ul className="actions-list">
            {props.actionsList.map((action, idx) => {
                return (
                    <li key={`actions-list-item-${idx}`}>
                        <h2>{action.title}</h2>
                        <ul>
                            {action.actions.map((item, idx) => {
                                return (
                                    <li key={`action-item-${idx}`}>
                                        <button
                                            onClick={() => {
                                                handleChangeRoute(
                                                    item.link,
                                                    action.target
                                                );
                                            }}
                                        >
                                            <span className="icon">
                                                <ion-icon
                                                    name={item.icon}
                                                ></ion-icon>
                                            </span>
                                            <span className="text">
                                                {item.title}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                );
            })}
        </ul>
    );
};

export default ActionsList;
