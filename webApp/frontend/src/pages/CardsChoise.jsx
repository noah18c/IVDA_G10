import { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../components/Cards';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, CircularProgress, Alert } from '@mui/material';

const CardsChoice = () => {
	const [items, setItems] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [likedItems, setLikedItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	// Fetch initial data
	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/test_items');
			console.log('API Response:', response.data);
			if (response.data.items && Array.isArray(response.data.items)) {
				setItems(response.data.items);
				setCurrentIndex(0);
			} else {
				setError("Invalid response format");
			}
		} catch (error) {
			console.error('Error fetching items:', error);
			setError('Failed to fetch items. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleChoice = async (isLiked) => {
		const currentItem = items[currentIndex];
		if (isLiked) {
			setLikedItems((prev) => [...prev, currentItem]);
		}

		if (currentIndex + 1 < items.length) {
			setCurrentIndex((prev) => prev + 1);
		} else {
			// All items processed
			if (likedItems.length + (isLiked ? 1 : 0) >= 5) {
				const finalLikedItems = isLiked ? [...likedItems, currentItem] : likedItems;
				console.log('Sending liked items:', finalLikedItems);
				try {
					await axios.post('/api/liked_items', { likes: finalLikedItems });
					console.log('Feedback sent successfully');
					navigate('/recommendations');
				} catch (error) {
					console.error('Error sending feedback:', error);
					setError('Failed to send feedback. Please try again.');
				}
			} else {
				setError('You need to like at least 5 items to proceed.');
			}
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 3,
				padding: 3,
			}}
		>
			{loading ? (
				<Box sx={{ textAlign: 'center' }}>
					<CircularProgress />
					<Typography variant='body1' sx={{ marginTop: 2 }}>
						Loading items...
					</Typography>
				</Box>
			) : error ? (
				<Box sx={{ textAlign: 'center' }}>
					<Alert severity='error'>{error}</Alert>
					<Button
						variant='contained'
						onClick={fetchData}
						sx={{ marginTop: 2 }}
					>
						Try Again
					</Button>
				</Box>
			) : items.length > 0 && currentIndex < items.length ? (
				<>
					<Alert severity='info' sx={{ marginTop: 2 }}>
						You need to like at least 5 items to proceed.
					</Alert>
					<Cards
						item={items[currentIndex]}
						onChoice={handleChoice}
					/>
				</>
			) : (
				<Box sx={{ textAlign: 'center' }}>
					<Typography variant='h6'>No more items to display</Typography>
					<Button
						variant='contained'
						onClick={fetchData}
						sx={{ marginTop: 2 }}
					>
						Fetch More Items
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default CardsChoice;
