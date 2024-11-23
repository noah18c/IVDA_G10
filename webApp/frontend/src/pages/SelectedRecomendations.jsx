import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Slider from '../components/slider';

import RecommendationInfo from '../components/RecommendationInfo';

const SelectedRecommendations = () => {
    const [cards, setCards] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        fetch('/api/recommendations')
            .then((response) => response.json())
            .then((data) => setCards(data.recommendations))
            .catch((error) => console.error('Error fetching cards:', error));
    }, []);

	const handleCardSelect = (item) => {
        setSelectedItem(item); // Update selected item
    };

    return (
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                minHeight: '100vh',
                display: 'flex',
                padding: '20px',
                gap: 2, // Add space between slider and graphs container
            }}
        >
            {/* Slider Section */}
            <Box
                sx={{
                    minWidth: '350px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto', // Enable scrolling inside the box
                    }}
                >
                    {cards.length > 0 ? (
                        <Slider cards={cards} onCardSelect={handleCardSelect}/>
                    ) : (
                        <p>Loading cards...</p>
                    )}
                </Box>
            </Box>

            {/* Right Column: Graphs and Info */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2, // Space between sections
                }}
            >
                <Box
                    sx={{
                        flex: 1, // Occupies the remaining space
                    }}
                >
                    <RecommendationInfo details={selectedItem}/>
                </Box>
            </Box>
        </Box>
    );
};

export default SelectedRecommendations;
