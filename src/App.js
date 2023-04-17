import React, { useEffect, useState } from "react";
import Battle from "./Battle/Battle";
import "./App.css";
import axios from "axios";

function App() {
    const [pokemonOne, setPokemonOne] = useState();
    const [pokemonTwo, setPokemonTwo] = useState();

    useEffect(() => {
        fetchPokemonOne();
        fetchPokemonTwo();
    }, []);

    const fetchPokemonOne = () => {
        const randomNumber = Math.floor(Math.random() * 151);
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
            .then((response) => {
                const pokemonData = {
                    name: response.data.species.name,
                    sprite: response.data.sprites.other["official-artwork"]
                        .front_default,
                    health: response.data.stats[0].base_stat,
                    attack: response.data.stats[1].base_stat,
                    defence: response.data.stats[2].base_stat,
                    speed: response.data.stats[5].base_stat,
                };
                setPokemonOne([pokemonData]);
            });
    };
    const fetchPokemonTwo = () => {
        const randomNumberTwo = Math.floor(Math.random() * 151);
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${randomNumberTwo}`)
            .then((response) => {
                const pokemonDataTwo = {
                    name: response.data.species.name,
                    sprite: response.data.sprites.other["official-artwork"]
                        .front_default,
                    health: response.data.stats[0].base_stat,
                    attack: response.data.stats[1].base_stat,
                    defence: response.data.stats[2].base_stat,
                    speed: response.data.stats[5].base_stat,
                };
                setPokemonTwo([pokemonDataTwo]);
            });
    };

    const handleNewGame = () => {
        fetchPokemonOne();
        fetchPokemonTwo();
    };

    const handleNewOpponent = () => {
        fetchPokemonTwo();
    };

    const handleNewAttacker = () => {
        fetchPokemonOne();
    };

    return (
        <div className="appBody">
            <Battle
                pokemonOne={pokemonOne}
                pokemonTwo={pokemonTwo}
                handleNewGame={handleNewGame}
                handleNewOpponent={handleNewOpponent}
                handleNewAttacker={handleNewAttacker}
            />
        </div>
    );
}

export default App;
