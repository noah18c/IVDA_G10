import React, { useEffect, useState } from 'react';
import Slider from './components/Slider';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/data')
            .then((response) => response.json())
            .then((data) => setData(data.message))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>React + Flask WebApp</h1>
            <p>{data ? data : 'Loading...'}</p>
            <Slider />
        </div>
    );
}

export default App;
