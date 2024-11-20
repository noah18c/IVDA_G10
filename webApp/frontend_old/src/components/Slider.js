import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const Slider = () => {
    const cards = [
        { id: 1, title: 'Card 1', description: 'This is card 1.' },
        { id: 2, title: 'Card 2', description: 'This is card 2.' },
        { id: 3, title: 'Card 3', description: 'This is card 3.' },
        { id: 4, title: 'Card 4', description: 'This is card 4.' },
        { id: 5, title: 'Card 5', description: 'This is card 5.' }
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                overflowX: 'auto',
                gap: 2,
                p: 2,
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
            }}
        >
            {cards.map((card) => (
                <Card
                    key={card.id}
                    sx={{
                        minWidth: 200,
                        maxWidth: 300,
                        backgroundColor: '#f5f5f5',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        flex: '0 0 auto',
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {card.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default Slider;
