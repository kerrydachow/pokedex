import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const TableErrors = ({ data }) => {
  data.sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div style={{ height: 500, position: "relative", textAlign: "center", marginBottom: 50}}>
    <Typography variant="h3" sx={{mb: 3}}>Recent 4xx/5xx Errors</Typography>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table sx={{height: 400}} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Endpoint</TableCell>
            <TableCell align="right">Status Code</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="right">Request Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.path}
              </TableCell>
              <TableCell align="center">{row.statusCode}</TableCell>
              <TableCell align="right">{new Date(row.date).toLocaleString()}</TableCell>
              <TableCell align="right">{row.request}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default TableErrors