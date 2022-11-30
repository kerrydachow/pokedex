import React from "react";
import { Container, Grid } from "@mui/material";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart"

const AdminDashboardPageContent = ({ logs }) => {
  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item>
          <LineChart data={logs} />
        </Grid>
        <Grid item>
          <BarChart data={logs} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPageContent;
