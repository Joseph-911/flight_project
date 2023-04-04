import React from "react";

const Tabs = (props) => {
    return (
        <div className="tab-btns">
            <button
                className={`btn btn-md ${
                    props.currentForm === props.withUser
                        ? "btn-primary"
                        : "btn-primary-outline"
                }`}
                onClick={() => props.handleCurrentForm(props.withUser)}
            >
                {props.withUserTitle}
            </button>

            <button
                className={`btn btn-md ${
                    props.currentForm === props.withoutUser
                        ? "btn-primary"
                        : "btn-primary-outline"
                }`}
                onClick={() => props.handleCurrentForm(props.withoutUser)}
            >
                {props.withoutUserTitle}
            </button>
        </div>
    );
};

export default Tabs;
