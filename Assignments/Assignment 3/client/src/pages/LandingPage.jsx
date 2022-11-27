import React, { useEffect, useState } from "react";
import axios from "axios";
import { POKEMON_JSON_URL, POKEMON_TYPES_URL } from "../lib/constants";
import LandingPageContent from "../content/LandingPageContent";


const LandingPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);

  useEffect(() => {
      axios
        .get(POKEMON_JSON_URL)
        .then((res) => res.data)
        .then((res) => {
          setPokemons(res)
        })
        .catch((err) => console.log("Error: ", err));

      console.log("Fetching pokemon types from API.");
      axios
        .get(POKEMON_TYPES_URL)
        .then((res) => res.data)
        .then((res) => {
          const types = res.map((type) => type.english);
          setPokemonTypes(types);
        })
        .catch((err) => console.log("Error: ", err));
  }, []);
  return <LandingPageContent pokemons={pokemons} pokemonTypes={pokemonTypes} />;
};

export default LandingPage;
