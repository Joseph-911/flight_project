import React from "react";
import connected_world from "assets/images/backgrounds/connected_world.svg";

const HomeView = () => {
    return (
        <>
            <div className="hero-wrapper">
                <div className="hero-cover">
                    <img src={connected_world} alt="Connected World" />
                </div>
            </div>
        </>
    );
};

export default HomeView;
