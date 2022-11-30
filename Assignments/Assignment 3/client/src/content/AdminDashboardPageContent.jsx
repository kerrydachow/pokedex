import React from "react";
import { Container, Grid } from "@mui/material";
import LineChartTopUsers from "../components/LineChartTopUsers";
import BarChartTopUsers from "../components/BarChartTopUsers"

const AdminDashboardPageContent = ({ logs }) => {
  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item>
          <LineChartTopUsers data={logs} />
        </Grid>
        <Grid item>
          <BarChartTopUsers data={logs} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPageContent;
