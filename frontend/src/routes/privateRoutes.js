import React from "react";
import { Helmet } from "react-helmet";

import ProfileView from "views/private/profile/ProfileView";

export const Profile = () => {
    return (
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <ProfileView />
        </>
    );
};
