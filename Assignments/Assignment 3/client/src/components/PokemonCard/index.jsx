import React from "react";
import {
  Container,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  Typography,
  Tooltip,
} from "@mui/material";
import PokemonType from "./PokemonType";
import { POKEMON_IMAGE_URL } from "../../lib/constants";
import { tokens } from "../../theme";
import "../../styles/pokemonType.css"

const PokemonCards = ({ pokemons }) => {
  const pokemonImageUrl = (pokemonId) => {
    let pokemonIdString = String(pokemonId);
    let pokemonImageString = POKEMON_IMAGE_URL;
    while (pokemonIdString.length < 3) pokemonIdString = "0" + pokemonIdString;
    return pokemonImageString.replace(/XXX/, pokemonIdString);
  };

  const pokemonNumber = (pokemonId) => {
    let pokemonIdString = String(pokemonId);
    while (pokemonIdString.length < 3) pokemonIdString = "0" + pokemonIdString;
    return pokemonIdString;
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Container sx={{ marginTop: 5, marginBottom: 5 }}>
      <Grid container spacing={8}>
        {pokemons.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
            <Tooltip
              arrow
              title={Object.entries(pokemon.base).map(([key, val], uniqueKey) => (
                <Typography variant="h5" key={uniqueKey}>
                  {key}: {val}
                </Typography>
              ))}
            >
              <Card
                sx={{
                  pt: 5,
                  pb: 2,
                  transition: "all 0.3s ease-in-out",
                  ":hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                <CardMedia
                  sx={{
                    height: "auto",
                    width: 150,
                    margin: "auto",
                  }}
                  component="img"
                  image={pokemonImageUrl(pokemon.id)}
                  alt={pokemon.name.english}
                />
                <CardContent>
                  <Typography>#{pokemonNumber(pokemon.id)}</Typography>
                  <Typography variant="h5">{pokemon.name.english}</Typography>
                  <Box sx={{display: 'flex', gap: 1, mt: 1}}>
                    {pokemon.type.map((type, key) => (
                      <PokemonType key={key} type={type} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PokemonCards;
