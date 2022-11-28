import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";

const Error401PageContent = () => {
  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "60vh" }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          justifyContent="center"
          textAlign="center"
        >
          <Typography variant="h1"><b>401</b></Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            You're not a pokemon master!
          </Typography>
          <Button variant="contained" to="/">
            Back Home
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={5} justifyContent="center">
          <img
            src="https://i.pinimg.com/originals/21/a6/3e/21a63ed428a73d878af6b8c9aaedea37.gif"
            alt=""
            width="500px"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Error401PageContent;
