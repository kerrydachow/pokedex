import * as React from "react";
import {
  Checkbox,
  Grid,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

const TypeFilter = ({
  pokemons,
  pokemonTypes,
  selectedTypes,
  setCurrentPage,
  setSelectedTypes,
  setTypeFilteredPokemons,
}) => {
  const handleCheck = (e) => {
    var localSelectedTypes = selectedTypes;
    if (selectedTypes.includes(e.target.value)) {
      localSelectedTypes.splice(localSelectedTypes.indexOf(e.target.value), 1);
      setSelectedTypes(localSelectedTypes);
    } else {
      localSelectedTypes = [...selectedTypes, e.target.value];
      setSelectedTypes(localSelectedTypes);
    }
    setCurrentPage(1); // Reset the page to 1
    setTypeFilteredPokemons(
      pokemons.filter((pokemon) =>
        localSelectedTypes.every((type) => pokemon.type.includes(type))
      )
    );
  };

  return (
    <FormGroup sx={{ textAlign: "center" }}>
      <Typography sx={{ display: "flex", pl: 1.2, mb: 2 }} variant="subtitle1">
        Filter by Type
      </Typography>
      <Grid container spacing={2}>
        {pokemonTypes.map((pokemonType, index) => (
          <Grid item xs={6} sm={6} md={4} lg={2} key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  onChange={handleCheck}
                  value={pokemonType}
                  sx={{ transform: "scale(1.2)" }}
                />
              }
              label={
                <Typography
                  variant="h5"
                  className={pokemonType + " type-filter"}
                >
                  {pokemonType}
                </Typography>
              }
            />
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  );
};

export default TypeFilter;
