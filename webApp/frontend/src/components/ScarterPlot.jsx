import React from 'react';
import Plot from 'react-plotly.js'; // Import Plotly.js component

const ScatterPlot = ({ scatterData }) => {
    const { liked_items, recommended_items } = scatterData;

    const liked_x = liked_items.map(item => item.price);
    const liked_y = liked_items.map(item => item.space); 

    const recommended_x = recommended_items.map(item => item.price); 
    const recommended_y = recommended_items.map(item => item.space); 

    return (
        <div>
            <Plot
                data={[
                    {
                        x: liked_x,
                        y: liked_y,
                        mode: 'markers',
                        type: 'scatter',
                        name: 'Liked Items',
                        marker: { color: 'blue', symbol: 'circle', size: 10 },
                    },
                    {
                        x: recommended_x,
                        y: recommended_y,
                        mode: 'markers',
                        type: 'scatter',
                        name: 'Recommended Items',
                        marker: { color: 'red', symbol: 'diamond', size: 10 },
                    },
                ]}
                layout={{
                    title: 'Price vs Space',
                    xaxis: { title: 'Price (CHF)' },
                    yaxis: { title: 'Space (cm³)' },
                }}
            />
        </div>
    );
};

export default ScatterPlot;
