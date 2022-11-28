import React from 'react';
import { Container, Grid } from '@mui/material';
import LineChart from "../components/LineChart";

const AdminDashboardPageContent = () => {
  return (
    <Container>
      <Grid container>
        <Grid item>
          <LineChart />
        </Grid>
      </Grid>
    </Container>
  )
}

export default AdminDashboardPageContent