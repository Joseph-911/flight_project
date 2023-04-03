import React from "react";
import { Helmet } from "react-helmet";

import ProfileView from "views/private/profile/ProfileView";
import AllView from "views/private/profile/AllView";
import AddView from "views/private/profile/AddView";

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

export const ProfileAll = () => {
    return (
        <>
            <Helmet>
                <title>View All</title>
            </Helmet>
            <div className="animate-fade-up">
                <AllView />
            </div>
        </>
    );
};

export const ProfileAdd = () => {
    return (
        <>
            <Helmet>
                <title>Add</title>
            </Helmet>
            <div className="animate-fade-up">
                <AddView />
            </div>
        </>
    );
};
