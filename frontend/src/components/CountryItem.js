import React from "react";

const CountryItem = (props) => {
    const country = props.data;

    return (
        <div className="avatar-wrapper">
            <div className="avatar-image">
                <img src={country.flag} alt="Country Flag" />
            </div>
            <div className="avatar-info">
                <p className="username">{country.name}</p>
            </div>
        </div>
    );
};

export default CountryItem;
