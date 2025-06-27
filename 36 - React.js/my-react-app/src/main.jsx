import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Set the time manually for testing purposes
// const time = '10:30:00 PM'; // Change this to test different times
const time = new Date().toLocaleTimeString();
const style = {
  color: time.includes('AM') ? 'blue' : 'red',
}
let greeting = time.includes('AM') ? 'Good Morning!' : 'Good Evening!';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <h1 className="heading" style={style}> {greeting} </h1>    
    </div>    
  </StrictMode>,
);


