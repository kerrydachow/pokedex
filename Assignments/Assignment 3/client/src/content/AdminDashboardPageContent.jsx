import React from "react";
import { Container, Grid } from "@mui/material";
import LineChartTopUsers from "../components/LineChartTopUsers";
import BarChartTopUsers from "../components/BarChartTopUsers"
import BarChart400Errors from "../components/BarChart400Errors"
import CalendarChartUniqueUsers from "../components/CalendarChartUniqueUsers";
import TableErrors from "../components/TableErrors";

const AdminDashboardPageContent = ({ logs, errorLogs, errorLogs400 }) => {
  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={10} md={6} lg={6}>
          <LineChartTopUsers data={logs} />
        </Grid>
        <Grid item xs={12} sm={10} md={6} lg={6}>
          <BarChartTopUsers data={logs} />
        </Grid>
        <Grid item xs={12} sm={10} md={6} lg={6}>
          <BarChart400Errors data={errorLogs400} />
        </Grid>
        <Grid item xs={12} sm={10} md={6} lg={6}>
          <TableErrors data={errorLogs} />
        </Grid>
        <Grid item xs={12}>
          <CalendarChartUniqueUsers data={logs} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPageContent;
