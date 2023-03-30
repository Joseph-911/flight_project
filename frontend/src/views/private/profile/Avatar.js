import React, { useContext } from "react";

import AuthContext from "context/AuthContext";

const Avatar = () => {
    const { userDetails } = useContext(AuthContext);

    return (
        <div className="avatar-wrapper">
            <div className="avatar-image">
                <img src={userDetails.thumbnail} alt="User Profile" />
            </div>
            <div className="avatar-info">
                <p className="bold">{userDetails.username}</p>
                <p>Member since: {userDetails.created}</p>
            </div>
        </div>
    );
};

export default Avatar;
