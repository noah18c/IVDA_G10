import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const RecommendedItemDetails = ({ recommendedItem, explanation, additionalInfo }) => {
  return (
    <Box
      sx={{
        marginTop: '32px',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: '16px',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Recommended Item Details
      </Typography>
      <Typography>
        <strong>Name:</strong> {recommendedItem?.name} <br />
        <strong>Category:</strong> {recommendedItem?.category} <br />
        <strong>Price:</strong> {recommendedItem?.price} <br />
        <strong>Designer:</strong> {recommendedItem?.designer} <br />
        <strong>Rooms:</strong> {recommendedItem?.rooms}
      </Typography>

      <Divider sx={{ marginY: '16px' }} />

      <Typography
        variant="h6"
        sx={{
          marginBottom: '16px',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Explanation
      </Typography>
      <Typography>{explanation?.reason}</Typography>
      <Box sx={{ marginTop: '12px' }}>
        <strong>Similar Items:</strong>
        <ul style={{ marginLeft: '16px' }}>
          {explanation?.similar_items?.map((item, index) => (
            <li key={index}>
              <strong>Name:</strong> {item.name}, <strong>Category:</strong> {item.category}, <strong>Price:</strong> {item.price}
            </li>
          ))}
        </ul>
      </Box>

      <Divider sx={{ marginY: '16px' }} />

      <Typography
        variant="h6"
        sx={{
          marginBottom: '16px',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Additional Information
      </Typography>
      <Typography>
        <strong>Average Price in Cluster:</strong> {additionalInfo?.average_price_in_cluster} <br />
        <strong>Designer Average Price:</strong> {additionalInfo?.designer_average_price}
      </Typography>
    </Box>
  );
};

export default RecommendedItemDetails;
