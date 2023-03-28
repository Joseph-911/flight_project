import React from "react";
import { Link } from "react-router-dom";

const ActionsList = (props) => {
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
                                        <Link
                                            to={`${props.actionPath}${item.link}`}
                                        >
                                            <span className="icon">
                                                <ion-icon
                                                    name={item.icon}
                                                ></ion-icon>
                                            </span>
                                            <span className="text">
                                                {item.title}
                                            </span>
                                        </Link>
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
