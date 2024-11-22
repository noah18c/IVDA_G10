import React from 'react';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
} from '@mui/material';

const Cards = ({ item, onChoice }) => {
	return (
		<Card
			sx={{
				width: '100%', // Takes full width of its container
				maxWidth: 500, // Limits maximum width
				height: '100%', // Takes full height when constrained
				maxHeight: 600, // Sets a fixed height for consistency
				margin: 'auto',
				boxShadow: 3,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between', // Ensures actions stay at the bottom
			}}
		>
			<CardMedia
				component='img'
				height='300'
				image={item.image_path}
				alt={item.name}
				sx={{ objectFit: 'cover' }} // Ensures image fits within the container
			/>
			<CardContent>
				<Typography variant='h6' component='div'>
					{item.name}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{item.category}
				</Typography>
				<Typography variant='body1' color='text.primary'>
					Price: ${item.price}
				</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: 'space-between' }}>
				<Button
					variant='contained'
					color='error'
					onClick={() => onChoice(false)}
				>
					Dislike
				</Button>
				<Button
					variant='contained'
					color='success'
					onClick={() => onChoice(true)}
				>
					Like
				</Button>
			</CardActions>
		</Card>
	);
};

export default Cards;
