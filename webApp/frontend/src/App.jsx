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
                backgroundColor: '#f5f5f5',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 10%',
            }}
        >
            <Box
                sx={{
                    width: '80%',
                    maxWidth: '1200px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
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
