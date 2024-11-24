import React from 'react';
import Plot from 'react-plotly.js';
import { Box, Typography } from '@mui/material';

const BarChart = ({ title, xData, yData, colors }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          marginBottom: '8px',
          fontWeight: 'bold',
          color: '#555',
        }}
      >
        {title}
      </Typography>
      <Plot
        data={[
          {
            type: 'bar',
            x: xData,
            y: yData,
            marker: {
              color: colors,
            },
          },
        ]}
        layout={{
          xaxis: {
            title: 'Item name',
            tickangle: -45,
            automargin: true, 
          },
          yaxis: {
            title: title === 'Price Comparison' ? 'Price (CHF)' : 'Count',
          },
          showlegend: false,
          margin: { t: 20 },
        }}
        style={{ width: '100%', height: '300px' }}
      />
    </Box>
  );
};

export default BarChart;
