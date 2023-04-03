import React, { useContext } from "react";

import AuthContext from "context/AuthContext";
import Avatar from "./Avatar";
import Dashboard from "./Dashboard";

const ProfileView = () => {
    const { userDetails } = useContext(AuthContext);

    return (
        <div className="profile-wrapper">
            <Avatar user={userDetails} details={false} />
            <Dashboard />
        </div>
    );
};

export default ProfileView;
