import React, { useState, useEffect } from "react";
import PokemonCards from "../components/PokemonCard";
import Pagination from "../components/Pagination";

const PokemonAdvancedFilteringContent = ({ pokemons, pokemonTypes }) => {
  // Search by Name Props
  const [searchFilteredPokemons, setSearchFilteredPokemons] = useState([]);

  // Checkbox Filter Props
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [typeFilteredPokemons, setTypeFilteredPokemons] = useState([]);

  // Combine filtered Searches
  const filteredPokemons = searchFilteredPokemons.filter((pokemon) =>
    typeFilteredPokemons.includes(pokemon)
  );

  // Pagination Props
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  // PokemonImage Props
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  useEffect(() => {
    setTypeFilteredPokemons(pokemons);
  }, [pokemons]);

  useEffect(() => {
    setSearchFilteredPokemons(pokemons);
  }, [pokemons]);

  return (
    <>
      <PokemonCards pokemons={currentPokemons} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </>
  );
};

export default PokemonAdvancedFilteringContent;
