import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

const Slider = ({ cards, onCardSelect }) => {
    const [selectedCard, setSelectedCard] = useState(0); 

    const handleCardClick = (cardId) => {
        setSelectedCard(cardId);

        if (onCardSelect) {
            onCardSelect(cardId);
        }
        
        
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
                    flexDirection: 'column', 
                    overflowY: 'auto', 
                    gap: 3, 
                    padding: 2,
                    maxHeight: '100vh', 
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' }, 
                }}
            >
                {cards.map((card) => (
                    <Card
                        key={card.item_id}
                        onClick={() => handleCardClick(card.item_id)} 
                        sx={{
                            width: '300px',
                            height: 'auto',
                            backgroundColor:
                                selectedCard === card.item_id
                                    ? '#d1e7dd'
                                    : '#f5f5f5',
                            borderRadius: '10px',
                            boxShadow:
                                selectedCard === card.item_id
                                    ? '0 6px 8px rgba(0,0,0,0.2)' 
                                    : '0 4px 6px rgba(0,0,0,0.1)',
                            flexShrink: 0,
                            display: 'flex',
                            flexDirection: 'column', 
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s', 
                            '&:hover': {
                                transform: 'scale(1.05)', 
                                boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
                            },
                        }}
                    >
                        {/* Image */}
                        <CardMedia
                            component="img"
                            image={card.image_path}
                            alt={card.name}
                            sx={{
                                height: 200, 
                                width: '100%', 
                                objectFit: 'cover', 
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
                                    textAlign: 'center', 
                                    marginBottom: '8px', 
                                }}
                            >
                                {card.name}
                            </Typography>

                            {/* Category */}
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    textAlign: 'left', 
                                }}
                            >
                                Category: {card.category}
                            </Typography>

                            {/* Price */}
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    textAlign: 'left', 
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
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Slider;
