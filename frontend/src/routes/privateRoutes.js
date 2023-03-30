import React from "react";
import { Helmet } from "react-helmet";
import AllUsersView from "views/private/profile/admin/AllUsersView";

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

export const ProfileAdministratorUsers = () => {
    return (
        <>
            <Helmet>
                <title>All Users</title>
            </Helmet>
            <AllUsersView />
        </>
    );
};
