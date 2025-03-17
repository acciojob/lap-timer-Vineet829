import React, { useState, useEffect, useRef } from 'react';

const LapTimer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 10);
        } else if (!isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const lapTimer = () => {
        setLaps([...laps, formatTime(time)]);
    };
    const resetTimer = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const formatTime = (centiseconds) => {
        const minutes = Math.floor(centiseconds / 6000);
        const seconds = Math.floor((centiseconds % 6000) / 100);
        const centisec = centiseconds % 100;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centisec).padStart(2, '0')}`;
    };

    return (
        <div>
            <h1>{formatTime(time)}</h1>
            <div>
                <button onClick={startTimer}>Start</button>
                <button onClick={stopTimer}>Stop</button>
                <button onClick={lapTimer}>Lap</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
            <h2>Laps:</h2>
            <ul>
                {laps.map((lap, index) => (
                    <li key={index}>{lap}</li>
                ))}
            </ul>
        </div>
    );
};

export default LapTimer;
