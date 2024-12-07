import { useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import Slider from '../components/slider'
import axios from 'axios'
import RecommendationInfo from '../components/RecommendationInfo'
import SummaryRecommendations from './SummaryRecomendatinos'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

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

	// Get info for selected item in different categories by id
	const getItemInfo = (key) =>
		recommendationInfo?.[key]?.find(
			(e) => e.recommended_item?.item_id === selectedItem
		)

	const selectedItemInfoPrice = getItemInfo('price_comparison')
	const selectedItemInfoSize = getItemInfo('size_comparison')
	const selectedItemInfoExplanation = getItemInfo('explainable_texts')

	return (
		<Box
			sx={{
				backgroundColor: '#F5F5F5',
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'row',
				padding: '40px',
				gap: 4,
			}}
		>
			{/* Left Column: Slider */}
			<Box
				sx={{
					flex: '0 0 350px',
					backgroundColor: '#FFFFFF',
					borderRadius: '16px',
					boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
					padding: '16px',
					display: 'flex',
					flexDirection: 'column',
					overflow: 'hidden',
				}}
			>
				<Box
					sx={{
						flex: 1,
						overflowY: 'auto',
						scrollbarWidth: 'none',
						'&::-webkit-scrollbar': { display: 'none' },
					}}
				>
					{cards.length > 0 ? (
						<Slider cards={cards} onCardSelect={handleCardSelect} />
					) : (
						<Typography
							variant='body1'
							sx={{ textAlign: 'center', color: 'gray' }}
						>
							Loading recommendations...
						</Typography>
					)}
				</Box>
			</Box>

			{/* Right Column: Details */}
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: '#FFFFFF',
					borderRadius: '16px',
					boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
					padding: '32px',
					overflow: 'hidden',
				}}
			>
				{selectedItem ? (
					<>
						<Button
							startIcon={<ArrowBackIcon />}
							onClick={() => setSelectedItem(null)}
							sx={{
								marginBottom: '24px',
								color: '#0058A3',
								textTransform: 'none',
								fontWeight: 'bold',
							}}
						>
							Back to Recommendations Summary
						</Button>
						{selectedItemInfoPrice ? (
							<RecommendationInfo
								selectedItemInfoPrice={selectedItemInfoPrice}
								selectedItemInfoSize={selectedItemInfoSize}
								selectedItemInfoExplanation={
									selectedItemInfoExplanation
								}
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
						)}
					</>
				) : (
					<SummaryRecommendations />
				)}
			</Box>
		</Box>
	)
}

export default SelectedRecommendations
