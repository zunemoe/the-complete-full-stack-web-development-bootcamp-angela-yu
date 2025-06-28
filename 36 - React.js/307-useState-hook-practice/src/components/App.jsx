import React, {useState} from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  function updateTime() {
    setCurrentTime(new Date().toLocaleTimeString());
  }

  setInterval(updateTime, 1000);

  return (
    <div className="container">
      <h1>{currentTime}</h1>
      
      <button onClick={updateTime}>Get Time</button>
    </div>
  );
}

export default App;
