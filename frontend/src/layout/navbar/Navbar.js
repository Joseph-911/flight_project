import React from "react";
import NavbarLinksList from "./NavbarLinksList";

const Navbar = () => {
    return (
        <div className="navbar-wrapper">
            <nav className="navbar">
                <NavbarLinksList />
            </nav>
        </div>
    );
};

export default Navbar;
