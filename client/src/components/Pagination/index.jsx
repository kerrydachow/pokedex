import React from "react";
import { Pagination, Container } from "@mui/material";

const PokemonPagination = ({ currentPage, setCurrentPage, totalPages }) => {

  return (
    <Container sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <Pagination
        variant="outlined"
        shape="rounded"
        count={totalPages}
        size="medium"
        page={currentPage}
        color="secondary"
        onChange={(event, page) => setCurrentPage(page)}
      />
    </Container>
  );
};

export default PokemonPagination;
