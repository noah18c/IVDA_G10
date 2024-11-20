import React, { useEffect, useState } from 'react';
import Slider from './components/Slider';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch data from the Flask backend via the Vite proxy
        fetch('/api/data')
            .then((response) => response.json())
            .then((data) => setData(data.message))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>React + Flask WebApp</h1>
            <p>{data ? data : 'Loading...'}</p>
            <Slider />
        </div>
    );
}

export default App;
