import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const Slider = ({ cards }) => {
    const [selectedCard, setSelectedCard] = useState(null); // State to track the selected card

    const handleCardClick = (cardId) => {
        setSelectedCard(cardId); // Set the clicked card as the selected one
    };

    return (
        <Box>
            {/* Title */}
            <Typography
                variant="h5"
                sx={{
                    textAlign: 'center',
                    marginBottom: '16px',
                    fontWeight: 'bold',
                }}
            >
                Recommendations
            </Typography>

            {/* Vertical Slider */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', // Stack cards vertically
                    overflowY: 'auto', // Enable vertical scrolling
                    gap: 3, // Space between cards
                    padding: 2,
                    maxHeight: '90vh', // Limit the height of the slider
                    scrollbarWidth: 'none', // Hide the scrollbar
                    '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Webkit-based browsers
                }}
            >
                {cards.map((card) => (
                    <Card
                        key={card.item_id}
                        onClick={() => handleCardClick(card.item_id)} // Handle click to select the card
                        sx={{
                            width: '300px', // Fixed width for the card
                            height: 'auto', // Flexible height to fit additional content
                            backgroundColor:
                                selectedCard === card.item_id
                                    ? '#d1e7dd' // Highlight selected card with a different background color
                                    : '#f5f5f5',
                            borderRadius: '10px',
                            boxShadow:
                                selectedCard === card.item_id
                                    ? '0 6px 8px rgba(0,0,0,0.2)' // Slightly stronger shadow for selected card
                                    : '0 4px 6px rgba(0,0,0,0.1)',
                            flexShrink: 0, // Prevent cards from stretching
                            display: 'flex',
                            flexDirection: 'column', // Stack content vertically
                            alignItems: 'center',
                            cursor: 'pointer', // Change cursor on hover
                            transition: 'transform 0.2s, box-shadow 0.2s', // Smooth hover and selection effect
                            '&:hover': {
                                transform: 'scale(1.05)', // Slight zoom effect on hover
                                boxShadow: '0 6px 8px rgba(0,0,0,0.15)', // Stronger shadow on hover
                            },
                        }}
                    >
                        {/* Image */}
                        <CardMedia
                            component="img"
                            image={card.image_path}
                            alt={card.name}
                            sx={{
                                height: 200, // Fixed height for the image
                                width: '100%', // Image spans full card width
                                objectFit: 'cover', // Ensure the image fills its area
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                            }}
                        />
                        {/* Card Content */}
                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                padding: 2,
                                width: '100%',
                            }}
                        >
                            {/* Name */}
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    textAlign: 'center', // Center the name horizontally
                                    marginBottom: '8px', // Add spacing below the name
                                }}
                            >
                                {card.name}
                            </Typography>

                            {/* Category */}
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    textAlign: 'left', // Align text to the left
                                }}
                            >
                                Category: {card.category}
                            </Typography>

                            {/* Price */}
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    textAlign: 'left', // Align text to the left
                                }}
                            >
                                Price: ${card.price}
                            </Typography>

                            {/* Optional Fields */}
                            {card.designer && (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        textAlign: 'left',
                                    }}
                                >
                                    Designer: {card.designer}
                                </Typography>
                            )}
                            {card.short_description && (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        textAlign: 'left',
                                        marginTop: '8px',
                                    }}
                                >
                                    {card.short_description}
                                </Typography>
                            )}

                            {/* Link to Product */}
                            {card.link && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href={card.link}
                                    target="_blank"
                                    sx={{
                                        marginTop: '8px',
                                    }}
                                >
                                    View Product
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Slider;
