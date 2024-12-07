import React from 'react'
import { Box, Typography } from '@mui/material'
import BarChart from '../components/BarChart'
import RecommendedItemDetails from './RecommendedItemDetails'

const RecommendationInfo = ({
	selectedItemInfoPrice,
	selectedItemInfoSize,
	selectedItemInfoExplanation,
}) => {
	// Ensure valid data structures for Price and Size
	const basketItemsPrice = selectedItemInfoPrice?.basket_items || []
	const basketItemsSize = selectedItemInfoSize?.basket_items || []

	// Price data
	const itemNamesPrice = [
		selectedItemInfoPrice?.recommended_item?.name || 'Recommended Item',
		...basketItemsPrice.map((item, index) => `${item.name} (${index + 1})`),
	]
	const itemPrices = [
		selectedItemInfoPrice?.recommended_item?.price || 0,
		...basketItemsPrice.map((item) => item.price || 0),
	]
	const itemColorsPrice = [
		'rgb(255, 99, 71)',
		...basketItemsPrice.map(() => 'rgb(135, 206, 250)'),
	]

	// Size data
	const itemNamesSize = [
		selectedItemInfoSize?.recommended_item?.name || 'Recommended Item',
		...basketItemsSize.map((item, index) => `${item.name} (${index + 1})`),
	]
	const itemSizes = [
		selectedItemInfoSize?.recommended_item?.size || 0,
		...basketItemsSize.map((item) => item.size || 0),
	]
	const itemColorsSize = [
		'rgb(255, 99, 71)',
		...basketItemsSize.map(() => 'rgb(135, 206, 250)'),
	]

	// Explanation data
	const recommendedItem = selectedItemInfoExplanation?.recommended_item || {}
	const explanation = selectedItemInfoExplanation?.explanation || {}
	const additionalInfo = selectedItemInfoExplanation?.additional_info || {}

	return (
		<Box>
			<Typography
				variant='h5'
				sx={{
					textAlign: 'center',
					marginBottom: '24px',
					fontWeight: 'bold',
					color: '#333',
				}}
			>
				Recommendation Information
			</Typography>

			{/* Plots Section */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '24px',
				}}
			>
				<Box sx={{ flex: 1, marginRight: '16px' }}>
					<BarChart
						title="Price Comparison"
						xData={itemNamesPrice}
						yData={itemPrices}
						colors={itemColorsPrice}
						xAxisLabel={'Item Name'}
						yAxisLabel={'Price (CHF)'}
						legendLabels={['Recommended Item', 'Liked Items']}
					/>
				</Box>

				<Box sx={{ flex: 1 }}>
					<BarChart
						title='Size Comparison'
						xData={itemNamesSize}
						yData={itemSizes}
						colors={itemColorsSize}
						xAxisLabel={'Item Name'}
						yAxisLabel={'Size (cm3)'}
						legendLabels={['Recommended Item', 'Liked Items']}
					/>
				</Box>
			</Box>

			{/* Recommended Item Details Section */}
			<RecommendedItemDetails
				recommendedItem={recommendedItem}
				explanation={explanation}
				additionalInfo={additionalInfo}
			/>
		</Box>
	)
}

export default RecommendationInfo
