import Navbar from "layout/navbar/Navbar";
import React from "react";
import Logo from "./Logo";

const Header = () => {
    return (
        <header role="banner" className="header">
            <div className="container">
                <Logo />
                <Navbar />
            </div>
        </header>
    );
};

export default Header;
