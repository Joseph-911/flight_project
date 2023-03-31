import React from "react";
import { Helmet } from "react-helmet";
import AddUserView from "views/private/profile/admin/usersActions/AddUserView";
import AllUsersView from "views/private/profile/admin/usersActions/AllUsersView";

import ProfileView from "views/private/profile/ProfileView";

export const Profile = () => {
    return (
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className="animate-fade-up">
                <ProfileView />
            </div>
        </>
    );
};

export const ProfileAdministratorUsers = () => {
    return (
        <>
            <Helmet>
                <title>All Users</title>
            </Helmet>
            <div className="animate-fade-up">
                <AllUsersView />
            </div>
        </>
    );
};

export const ProfileAdministratorUsersAdd = () => {
    return (
        <>
            <Helmet>
                <title>Add User</title>
            </Helmet>
            <div className="animate-fade-up">
                <AddUserView />
            </div>
        </>
    );
};
