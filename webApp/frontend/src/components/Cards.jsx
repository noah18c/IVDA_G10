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
				width: '100%',
				maxWidth: 500,
				height: '100%', 
				maxHeight: 600, 
				margin: 'auto',
				boxShadow: 3,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between', 
			}}
		>
			<CardMedia
				component='img'
				height='300'
				image={item.image_path}
				alt={item.name}
				sx={{ objectFit: 'cover' }} 
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
