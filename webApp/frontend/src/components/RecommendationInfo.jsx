import React from 'react'
import { Box, Typography } from '@mui/material'
import BarChart from '../components/BarChart'
import RecommendedItemDetails from './RecommendedItemDetails' // Import the new component

const RecommendationInfo = ({
	selectedItemInfoPrice,
	selectedItemInfoSize,
	selectedItemInfoExplanation,
}) => {
	// Price data
	const recommendedItemNamePrice =
		selectedItemInfoPrice?.recommended_item?.name
	const recommendedItemPrice = selectedItemInfoPrice?.recommended_item?.price

	const basketItemsPrice = selectedItemInfoPrice?.basket_items?.map(
		(item, index) => ({
			name: `${item.name} (${index + 1})`,
			price: item.price,
		})
	)

	const itemNamesPrice = [
		recommendedItemNamePrice,
		...basketItemsPrice.map((item) => item.name),
	]
	const itemPrices = [
		recommendedItemPrice,
		...basketItemsPrice.map((item) => item.price),
	]
	const itemColorsPrice = [
		'rgb(255, 99, 71)',
		...Array(basketItemsPrice.length).fill('rgb(135, 206, 250)'),
	]

	// Size data
	const recommendedItemNameSize = selectedItemInfoSize?.recommended_item?.name
	const recommendedItemSize = selectedItemInfoSize?.recommended_item?.size

	const basketItemsSize = selectedItemInfoSize?.basket_items?.map(
		(item, index) => ({
			name: `${item.name} (${index + 1})`,
			size: item.size,
		})
	)

	const itemNamesSize = [
		recommendedItemNameSize,
		...basketItemsSize.map((item) => item.name),
	]
	const itemSizes = [
		recommendedItemSize,
		...basketItemsSize.map((item) => item.size),
	]
	const itemColorsSize = [
		'rgb(255, 99, 71)',
		...Array(basketItemsSize.length).fill('rgb(135, 206, 250)'),
	]

	// Explanation data
	const recommendedItem = selectedItemInfoExplanation?.recommended_item
	const explanation = selectedItemInfoExplanation?.explanation
	const additionalInfo = selectedItemInfoExplanation?.additional_info

	return (
		<Box
			sx={{
				backgroundColor: '#f9f9f9',
				borderRadius: '12px',
				boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
				padding: '24px',
				width: '100%',
			}}
		>
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
						title='Price Comparison'
						xData={itemNamesPrice}
						yData={itemPrices}
						colors={itemColorsPrice}
						legendLabels={['Recommended Item', 'Liked Items']}
					/>
				</Box>

				<Box sx={{ flex: 1 }}>
					<BarChart
						title='Size Comparison'
						xData={itemNamesSize}
						yData={itemSizes}
						colors={itemColorsSize}
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
