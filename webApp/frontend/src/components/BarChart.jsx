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
          // Recommended Item series
          {
            type: 'bar',
            x: [xData[0]], // Only the first item (recommended item)
            y: [yData[0]], // Only the first item value (recommended item)
            marker: {
              color: 'rgb(255, 99, 71)', // Red for recommended item
            },
            name: legendLabels?.[0] || '', // Only show legend if legendLabels[0] exists
            hoverinfo: 'x+y+name', // Show hover information with name
          },
          // Basket Items series
          {
            type: 'bar',
            x: xData.slice(1), // All other items (basket items)
            y: yData.slice(1), // All other values (basket items)
            marker: {
              color: 'rgb(135, 206, 250)', // Blue for basket items
            },
            name: legendLabels?.[1] || '', // Only show legend if legendLabels[1] exists
            hoverinfo: 'x+y+name', // Show hover information with name
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
          showlegend: legendLabels?.length > 0, // Only show legend if legendLabels is provided
          legend: {
            x: 1, // Position legend to the right
            y: 1, // Position legend at the top
            orientation: 'v', // Vertical alignment of legend
          },
          margin: { t: 40 }, // Adjust for legend space
        }}
        style={{ width: '100%', height: '300px' }}
      />
    </Box>
  );
};

export default BarChart;
