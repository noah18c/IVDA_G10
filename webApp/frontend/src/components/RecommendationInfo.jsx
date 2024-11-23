import React from 'react';
import { Box, Typography } from '@mui/material';
import Graph1 from '../components/Graph1';
import Graph2 from '../components/Graph2';


const RecommendationInfo = ({ details }) => {

    // implement GET method that fetches all data for visualizations for 10 recomended items 
    // function that will display visualization data only for selected item (by id)

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
            {/* Graphs Section */}
            <Box
                    sx={{
                        display: 'flex',
                        gap: 2, // Space between the two graphs
                        height: '50%', // Occupies the top half of the column
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            backgroundColor: '#e0e0e0',
                            borderRadius: '8px',
                        }}
                    >
                        <Graph1 />
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            backgroundColor: '#e0e0e0',
                            borderRadius: '8px',
                        }}
                    >
                        <Graph2 />
                    </Box>
                </Box>
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
                {details ? <><div>Category: {details.category}</div>
                <div>Designer: {details.designer}</div>
                <div>Price: {details.price}</div>
                <div>Space: {details.space}</div>
                <div>Width: {details.width}</div></> : <div>Select the item</div>}
            </Typography>
            
            
            {console.log('selected item details: ', details)}
        </Box>
    );
};

export default RecommendationInfo;
