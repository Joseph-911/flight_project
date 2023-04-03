import React from "react";

const Avatar = (props) => {
    const user = props.user;

    return (
        <div className="avatar-wrapper">
            <div className="avatar-image">
                <img src={user.thumbnail} alt="User Profile" />
            </div>
            <div className="avatar-info">
                <p className="bold">{user.username}</p>
                <p>Member since: {user.created}</p>
            </div>
            {props.details && (
                <div className="avatar-additional-info">
                    <p>
                        <span className="bold">Role:</span>{" "}
                        {user.user_role ? user.user_role : "----------"}
                    </p>
                    {user.user_role &&
                    (user.user_role === "admin" ||
                        user.user_role === "customer" ||
                        user.user_role === "administrator") ? (
                        <p>
                            <span className="bold">Name: </span>
                            {user.role_obj.full_name}
                        </p>
                    ) : user.user_role === 'airline company' ? (
                        <>
                            <p>
                                <span className="bold">Company: </span>
                                {user.role_obj.name}
                            </p>
                            <p>
                                <span className="bold">Country: </span>
                                {user.role_obj.country_name}
                            </p>
                        </>
                    ) : ""}
                </div>
            )}
        </div>
    );
};

export default Avatar;
