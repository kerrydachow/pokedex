import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
} from "@mui/material";
import SearchBar from "./SearchBar";
import TypeFilter from "./TypeFilter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PokemonFilter = ({
  pokemons,
  pokemonTypes,
  setCurrentPage,
  setFilteredPokemons,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [typeFilteredPokemons, setTypeFilteredPokemons] = useState([]);
  const [searchFilteredPokemons, setSearchFilteredPokemons] = useState([]);

  const filteredPokemons = searchFilteredPokemons.filter((pokemon) =>
    typeFilteredPokemons.includes(pokemon)
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setFilteredPokemons(filteredPokemons);
  }, [typeFilteredPokemons, searchFilteredPokemons]);

  useEffect(() => {
    setTypeFilteredPokemons(pokemons);
  }, [pokemons]);

  useEffect(() => {
    setSearchFilteredPokemons(pokemons);
  }, [pokemons]);

  return (
    <Container>
      <Card sx={{ pb: 4 }}>
        <CardHeader title="Filter Pokemon" sx={{ textAlign: "center" }} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CardActions>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </Box>
        <Collapse in={expanded} timeout="auto">
          <CardContent>
            <TypeFilter
              pokemons={pokemons}
              pokemonTypes={pokemonTypes}
              selectedTypes={selectedTypes}
              setCurrentPage={setCurrentPage}
              setSelectedTypes={setSelectedTypes}
              setTypeFilteredPokemons={setTypeFilteredPokemons}
            />
          </CardContent>
        </Collapse>
        <SearchBar
          pokemons={pokemons}
          setCurrentPage={setCurrentPage}
          setSearchFilteredPokemons={setSearchFilteredPokemons}
        />
      </Card>
    </Container>
  );
};

export default PokemonFilter;
