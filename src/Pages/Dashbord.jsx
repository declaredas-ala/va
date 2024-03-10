import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Dashbord = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: '16px' }}>
          <Typography variant="h6" component="div">
            Overview
          </Typography>
          {/* Add your overview content here (e.g., charts, metrics) */}
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} sx={{ padding: '16px' }}>
          <Typography variant="h6" component="div">
            Metric 1
          </Typography>
          {/* Add content for Metric 1 (e.g., number, chart) */}
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} sx={{ padding: '16px' }}>
          <Typography variant="h6" component="div">
            Metric 2
          </Typography>
          {/* Add content for Metric 2 (e.g., number, chart) */}
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Dashbord;