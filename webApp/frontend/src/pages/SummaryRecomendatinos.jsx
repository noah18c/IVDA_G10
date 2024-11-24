import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScatterPlot from '../components/ScarterPlot';
import BarChart from '../components/BarChart';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';

const SummaryRecommendations = () => {
  // State to hold the summary information
  const [summaryInfo, setSummaryInfo] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    // Function to fetch the summary information
    const fetchSummaryInfo = async () => {
      try {
        const response = await axios.get('/api/summary_info');
        setSummaryInfo(response.data.summary_info); // Save the data to state
        console.log('Summary Info:', response.data.summary_info);
      } catch (error) {
        setError('Error fetching summary info'); // Set error state
        console.error('Error fetching summary info:', error);
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    };

    // Call the fetchSummaryInfo function when the component mounts
    fetchSummaryInfo();
  }, []); // Empty dependency array ensures the API is called once on mount

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    ); // Display a loading spinner
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          color: 'error.main',
        }}
      >
        <Typography variant="h6">{error}</Typography>
      </Box>
    ); // Display an error message if there's an issue
  }

  // Accessing the scatter plot data from the summaryInfo object
  const scatterData = summaryInfo?.scatter_plot_data;
  const designerCountData = summaryInfo?.designer_count_data;
  console.log('designer: ', designerCountData);

  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F1C232', '#8E44AD'];

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Summary Recommendations
      </Typography>

      {/* Container for charts */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',  // Stack the charts vertically
          alignItems: 'center', // Center the charts horizontally
          gap: '20px', // Add space between the charts
        }}
      >
        <Paper elevation={3} sx={{ padding: '16px', width: '100%', maxWidth: '800px' }}>
          <Typography variant="h6" gutterBottom>
            Scatter Plot of Recommended and Liked Items
          </Typography>
          <ScatterPlot scatterData={scatterData} />
        </Paper>

        <Paper elevation={3} sx={{ padding: '16px', width: '100%', maxWidth: '800px' }}>
          <Typography variant="h6" gutterBottom>
            Designer Counts
          </Typography>
          <BarChart
            title="Designer Counts"
            xData={designerCountData?.designers}
            yData={designerCountData?.counts}
            colors={colors}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default SummaryRecommendations;
