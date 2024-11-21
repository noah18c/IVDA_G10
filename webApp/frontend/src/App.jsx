import React, { useEffect, useState } from 'react';
import Slider from './components/Slider';
import { Box } from '@mui/material';

function App() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // Fetch card data from the Flask backend
        fetch('/api/cards')
            .then((response) => response.json())
            .then((data) => setCards(data.cards))
            .catch((error) => console.error('Error fetching cards:', error));
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: '#f5f5f5', // Light grey background
                minHeight: '100vh', // Full viewport height
                display: 'flex',
                alignItems: 'flex-start', // Align slider to the top-left
                padding: '10px', // Minimal padding
            }}
        >
            <Box
                sx={{
                    width: '25%', // Adjust width of the box
                    minWidth: '350px', // Ensure minimum box width
                    marginLeft: '10px', // Minimal left margin
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '10px',
                    overflow: 'hidden', // Prevent content overflow
                }}
            >
                {cards.length > 0 ? (
                    <Slider cards={cards} />
                ) : (
                    <p>Loading cards...</p>
                )}
            </Box>
        </Box>
    );
}

export default App;
