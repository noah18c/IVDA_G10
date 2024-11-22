import React from 'react';
import { Box, Typography } from '@mui/material';

const RecommendationInfo = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                marginTop: '10px',
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    textAlign: 'center',
                    marginBottom: '16px',
                    fontWeight: 'bold',
                }}
            >
                Recommendation Info
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    textAlign: 'left',
                    color: 'gray',
                }}
            >
                {/* Placeholder for future content */}
                Detailed information about the selected recommendation will appear here.
            </Typography>
        </Box>
    );
};

export default RecommendationInfo;
