
import React, {useState, useEffect, useRef} from "react";
import './../styles/App.css';
import LapTimer from "./LapTimer";

const App = () => {
  const [time, setTimer] = useState("00:00:00")
  const [laps, setLaps] = useState(null)
  const [startTime, setStartTime] = useState(null)
  
  return (
    <div className="container">
    <LapTimer/>
    </div>
  )
}

export default App
