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
				maxWidth: 480,
				height: 'auto',
				margin: 'auto',
				backgroundColor: '#FFF',
				borderRadius: 2,
				boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
				display: 'flex',
				flexDirection: 'column',
				overflow: 'hidden',
			}}
		>
			<CardMedia
				component="img"
				height="300"
				image={item.image_path}
				alt={item.name}
				sx={{
					objectFit: 'cover',
					borderBottom: '1px solid #E0E0E0',
				}}
			/>
			<CardContent sx={{ padding: 3 }}>
				<Typography
					variant="h6"
					component="div"
					sx={{ fontWeight: 600, color: '#333', marginBottom: 1 }}
				>
					{item.name}
				</Typography>
				<Typography
					variant="body2"
					sx={{ color: '#555', marginBottom: 1 }}
				>
					Category: {item.category}
				</Typography>
				<Typography
					variant="body1"
					sx={{ fontWeight: 500, color: '#0058A3' }}
				>
					Price: ${item.price}
				</Typography>
			</CardContent>
			<CardActions
				sx={{
					padding: 3,
					backgroundColor: '#F9F9F9',
					borderTop: '1px solid #E0E0E0',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Button
					variant="outlined"
					sx={{
						color: '#D32F2F',
						borderColor: '#D32F2F',
						textTransform: 'none',
						'&:hover': {
							backgroundColor: '#FDECEA',
							borderColor: '#D32F2F',
						},
					}}
					onClick={() => onChoice(false)}
				>
					Dislike
				</Button>
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#0058A3',
						color: '#FFF',
						textTransform: 'none',
						'&:hover': {
							backgroundColor: '#00427A',
						},
					}}
					onClick={() => onChoice(true)}
				>
					Like
				</Button>
			</CardActions>
		</Card>
	);
};

export default Cards;
