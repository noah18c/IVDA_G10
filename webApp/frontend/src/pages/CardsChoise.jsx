import { useState, useEffect, useRef } from 'react';
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
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { styled } from '@mui/material/styles';

const BelowValueSlider = styled(Slider)(({ theme }) => ({
    '& .MuiSlider-valueLabel': {
        top: '60px', // Position the label below the slider
        transform: 'none',
        color: '#fff',
        '&:before': {
            transform: 'rotate(180deg)', // Flip the pointer upwards
            display: 'block', // Ensure the pointer is visible
        },
    },
    '& .MuiSlider-valueLabel::before': {
        content: '""', // Ensure the pointer exists
        width: '10px',
        height: '10px',
        position: 'absolute',
        top: '-5px', // Position the pointer above the label
        left: 'calc(50% - 5px)', // Center the pointer horizontally
        transform: 'rotate(45deg)', // Create the triangle effect
        zIndex: -1, // Ensure it is behind the text
    },
}));

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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
        roomTypes: [...roomTypes],
    });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [histograms, setHistograms] = useState({});
    const navigate = useNavigate();
    const debounceTimeoutRef = useRef();

    const fetchHistogramData = async () => {
        try {
            const response = await axios.get('/api/histogram_data');
            setHistograms(response.data.histograms || {});
        } catch (error) {
            console.error('Failed to fetch histogram data:', error);
        }
    };

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

    const fetchData = async (retryCount = 5, delay = 500) => {
        try {
            setLoading(true);
            const queryParams = buildQueryParams();
    
            const response = await axios.get(`/api/filter?${queryParams}`);
            if (response.data.items) {
                const sanitizedItems = response.data.items.map((item) => ({
                    ...item,
                    depth: parseFloat(item.depth) || 0,
                    height: parseFloat(item.height) || 0,
                    width: parseFloat(item.width) || 0,
                    price: parseFloat(item.price) || 0,
                }));
    
                setItems(sanitizedItems);
                setCurrentIndex(0);
                setError('');
            } else {
                throw new Error('Invalid response format. Retrying...');
            }
        } catch (error) {
            console.error('Error fetching items:', error);
    
            if (retryCount > 0) {
                console.log(`Retrying... (${3 - retryCount + 1})`);
                setTimeout(() => fetchData(retryCount - 1, delay * 2), delay); // Increase delay exponentially
            } else {
                setError('Failed to fetch items after multiple attempts. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };
    
    

    useEffect(() => {
        fetchHistogramData();
    }, []);

    useEffect(() => {
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
                try {
                    await axios.post('/api/liked_items', { likes: likedItems });
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

    const renderHistogramSlider = (key) => {
        const histogram = histograms[key];
        if (!histogram) return null;

        const { bins, counts } = histogram;

        const barData = {
            labels: bins.slice(0, -1).map((bin, i) => `${Math.round(bin)} - ${Math.round(bins[i + 1])}`),
            datasets: [
                {
                    label: 'Frequency',
                    data: counts,
                    backgroundColor: bins.map((_, i) =>
                        bins[i] >= filters[key][0] && bins[i + 1] <= filters[key][1] ? '#1976d2' : 'rgba(25, 118, 210, 0.26)'
                    ),
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false },
                y: { display: false },
            },
            plugins: { legend: { display: false } },
        };

        return (
            <Box key={`histogram-${key}`} sx={{ marginBottom: 10 }}>
                <Box sx={{ height: 100 }}>
                    <Bar data={barData} options={options} />
                </Box>
                <BelowValueSlider
                    value={filters[key]}
                    onChange={handleSliderChange(key)}
                    min={bins[0]}
                    max={bins[bins.length - 1]}
                    valueLabelDisplay="on"
                />
            </Box>
        );
    };

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 3fr' },
                gap: 3,
                padding: { xs: 2, md: 4 },
                backgroundColor: '#F7F7F7',
                height: '85vh',
                overflow: 'hidden',
            }}
        >
            {/* Filters Section */}
            <Box
                sx={{
                    backgroundColor: '#FFF',
                    borderRadius: 1,
                    padding: 4,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    overflowY: 'auto', // Enable scrolling within the filters box
                    overflowX: 'hidden', // Disable horizontal scrolling
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '100%', // Prevent the box from exceeding the container height
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 600 }}>
                    Filter Options
                </Typography>
                <Divider sx={{ marginBottom: 3 }} />
                {['depth', 'height', 'width', 'price'].map((key) => (
                    <Box key={key}>
                        <Typography sx={{ fontWeight: 500, color: '#555' }}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Typography>
                        {renderHistogramSlider(key)}
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
                                    onChange={(event) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            roomTypes: event.target.checked
                                                ? [...prev.roomTypes, room]
                                                : prev.roomTypes.filter((type) => type !== room),
                                        }))
                                    }
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
                    display: 'flex', // Enable Flexbox
                    alignItems: 'center', // Center vertically
                    maxHeight: '100%', // Constrain height to match the grid
                    overflow: 'hidden', // Prevent unnecessary scrolling in this box
                    justifyContent: 'center', // Center horizontally
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
