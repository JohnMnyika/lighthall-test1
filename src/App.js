import React, { useState, useEffect } from "react";

function ClickCounter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const storedCount = localStorage.getItem("clickCount");
        if (storedCount) {
            setCount(parseInt(storedCount));
        }
    }, []);

    const handleClick = () => {
        setCount(count + 1);
        localStorage.setItem("clickCount", count + 1);
    };

    return (
        <div className="text-center">
            <h1>Light-hall Counter App</h1>
            <p>Clicks: {count}</p>
            <button className="btn btn-primary" onClick={handleClick}>Click here</button>
        </div>
    );
}

export default ClickCounter;
