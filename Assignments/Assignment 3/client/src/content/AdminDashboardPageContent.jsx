import React from "react";
import { Container, Grid } from "@mui/material";
import LineChart from "../components/LineChart";

const AdminDashboardPageContent = ({ logs }) => {
  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item>
          <LineChart data={logs} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPageContent;
