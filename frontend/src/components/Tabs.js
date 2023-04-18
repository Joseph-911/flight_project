import React from "react";

const Tabs = (props) => {
    return (
        <div className="tab-btns">
            {props.tabs.map((tab) => {
                return (
                    <button
                        key={`tab-btn-${tab.name}`}
                        className={`btn btn-md ${
                            props.currentTab === tab.target
                                ? "btn-primary"
                                : "btn-primary-outline"
                        }`}
                        onClick={() => props.handleCurrentTab(tab.target)}
                    >
                        {tab.name}
                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;
