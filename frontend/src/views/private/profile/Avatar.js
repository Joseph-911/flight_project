import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Avatar = (props) => {
    const user = props.user;
    const userRole = props.userRole;
    const navigate = useNavigate();

    const [editComponent, setEditComponent] = useState();

    useEffect(() => {
        if (userRole) {
            const handleChangeRoute = (role) => {
                navigate("/profile/edit", {
                    state: { user: user, target: role },
                });
            };
    
            const fetchData = async () => {
                const data = await userRole();
                if (data) {
                    const role = data.role;
                    if (role === "airline company" || role === "customer") {
                        setEditComponent(
                            <button
                                className="btn btn-sm btn-primary-outline"
                                onClick={() => {
                                    handleChangeRoute(role);
                                }}
                            >
                                Edit
                            </button>
                        );
                    }
                }
            };
            fetchData();
        }
    }, [userRole, navigate, user]);

    return (
        <div className="avatar-wrapper">
            {!props.details && editComponent && (
                <div className="avatar-actions">{editComponent}</div>
            )}
            <div className="avatar-image">
                <img src={user.thumbnail} alt="User Profile" />
            </div>
            <div className="avatar-info">
                <p className="bold">{user.username}</p>
                <p>Member since: {user.created}</p>
            </div>
            {props.details && (
                <>
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
                        ) : user.user_role === "airline company" ? (
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
                        ) : (
                            ""
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Avatar;
