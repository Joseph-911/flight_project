import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo-xl.png";

const Logo = () => {
    return (
        <div className="logo-wrapper">
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
        </div>
    );
};

export default Logo;
