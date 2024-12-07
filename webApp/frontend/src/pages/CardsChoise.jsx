import { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../components/Cards';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	Typography,
	CircularProgress,
	Alert,
	Slider,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Divider,
} from '@mui/material';

const roomTypes = [
	'Living room',
	'Bedroom',
	'Office',
	'Kitchen',
	'Dining room',
	'Entrance',
	'Playroom',
	'Nursery',
	'Outdoor',
];

const CardsChoice = () => {
	const [items, setItems] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [likedItems, setLikedItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [filters, setFilters] = useState({
		depth: [1, 257],
		height: [1, 321],
		width: [1, 420],
		price: [1, 9585],
		roomTypes: [],
	});
	const navigate = useNavigate();

	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/test_items');
			if (response.data.items && Array.isArray(response.data.items)) {
				setItems(response.data.items);
				setCurrentIndex(0);
			} else {
				setError('Invalid response format');
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
			if (likedItems.length + (isLiked ? 1 : 0) >= 5) {
				const finalLikedItems = isLiked ? [...likedItems, currentItem] : likedItems;
				try {
					await axios.post('/api/liked_items', { likes: finalLikedItems });
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

	const handleSliderChange = (field) => (event, newValue) => {
		setFilters((prev) => ({ ...prev, [field]: newValue }));
	};

	const handleCheckboxChange = (event) => {
		const { value, checked } = event.target;
		setFilters((prev) => ({
			...prev,
			roomTypes: checked
				? [...prev.roomTypes, value]
				: prev.roomTypes.filter((type) => type !== value),
		}));
	};

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: { xs: '1fr', md: '1fr 3fr' },
				gap: 3,
				padding: { xs: 2, md: 4 },
				backgroundColor: '#F7F7F7',
			}}
		>
			{/* Filters Section */}
			<Box
				sx={{
					backgroundColor: '#FFF',
					borderRadius: 1,
					padding: 3,
					boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
				}}
			>
				<Typography
					variant="h5"
					sx={{
						marginBottom: 2,
						fontWeight: 600,
						color: '#333',
						fontSize: '1.2rem',
					}}
				>
					Filter Options
				</Typography>
				<Divider sx={{ marginBottom: 3 }} />
				{/* Numeric Filters */}
				{['Depth', 'Height', 'Width', 'Price'].map((label, index) => (
					<Box key={index} sx={{ marginBottom: 3 }}>
						<Typography sx={{ fontWeight: 500, color: '#555', fontSize: '0.9rem' }}>
							{label} ({label === 'Price' ? '$' : 'cm'})
						</Typography>
						<Slider
							value={filters[label.toLowerCase()]}
							onChange={handleSliderChange(label.toLowerCase())}
							min={1}
							max={label === 'Price' ? 9585 : index === 0 ? 257 : index === 1 ? 321 : 420}
							valueLabelDisplay="auto"
						/>
					</Box>
				))}
				{/* Room Type Filters */}
				<Typography
					sx={{
						fontWeight: 500,
						color: '#555',
						marginBottom: 1,
						fontSize: '0.9rem',
					}}
				>
					Room Type
				</Typography>
				<FormGroup>
					{roomTypes.map((room) => (
						<FormControlLabel
							key={room}
							control={
								<Checkbox
									value={room}
									onChange={handleCheckboxChange}
									sx={{
										color: '#0058A3',
										'&.Mui-checked': { color: '#0058A3' },
									}}
								/>
							}
							label={room}
						/>
					))}
				</FormGroup>
			</Box>

			{/* Cards Section */}
			<Box
				sx={{
					backgroundColor: '#FFF',
					borderRadius: 1,
					boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
					padding: 3,
					textAlign: 'center',
				}}
			>
				{loading ? (
					<CircularProgress />
				) : error ? (
					<>
						<Alert severity="error">{error}</Alert>
						<Button
							variant="contained"
							onClick={fetchData}
							sx={{
								backgroundColor: '#0058A3',
								color: '#FFF',
								marginTop: 2,
								'&:hover': { backgroundColor: '#00427A' },
							}}
						>
							Retry
						</Button>
					</>
				) : items.length > 0 && currentIndex < items.length ? (
					<Cards item={items[currentIndex]} onChoice={handleChoice} />
				) : (
					<Typography variant="h6" sx={{ color: '#333', marginTop: 2 }}>
						No items to display.
					</Typography>
				)}
			</Box>
		</Box>
	);
};

export default CardsChoice;
