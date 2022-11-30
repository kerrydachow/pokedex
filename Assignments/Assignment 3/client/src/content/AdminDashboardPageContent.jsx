import React from "react";
import { Container, Grid } from "@mui/material";
import LineChartTopUsers from "../components/LineChartTopUsers";
import BarChartTopUsers from "../components/BarChartTopUsers"
import BarChart400Errors from "../components/BarChart400Errors"

const AdminDashboardPageContent = ({ logs, errorLogs, errorLogs400 }) => {
  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item>
          <LineChartTopUsers data={logs} />
        </Grid>
        <Grid item>
          <BarChartTopUsers data={logs} />
        </Grid>
        <Grid item>
          <BarChart400Errors data={errorLogs400} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPageContent;
