import React from 'react';
import Plot from 'react-plotly.js';
import { Box, Typography } from '@mui/material';

const BarChart = ({
	title,
	xData,
	yData,
	xAxisLabel = 'X-Axis',
	yAxisLabel = 'Y-Axis',
	showLegend = true, 
}) => {
	const singleColor = '#ffe53a'; 
	const selectedColor = '#ffe53a'; 
	const likedColor = '#0058a3'; 

	return (
		<Box>
			<Typography
				variant="h6"
				sx={{
					textAlign: 'center',
					marginBottom: '8px',
					fontWeight: 'bold',
					color: '#555',
				}}
			>
				{title}
			</Typography>
			<Plot
				data={
					showLegend
						? [
								{
									type: 'bar',
									x: [xData[0]],
									y: [yData[0]],
									marker: { color: selectedColor },
									name: 'Selected Item', 
									hoverinfo: 'x+y+name',
								},
								// Liked Items (Blue)
								{
									type: 'bar',
									x: xData.slice(1), 
									y: yData.slice(1),
									marker: { color: likedColor },
									name: 'Liked Items',
									hoverinfo: 'x+y+name',
								},
						  ]
						: [
								// All Items in Single Color
								{
									type: 'bar',
									x: xData,
									y: yData,
									marker: { color: singleColor },
									hoverinfo: 'x+y',
								},
						  ]
				}
				layout={{
					xaxis: {
						title: xAxisLabel,
						tickangle: -45,
						automargin: true,
					},
					yaxis: {
						title: yAxisLabel,
					},
					showlegend: showLegend,
					legend: {
						x: 1,
						y: 1,
						orientation: 'v',
					},
					margin: { t: 40 },
				}}
				style={{ width: '100%', height: '300px' }}
			/>
		</Box>
	);
};

export default BarChart;
