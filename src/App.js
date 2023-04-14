import React, { useState, useEffect } from 'react';

function ClickCounter() {
    const [count, setCount] = useState(() => {
        const savedCount = localStorage.getItem('count');
        return savedCount !== null ? parseInt(savedCount, 10) : 0;
    });
    const [clicksByCountry, setClicksByCountry] = useState({});

    function handleClick() {
        const country = window.navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
                .then((response) => response.json())
                .then((data) => {
                    const country = data.address.country;
                    setClicksByCountry(prevClicksByCountry => ({
                        ...prevClicksByCountry,
                        [country]: (prevClicksByCountry[country] || 0) + 1,
                    }));
                })
                .catch((error) => {
                    console.error(error);
                });
        });
        setCount(prevCount => {
            const newCount = prevCount + 1;
            localStorage.setItem('count', newCount);
            return newCount;
        });
    }

    useEffect(() => {
        const savedClicksByCountry = localStorage.getItem('clicksByCountry');
        if (savedClicksByCountry !== null) {
            setClicksByCountry(JSON.parse(savedClicksByCountry));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('clicksByCountry', JSON.stringify(clicksByCountry));
    }, [clicksByCountry]);

    return (
        <div className='text-center'>
            <h1>Light-hall Counter App</h1>
            <p className='p'>Number of clicks: {count}</p>
            <button className='btn btn-primary btn-lg' onClick={handleClick}>Click here</button>
                <div className='table-responsive-md'>
                    <table className='table table-striped'>
                        <thead>
                        <tr>
                            <th>Country</th>
                            <th>Clicks</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.entries(clicksByCountry).map(([country, clicks]) => (
                            <tr key={country}>
                                <td>{country}</td>
                                <td>{clicks}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
}

export default ClickCounter;
