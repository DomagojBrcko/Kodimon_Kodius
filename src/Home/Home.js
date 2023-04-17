import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <div className="startContainer">
            <img
                src="assets/Kodi-logo.svg"
                alt="kodius-logo"
                className="kodiLogo"
            />
            <img
                src="assets/kodimon1.png"
                alt="logo"
                width="50%"
                className="kodiTitle"
            />
            <Link to="/battle" className="newGameButton">
                New Game
            </Link>
        </div>
    );
};

export default Home;
