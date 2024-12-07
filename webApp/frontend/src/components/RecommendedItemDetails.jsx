import React from 'react';
import { Box, Typography, Divider, Chip, Avatar, List, ListItem, ListItemText } from '@mui/material';
import { AttachMoney, Category, Info, Star } from '@mui/icons-material';

const RecommendedItemDetails = ({ recommendedItem, explanation, additionalInfo }) => {
  return (
    <Box
      sx={{
        marginTop: '32px',
        backgroundColor: '#FFFFFF',
        padding: '40px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '32px',
        width: '100%',
        fontFamily: "'Poppins', sans-serif",
        boxSizing: 'border-box',
      }}
    >
      {/* Recommended Item Section */}
      <Box sx={{ gridColumn: 'span 2' }}>
        <Typography
          variant="h5"
          sx={{
            marginBottom: '24px',
            fontWeight: 'bold',
            color: '#0058A3',
            display: 'flex',
            alignItems: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          <Star sx={{ marginRight: '12px', color: '#FFD700', fontSize: 30 }} />
          Recommended Item
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <Box>
            <Typography sx={{ fontSize: '16px', marginBottom: '8px', color: '#333' }}>
              <strong>Name:</strong> {recommendedItem?.name || 'N/A'}
            </Typography>
            <Typography sx={{ fontSize: '16px', marginBottom: '8px', color: '#333' }}>
              <strong>Category:</strong> {recommendedItem?.category || 'N/A'}
            </Typography>
            <Typography sx={{ fontSize: '16px', marginBottom: '8px', color: '#333' }}>
              <strong>Designer:</strong> {recommendedItem?.designer || 'N/A'}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: '16px', marginBottom: '8px', color: '#333' }}>
              <strong>Price:</strong>{' '}
              <Chip
                label={`$${recommendedItem?.price || 'N/A'}`}
                avatar={
                  <Avatar sx={{ backgroundColor: '#FFD700' }}>
                    <AttachMoney sx={{ color: '#FFFFFF' }} />
                  </Avatar>
                }
                sx={{
                  backgroundColor: '#F0F4F8',
                  fontSize: '14px',
                  color: '#333',
                }}
              />
            </Typography>
            <Typography sx={{ fontSize: '16px', marginBottom: '8px', color: '#333' }}>
              <strong>Rooms:</strong>{' '}
              {Array.isArray(recommendedItem?.rooms) ? recommendedItem.rooms.join(', ') : 'N/A'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ gridColumn: 'span 2', marginY: '24px', borderColor: '#E0E0E0' }} />

      {/* Explanation Section */}
      <Box>
        <Typography
          variant="h5"
          sx={{
            marginBottom: '24px',
            fontWeight: 'bold',
            color: '#0058A3',
            display: 'flex',
            alignItems: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          <Info sx={{ marginRight: '12px', color: '#1E88E5', fontSize: 30 }} />
          Why You Liked This
        </Typography>

        <Typography sx={{ fontSize: '16px', color: '#666', lineHeight: '1.8' }}>
          {explanation?.reason || 'N/A'}
        </Typography>
      </Box>

      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 'bold', marginBottom: '16px', color: '#333', fontSize: '18px' }}
        >
          Similar Items
        </Typography>
        <List>
          {explanation?.similar_items?.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                padding: '12px 0',
                borderBottom: '1px solid #E0E0E0',
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  style: { color: '#0058A3', fontWeight: 'bold', fontSize: '16px' },
                }}
                secondaryTypographyProps={{
                  style: { color: '#666', fontSize: '14px' },
                }}
                primary={`${item.name || 'N/A'} (${item.category || 'N/A'})`}
                secondary={`Price: $${item.price || 'N/A'}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ gridColumn: 'span 2', marginY: '24px', borderColor: '#E0E0E0' }} />

      {/* Additional Information Section */}
      <Box>
        <Typography
          variant="h5"
          sx={{
            marginBottom: '24px',
            fontWeight: 'bold',
            color: '#0058A3',
            display: 'flex',
            alignItems: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          <Category sx={{ marginRight: '12px', color: '#FF7043', fontSize: 30 }} />
          Additional Information
        </Typography>

        <Typography sx={{ fontSize: '16px', color: '#333' }}>
          <strong>Average Price in Cluster:</strong>{' '}
          <Chip
            label={`$${additionalInfo?.average_price_in_cluster || 'N/A'}`}
            sx={{
              backgroundColor: '#F8F9FA',
              fontSize: '14px',
              color: '#333',
            }}
          />
        </Typography>
      </Box>

      <Box>
        <Typography sx={{ fontSize: '16px', color: '#333' }}>
          <strong>Designer Average Price:</strong>{' '}
          <Chip
            label={`$${additionalInfo?.designer_average_price || 'N/A'}`}
            sx={{
              backgroundColor: '#E8F5FE',
              fontSize: '14px',
              color: '#0058A3',
            }}
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default RecommendedItemDetails;
