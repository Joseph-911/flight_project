import React from "react";

import Avatar from "./Avatar";
import Dashboard from "./Dashboard";

const ProfileView = () => {
    return (
        <div className="profile-wrapper">
            <Avatar />
            <Dashboard />
        </div>
    );
};

export default ProfileView;
