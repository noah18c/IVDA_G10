import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Slider from '../components/Slider';
import Graph1 from '../components/Graph1';
import Graph2 from '../components/Graph2';
import RecommendationInfo from '../components/RecommendationInfo';

const SelectedRecommendations = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        fetch('/api/test_items')
            .then((response) => response.json())
            .then((data) => setCards(data.items))
            .catch((error) => console.error('Error fetching cards:', error));
    }, []);

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
                        <Slider cards={cards} />
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

                {/* Recommendation Info Section */}
                <Box
                    sx={{
                        flex: 1, // Occupies the remaining space
                    }}
                >
                    <RecommendationInfo />
                </Box>
            </Box>
        </Box>
    );
};

export default SelectedRecommendations;
