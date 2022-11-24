import React, { useEffect, useState } from "react";
import axios from "axios";
import { POKEMON_JSON_URL, POKEMON_TYPES_URL } from "../lib/constants";
import LandingPageContent from "../content/LandingPageContent";


const LandingPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("pokemons")) {
      console.log("Fetching pokemons from API.");
      axios
        .get(POKEMON_JSON_URL)
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          localStorage.setItem("pokemons", JSON.stringify(res));
        })
        .catch((err) => console.log("Error: ", err));
    }

    if (!localStorage.getItem("pokemonTypes")) {
      console.log("Fetching pokemon types from API.");
      axios
        .get(POKEMON_TYPES_URL)
        .then((res) => res.data)
        .then((res) => {
          const types = res.map((type) => type.english);
          localStorage.setItem("pokemonTypes", JSON.stringify(types));
        })
        .catch((err) => console.log("Error: ", err));
    }
    setPokemonTypes(JSON.parse(localStorage.getItem("pokemonTypes")));
    setPokemons(JSON.parse(localStorage.getItem("pokemons")));
  }, []);
  return <LandingPageContent pokemons={pokemons} pokemonTypes={pokemonTypes} />;
};

export default LandingPage;
