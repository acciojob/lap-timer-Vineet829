import React, {useState, useEffect, useRef} from 'react'

function LapTimer() {
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState([])
    const timeRef = useRef(null)
    const startTime = () => {
        setIsRunning(true)
    }
    const stopTime = () => {
        setIsRunning(false)
    }
    const handleLap = () => {
        setLaps((prev) => [...prev, formatTime(time)])
    }

    const handleReset = () => {
        setIsRunning(false)
        setTime(0)
        setLaps([])
    }
    useEffect(() => {
        if(isRunning){
            timeRef.current = setInterval(()=> {
                setTime((prev) => prev + 1)
            }, 10)
        }
        else if(!isRunning && timeRef.current){
            clearInterval(timeRef.current)
        }
return () => {
    clearInterval(timeRef.current)
}
}, [isRunning])

    const formatTime = (centiseconds) => {
        const minutes = Math.floor(centiseconds / 6000);
        const seconds = Math.floor((centiseconds % 6000) / 100);
        const centisec = centiseconds % 100;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centisec).padStart(2, '0')}`;
    };
    return (
    <div>
    <div className="timer">{formatTime(time)}</div>
    <div className="box">
    <button className="start" onClick={startTime}>Start</button>
    <button className="stop" onClick={stopTime}>Stop</button>
    <button className="lap" onClick={handleLap}>Lap</button>
    <button className="reset" onClick={handleReset}>Reset</button>

</div>
<ul>
    {laps.map((item, index) => 
    <li key={index}>{item}</li>
    )}
</ul>
</div>
  )
}

export default LapTimer