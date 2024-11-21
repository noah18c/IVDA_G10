import { useState, useEffect } from 'react'
import axios from 'axios'
import Cards from '../components/Cards'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography, CircularProgress, Alert } from '@mui/material'

const CardsChoice = () => {
	const [items, setItems] = useState([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [likedItems, setLikedItems] = useState([])
	const navigate = useNavigate()

	// Fetch initial data
	const fetchData = async () => {
		try {
			const response = await axios.get('/api/cards')
			console.log('API Response:', response.data)
			if (response.data.cards && Array.isArray(response.data.cards)) {
				setItems(response.data.cards)
				setCurrentIndex(0)
			} else {
				console.error(
					"Invalid response format: Expected an object with a 'cards' array."
				)
			}
		} catch (error) {
			console.error('Error fetching items:', error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const handleLike = async (likedItem) => {
		setLikedItems((prev) => [...prev, likedItem])

		if (currentIndex + 1 < items.length) {
			setCurrentIndex(currentIndex + 1)
		} else {
			if (likedItems.length + 1 >= 5) {
				try {
					await axios.post('/api/feedback', {
						likes: [...likedItems, likedItem],
					})
					console.log('Feedback sent successfully')
					navigate('/recomendations')
				} catch (error) {
					console.error('Error sending feedback:', error)
				}
			} else {
				console.log('Fetching more items due to insufficient likes')
				fetchData()
			}
		}
	}

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
			{items.length > 0 && currentIndex < items.length ? (
				<>
				{/* <Typography variant="h6">
                         Please like at least 5 items to proceed.
                    </Typography> */}
					<Alert severity='info' sx={{ marginTop: 2 }}>
						You need to like at least 5 items to proceed.
					</Alert>

					<Cards
						item={items[currentIndex]}
						onClick={() => handleLike(items[currentIndex])}
					/>
				</>
			) : items.length === 0 ? (
				<Box sx={{ textAlign: 'center' }}>
					<CircularProgress />
					<Typography variant='body1' sx={{ marginTop: 2 }}>
						Loading items...
					</Typography>
				</Box>
			) : (
				<Box sx={{ textAlign: 'center' }}>
					<Typography variant='h6'>
						No more items to display
					</Typography>
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
	)
}

export default CardsChoice
