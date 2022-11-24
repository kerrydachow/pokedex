import React from "react";
import { Pagination, Container } from "@mui/material";

const PokemonPagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Pagination
        variant="outlined"
        shape="rounded"
        count={totalPages}
        size="large"
        page={currentPage}
        onChange={(event, page) => setCurrentPage(page)}
      />
    </Container>
  );
};

export default PokemonPagination;
