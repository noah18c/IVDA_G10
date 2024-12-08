import { useState, useEffect, useCallback, useRef } from 'react';
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

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

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
        roomTypes: [...roomTypes],
    });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const navigate = useNavigate();
    const debounceTimeoutRef = useRef();

    const buildQueryParams = () => {
        const params = new URLSearchParams();

        params.append('depth_min', debouncedFilters.depth[0]);
        params.append('depth_max', debouncedFilters.depth[1]);
        params.append('height_min', debouncedFilters.height[0]);
        params.append('height_max', debouncedFilters.height[1]);
        params.append('width_min', debouncedFilters.width[0]);
        params.append('width_max', debouncedFilters.width[1]);
        params.append('price_min', debouncedFilters.price[0]);
        params.append('price_max', debouncedFilters.price[1]);

        const roomTypeMapping = {
            'Living room': 'living_room',
            Bedroom: 'bedroom',
            Office: 'office',
            Kitchen: 'kitchen',
            'Dining room': 'dining',
            Entrance: 'entrance',
            Playroom: 'playroom',
            Nursery: 'nursery',
            Outdoor: 'outdoor',
        };

        roomTypes.forEach((room) => {
            const backendParam = roomTypeMapping[room];
            params.append(
                backendParam,
                debouncedFilters.roomTypes.includes(room) ? 1 : 0
            );
        });

        return params.toString();
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const queryParams = buildQueryParams();

            console.log('Fetching data with query params:', queryParams);

            const response = await axios.get(`/api/filter?${queryParams}`);
            console.log('API Response:', response.data);

            if (response.data.items) {
                let items = response.data.items;
                if (!Array.isArray(items)) {
                    items = Object.values(items);
                }

                const sanitizedItems = items.map((item) => ({
                    ...item,
                    cluster: isNaN(item.cluster) ? 0 : item.cluster,
                    depth: isNaN(item.depth) ? 0 : item.depth,
                    height: isNaN(item.height) ? 0 : item.height,
                    width: isNaN(item.width) ? 0 : item.width,
                    price: isNaN(item.price) ? 0 : item.price,
                }));

                if (sanitizedItems.length === 0) {
                    setError('No valid items returned from the API.');
                } else {
                    setItems(sanitizedItems);
                    setCurrentIndex(0);
                    setError('');
                }
            } else {
                setError('Invalid response format: No items field found.');
            }
        } catch (error) {
            console.error('Error fetching items:', error);
            setError('Failed to fetch items. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Debounce filter updates
        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500); 
    }, [filters]);

    useEffect(() => {
        fetchData();
    }, [debouncedFilters]);

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
                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 600 }}>
                    Filter Options
                </Typography>
                <Divider sx={{ marginBottom: 3 }} />
                {['Depth', 'Height', 'Width', 'Price'].map((label, index) => (
                    <Box key={index} sx={{ marginBottom: 3 }}>
                        <Typography sx={{ fontWeight: 500, marginBottom: 1 }}>{label}</Typography>
                        <Slider
                            value={filters[label.toLowerCase()]}
                            onChange={handleSliderChange(label.toLowerCase())}
                            min={1}
                            max={label === 'Price' ? 9585 : index === 0 ? 257 : index === 1 ? 321 : 420}
                            valueLabelDisplay="auto"
                        />
                    </Box>
                ))}
                <Typography sx={{ fontWeight: 500, marginBottom: 1 }}>Room Type</Typography>
                <FormGroup>
                    {roomTypes.map((room) => (
                        <FormControlLabel
                            key={room}
                            control={
                                <Checkbox
                                    value={room}
                                    checked={filters.roomTypes.includes(room)}
                                    onChange={handleCheckboxChange}
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
                        <Button variant="contained" onClick={fetchData}>
                            Retry
                        </Button>
                    </>
                ) : items.length > 0 && currentIndex < items.length ? (
                    <Cards item={items[currentIndex]} onChoice={handleChoice} />
                ) : (
                    <Typography>No items to display.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default CardsChoice;
