import React, { useState } from 'react'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Star, MilitaryTech, EmojiEvents } from '@mui/icons-material';

const Slider = ({ cards, onCardSelect }) => {
	const [selectedCard, setSelectedCard] = useState(0)

	const handleCardClick = (cardId) => {
		setSelectedCard(cardId)

		if (onCardSelect) {
			onCardSelect(cardId)
		}
	}

	return (
		<Box>
			{/* Title */}
			<Typography
				variant='h5'
				sx={{
					textAlign: 'center',
					marginBottom: '24px',
					fontWeight: 'bold',
					color: '#0058A3',
					textTransform: 'uppercase',
					letterSpacing: 1.5,
				}}
			>
				Recommendations
			</Typography>

			{/* Vertical Slider */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					overflowY: 'auto',
					gap: 3,
					padding: 2,
					maxHeight: '140vh',
					scrollbarWidth: 'none',
					'&::-webkit-scrollbar': { display: 'none' },
				}}
			>
				{cards.map((card, index) => (
					<Card
						key={card.item_id}
						onClick={() => handleCardClick(card.item_id)}
						sx={{
							width: '100%',
							height: 'auto',
							backgroundColor:
								selectedCard === card.item_id
									? '#DDEFFF'
									: '#FFFFFF',
							border: `2px solid ${
								selectedCard === card.item_id
									? '#0058A3'
									: '#E0E0E0'
							}`,
							borderRadius: '16px',
							boxShadow:
								selectedCard === card.item_id
									? '0 8px 16px rgba(0,0,0,0.1)'
									: '0 4px 8px rgba(0,0,0,0.05)',
							flexShrink: 0,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							cursor: 'pointer',
							transition: 'transform 0.3s, box-shadow 0.3s',
							'&:hover': {
								transform: 'scale(1.05)',
								boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
							},
						}}
					>
						{/* Image */}
						<CardMedia
							component='img'
							image={card.image_path}
							alt={card.name}
							sx={{
								height: 200,
								width: '100%',
								objectFit: 'cover',
								borderTopLeftRadius: '16px',
								borderTopRightRadius: '16px',
							}}
						/>
						{/* Card Content */}
						<CardContent
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'flex-start',
								padding: 2,
								width: '100%',
							}}
						>
							{index === 0 && (
								<Star
									sx={{
										color: '#FFD700',
										fontSize: 32,
										alignSelf: 'center',
										marginBottom: 4,
									}}
								/>
							)}
							{index === 1 && (
								<MilitaryTech
									sx={{
										color: '#C0C0C0',
										fontSize: 32,
										alignSelf: 'center',
										marginBottom: 4,
									}}
								/>
							)}
							{index === 2 && (
								<EmojiEvents
									sx={{
										color: '#CD7F32',
										fontSize: 32,
										alignSelf: 'center',
										marginBottom: 4,
									}}
								/>
							)}
							{/* Name */}
							<Typography
								variant='h6'
								sx={{
									fontWeight: 'bold',
									textAlign: 'center',
									marginBottom: '8px',
									color: '#333333',
								}}
							>
								{card.name}
							</Typography>

							{/* Item Number */}
							<Typography
								variant='body2'
								color='text.secondary'
								sx={{
									textAlign: 'left',
									marginTop: '8px',
									color: '#666666',
								}}
							>
								Item Number: {index + 1}
							</Typography>

							{/* Category */}
							<Typography
								variant='body2'
								color='text.secondary'
								sx={{
									textAlign: 'left',
									color: '#666666',
								}}
							>
								Category: {card.category}
							</Typography>

							{/* Price */}
							<Typography
								variant='body2'
								color='text.secondary'
								sx={{
									textAlign: 'left',
									color: '#666666',
								}}
							>
								Price: ${card.price}
							</Typography>

							{/* Optional Fields */}
							{card.designer && (
								<Typography
									variant='body2'
									color='text.secondary'
									sx={{
										textAlign: 'left',
										color: '#666666',
									}}
								>
									Designer: {card.designer}
								</Typography>
							)}
							{card.short_description && (
								<Typography
									variant='body2'
									color='text.secondary'
									sx={{
										textAlign: 'left',
										marginTop: '8px',
										color: '#666666',
									}}
								>
									{card.short_description}
								</Typography>
							)}
						</CardContent>
					</Card>
				))}
			</Box>
		</Box>
	)
}

export default Slider
