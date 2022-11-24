import React, { useState } from "react";
import { Container, Box, useTheme, InputBase, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ pokemons, setCurrentPage, setSearchFilteredPokemons }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [search, setSearch] = useState("");
  const handleText = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") setSearchFilteredPokemons(pokemons);
    else setCurrentPage(1); // Reset the page to 1
    setSearchFilteredPokemons(
      pokemons.filter((pokemon) =>
        pokemon.name.english
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
  };
  return (
    <Container>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="5px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search for Pokemon"
          value={search}
          onChange={handleText}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default SearchBar;
