import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Battle.css";

const Battle = ({
    pokemonOne,
    pokemonTwo,
    handleNewGame,
    handleNewOpponent,
    handleNewAttacker,
}) => {
    const [log, setLog] = useState([]);
    const [isFirstAttack, setIsFirstAttack] = useState(true);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    // const [pokemonOneHealth, setPokemonOneHealth] = useState({});
    let attackLog = [];
    let attacker, defender;

    const arrow = document.getElementsByClassName("arrow")[0];

    const popup = () => {
        let winner;
        if (pokemonOne[0].health < 0) {
            winner = pokemonTwo[0].name;
        } else {
            winner = pokemonOne[0].name;
        }
        const onClose = () => {
            setShowOverlay(false);
            setShowPopup(false);
        };

        const handleCloseNewGame = () => {
            onClose();
            handleNewGame();
        };
        const handleCloseNewOpponent = () => {
            if (pokemonTwo[0].health < 0) {
                handleNewOpponent();
            } else if (pokemonOne[0].health < 0) {
                handleNewAttacker();
            }
            onClose();
        };

        return (
            <div className="popup">
                <h1>{winner} wins!</h1>
                <div className="popupMenu">
                    <Link to="/" className="menuButton">
                        Main Menu
                    </Link>
                    <button onClick={handleCloseNewGame}>New Game</button>
                    <button onClick={handleCloseNewOpponent}>
                        New Opponent
                    </button>
                </div>
            </div>
        );
    };

    function rotateArrow() {
        setRotationAngle(rotationAngle + 180);
        arrow.style.transition = "transform 0.5s";
        arrow.style.transform = `rotate(${rotationAngle}deg)`;
    }
    const missChance = Math.floor(Math.random() * 100) + 1;

    useEffect(() => {
        const healthPercentage = calculateHealthPercentage();
        const healthBars = document.querySelectorAll(".healthLevel");
        healthBars.forEach((healthbar) => {
            healthbar.style.width = `${healthPercentage}%`;
        });
    }, [pokemonOne, pokemonTwo]);

    const calculateHealthPercentage = (health, newHealth) => {
        return `${(health / newHealth) * 100}%`;
    };

    const handleAttack = () => {
        if (isFirstAttack === true) {
            attacker =
                pokemonOne[0].speed > pokemonTwo[0].speed
                    ? pokemonOne
                    : pokemonTwo;
            defender = attacker === pokemonOne ? pokemonTwo : pokemonOne;
            rotateArrow(180);
        } else {
            attacker =
                pokemonOne[0].speed > pokemonTwo[0].speed
                    ? pokemonTwo
                    : pokemonOne;
            defender = attacker === pokemonOne ? pokemonTwo : pokemonOne;
            rotateArrow(0);
        }

        if (missChance <= 20) {
            attackLog.push(
                `${attacker[0].name} attacked ${defender[0].name} but missed!`
            );
        } else {
            let attack = attacker[0].attack / 2;
            let defence = defender[0].defence;
            if (defence >= 90) {
                defence = 90;
            }
            if (attack <= 10) {
                attack = 10;
            }

            const attackDamage = Math.round(attack * (1 - defence / 100));
            const newHealth = Math.round(defender[0].health - attackDamage);
            attackLog.push(
                `${attacker[0].name} attacked ${defender[0].name} for ${attackDamage} damage!`
            );
            // let pokemonOneHealth = (pokemonOne[0].health / newHealth) * 100;
            (defender[0].health = newHealth).toFixed(2);
        }

        setIsFirstAttack(!isFirstAttack);
        setLog([...log, ...attackLog]);

        if (defender[0].health <= 0) {
            setIsFirstAttack(true);
            setLog([]);
            setShowPopup(true);
            setShowOverlay(true);
            return `${attacker[0].name} won!`;
        }
    };

    return (
        <div>
            <div className="pokeContainer">
                {pokemonOne?.map((p) => (
                    <div className="pokemon">
                        <h2 className="uppercase">{p.name}</h2>
                        <div className="healthBar">
                            <div
                                className="healthLevel"
                                width="100%"
                                style={{
                                    width: p.health,
                                }}
                            ></div>
                        </div>
                        <img
                            src={p.sprite}
                            alt={p.name}
                            height="200vh"
                            width="200vw"
                        />
                        <h3>Stats</h3>
                        <div className="pokemonStats">
                            <div>HP: {p.health}</div>
                            <div>Attack: {p.attack}</div>
                            <div>Defence: {p.defence}</div>
                            <div>Speed: {p.speed}</div>
                        </div>
                    </div>
                ))}
                <div className="attackMenu">
                    <img src="assets/arrow.svg" alt="arrow" className="arrow" />
                    <button className="attackButton" onClick={handleAttack}>
                        Attack!
                    </button>
                </div>
                {showPopup && popup()}
                {showOverlay && <div className="overlay" />}
                {pokemonTwo?.map((p) => (
                    <div className="pokemon">
                        <h2 className="uppercase">{p.name}</h2>
                        <div className="healthBar">
                            <div
                                className="healthLevel"
                                style={{
                                    width: p.health,
                                }}
                            ></div>
                        </div>
                        <img
                            src={p.sprite}
                            alt={p.name}
                            height="200vh"
                            width="200vw"
                        />
                        <h3>Stats</h3>
                        <div className="pokemonStats">
                            <div>HP: {p.health}</div>
                            <div>Attack: {p.attack}</div>
                            <div>Defence: {p.defence}</div>
                            <div>Speed: {p.speed}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="menu">
                <div>
                    <h3 className="menuTitle">Menu</h3>
                    <div className="menuContainer">
                        <Link to="/" className="menuButton">
                            Main Menu
                        </Link>
                        <button className="menuButton" onClick={handleNewGame}>
                            New Game
                        </button>
                        <button
                            className="menuButton"
                            onClick={handleNewOpponent}
                        >
                            New Opponent
                        </button>
                    </div>
                </div>
                <div>
                    <h3>Logs</h3>
                    <div className="logContainer">
                        {log.map((entry, index) => (
                            <p key={index} className="uppercase">
                                <>{entry}</>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Battle;
