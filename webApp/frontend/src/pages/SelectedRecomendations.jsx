import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import Slider from '../components/slider'

const SelectedRecomendations = () => {
	const [cards, setCards] = useState([])

	useEffect(() => {
		// Prevent scrolling on the body
		document.body.style.overflow = 'hidden'

		// Fetch card data from the Flask backend
		fetch('/api/test_items')
			.then((response) => response.json())
			.then((data) => setCards(data.items))
			.catch((error) => console.error('Error fetching cards:', error))
	}, [])

	return (
		<Box
			sx={{
				backgroundColor: '#f5f5f5', // Light grey background
				minHeight: '100vh', // Full viewport height
				display: 'flex',
				alignItems: 'flex-start', // Align slider to the top-left
				padding: '10px', // Minimal padding around the entire container
			}}
		>
			<Box
				sx={{
					//width: '25%', // Adjust width of the box
					minWidth: '350px', // Ensure minimum box width
					marginLeft: '10px', // Minimal left margin
					backgroundColor: 'white',
					borderRadius: '10px',
					boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
					padding: '10px', // Padding inside the box
					overflow: 'hidden', // Prevent overall content overflow
					display: 'flex',
					flexDirection: 'column', // Stack content vertically
				}}
			>
				<Box
					sx={{
						flex: 1, // Allow the inner content to take available space
						overflowY: 'auto', // Enable scrolling inside the box
						paddingTop: '10px', // Padding at the top for content
						paddingBottom: '10px', // Padding at the bottom for content
					}}
				>
					{cards.length > 0 ? (
						<Slider cards={cards} />
					) : (
						<p>Loading cards...</p>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default SelectedRecomendations
