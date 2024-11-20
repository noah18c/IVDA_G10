import React, { useRef } from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Slider = () => {
    const scrollRef = useRef(null);

    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300; // Adjust the scroll distance as needed
            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const cards = [
        { id: 1, title: 'Dekorationen', img: '/path/to/image1.jpg' },
        { id: 2, title: 'Alles zum Einladen', img: '/path/to/image2.jpg' },
        { id: 3, title: 'Adventskalender', img: '/path/to/image3.jpg' },
        { id: 4, title: 'Festliche Looks', img: '/path/to/image4.jpg' },
        { id: 5, title: 'Geschenkpapier', img: '/path/to/image5.jpg' },
    ];

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            {/* Left Arrow */}
            <IconButton
                onClick={() => handleScroll('left')}
                sx={{
                    position: 'absolute',
                    left: '-10px',
                    zIndex: 2,
                    backgroundColor: 'white',
                    '&:hover': { backgroundColor: 'gray' },
                }}
            >
                <ArrowBackIosIcon />
            </IconButton>

            {/* Slider Container */}
            <Box
                ref={scrollRef}
                sx={{
                    display: 'flex',
                    gap: 2,
                    overflowX: 'auto',
                    padding: '10px',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' }, // Hide the scrollbar
                }}
            >
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        sx={{
                            minWidth: 150,
                            height: 180,
                            flex: '0 0 auto',
                            textAlign: 'center',
                            boxShadow: 'none',
                            backgroundColor: 'transparent',
                        }}
                    >
                        {/* Circular Image */}
                        <Box
                            sx={{
                                width: 120,
                                height: 120,
                                borderRadius: '50%',
                                backgroundImage: `url(${card.img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                margin: '0 auto',
                            }}
                        />
                        {/* Title */}
                        <CardContent sx={{ padding: '10px 0 0 0' }}>
                            <Typography variant="subtitle1" sx={{ fontSize: '14px' }}>
                                {card.title}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Right Arrow */}
            <IconButton
                onClick={() => handleScroll('right')}
                sx={{
                    position: 'absolute',
                    right: '-10px',
                    zIndex: 2,
                    backgroundColor: 'white',
                    '&:hover': { backgroundColor: 'gray' },
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
};

export default Slider;
