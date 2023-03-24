import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import AuthContext from "context/AuthContext";

const NavbarLinksList = () => {
    const { user, userLogout } = useContext(AuthContext);

    const navbarLinks = [
        { title: "Home", path: "/" },
        { title: "Flights", path: "/flights" },
        { title: "Countries", path: "/countries" },
        { title: "Airlines", path: "/airlines" },
    ];

    return (
        <ul className="navbar-links-list">
            {navbarLinks.map((link, idx) => {
                return (
                    <li key={`navbar-item-${idx}`} className="navbar-item">
                        <NavLink className="navbar-link" to={link.path}>
                            {link.title}
                        </NavLink>
                    </li>
                );
            })}
            {user ? (
                <>
                    <li className="navbar-item">
                        <NavLink className="navbar-link" to="/profile">
                            Profile
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <button
                            onClick={userLogout}
                            className="btn btn-md btn-danger"
                        >
                            Logout
                        </button>
                    </li>
                </>
            ) : (
                <li className="navbar-item">
                    <Link className="btn btn-md btn-primary" to="/login">
                        Login
                    </Link>
                </li>
            )}
        </ul>
    );
};

export default NavbarLinksList;
