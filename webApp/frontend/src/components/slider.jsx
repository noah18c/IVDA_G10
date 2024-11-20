import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

const Slider = ({ cards }) => {
    return (
        <Box>
            {/* Title */}
            <Typography
                variant="h5"
                sx={{
                    textAlign: 'center',
                    marginBottom: '16px', // Space below the title
                    fontWeight: 'bold',
                }}
            >
                Recommendations
            </Typography>

            {/* Slider */}
            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto', // Enable horizontal scrolling
                    gap: 2,
                    padding: 2,
                    scrollbarWidth: 'none', // Hide scrollbar
                    '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Webkit-based browsers
                }}
            >
                {cards.map((card) => (
                    <Card
                        key={card.item_id}
                        sx={{
                            minWidth: 200,
                            maxWidth: 300,
                            backgroundColor: '#f5f5f5',
                            borderRadius: '10px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            flex: '0 0 auto', // Prevent the card from stretching
                        }}
                    >
                        {/* Image */}
                        <CardMedia
                            component="img"
                            height="140"
                            image={card.image}
                            alt={card.name}
                        />
                        {/* Card Content */}
                        <CardContent>
                            <Typography variant="h6">{card.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Category: {card.category}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Price: ${card.price}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Slider;
