import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Slider from '../components/slider'
import axios from 'axios'
import RecommendationInfo from '../components/RecommendationInfo'

const SelectedRecommendations = () => {
	const [cards, setCards] = useState([])
	const [recommendationInfo, setRecommendationInfo] = useState(null)
	const [selectedItem, setSelectedItem] = useState(null)

	useEffect(() => {
		axios
			.all([
				axios.get('/api/recommendations'),
				axios.get('/api/recommendations_info'),
			])
			.then(
				axios.spread(
					(recommendationsResponse, recommendationsInfoResponse) => {
						// Set the data for each state
						setCards(
							recommendationsResponse.data.recommendations || []
						)
						setRecommendationInfo(
							recommendationsInfoResponse.data
								.recommendations_info || null
						)
					}
				)
			)
			.catch((error) => {
				console.error('Error fetching data:', error)
			})
	}, [])

	const handleCardSelect = (item) => {
		setSelectedItem(item) 
	}


	// get info for selected item in different categories 
	const getItemInfo = (key) => 
		recommendationInfo?.[key]?.find(e => e.recommended_item?.item_id === selectedItem);
	
	const selectedItemInfoPrice = getItemInfo('price_comparison');
	const selectedItemInfoSize = getItemInfo('size_comparison');
	const selectedItemInfoExplanation = getItemInfo('explainable_texts');
	

	console.log('size: ', selectedItemInfoSize);
	

	return (
		<Box
			sx={{
				backgroundColor: '#f5f5f5',
				minHeight: '100vh',
				display: 'flex',
				padding: '20px',
				gap: 2, 
			}}
		>
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
						overflowY: 'auto', 
					}}
				>
					{cards.length > 0 ? (
						<Slider cards={cards} onCardSelect={handleCardSelect} />
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
					gap: 2, 
				}}
			>
				{selectedItem ? (
					// Render selected item info if available
					selectedItemInfoPrice ? (
						<RecommendationInfo
							selectedItemInfoPrice={selectedItemInfoPrice}
							selectedItemInfoSize={selectedItemInfoSize}
							selectedItemInfoExplanation={selectedItemInfoExplanation}
						/>
					) : (
						<Typography
							variant='body1'
							sx={{
								textAlign: 'center',
								color: 'gray',
								marginTop: '20px',
							}}
						>
							No data available for the selected item.
						</Typography>
					)
				) : (
					<Typography
						variant='body1'
						sx={{
							textAlign: 'center',
							color: 'gray',
							marginTop: '20px',
						}}
					>
						Select an item first to view the details and
						visualizations.
					</Typography>
				)}
			</Box>
		</Box>
	)
}

export default SelectedRecommendations
