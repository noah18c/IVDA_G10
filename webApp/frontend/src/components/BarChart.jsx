import React from 'react';
import Plot from 'react-plotly.js';
import { Box, Typography } from '@mui/material';

const BarChart = ({ title, xData, yData, colors, legendLabels }) => {
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
            x: [xData[0]],
            y: [yData[0]],
            marker: {
              color: 'rgb(255, 99, 71)', // Red for 
            },
            name: legendLabels?.[0] || '',
            hoverinfo: 'x+y+name', // 
          },

          {
            type: 'bar',
            x: xData.slice(1), 
            y: yData.slice(1),
            marker: {
              color: 'rgb(135, 206, 250)', // Blue 
            },
            name: legendLabels?.[1] || '', 
            hoverinfo: 'x+y+name', 
          },
        ]}
        layout={{
          xaxis: {
            title: 'Item Name',
            tickangle: -45,
            automargin: true,
          },
          yaxis: {
            title: title === 'Price Comparison' ? 'Price (CHF)' : 'Size (cm3)',
          },
          showlegend: legendLabels?.length > 0, 
          legend: {
            x: 1,  
            y: 1, 
            orientation: 'v', 
          },
          margin: { t: 40 },
        }}
        style={{ width: '100%', height: '300px' }}
      />
    </Box>
  );
};

export default BarChart;
