import React from 'react';
import { Box, Typography } from '@mui/material';

const Graph2 = () => {
    return (
        <Box>
            <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
                Graph 2
            </Typography>
            {/* Replace with your graph library (e.g., Plotly, Chart.js) */}
            <Box
                sx={{
                    width: '100%',
                    height: '300px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '8px',
                }}
            >
                {/* Add graph visualization here */}
            </Box>
        </Box>
    );
};

export default Graph2;
