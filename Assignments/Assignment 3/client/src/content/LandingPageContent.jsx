import React, { useState, useEffect } from "react";
import PokemonCards from "../components/PokemonCard";
import Pagination from "../components/Pagination";
import PokemonFilter from "../components/PokemonFilter";

const PokemonAdvancedFilteringContent = ({ pokemons, pokemonTypes }) => {
  // Pagination Props
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  // PokemonImage Props
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  return (
    <>
      <PokemonFilter
        pokemons={pokemons}
        pokemonTypes={pokemonTypes}
        setCurrentPage={setCurrentPage}
        setFilteredPokemons={setFilteredPokemons}
      />
      <PokemonCards pokemons={currentPokemons} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default PokemonAdvancedFilteringContent;
