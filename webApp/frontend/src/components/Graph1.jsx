import React from 'react';
import { Box, Typography } from '@mui/material';

const Graph1 = () => {
    return (
        <Box>
            <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
                Graph 1
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

export default Graph1;
