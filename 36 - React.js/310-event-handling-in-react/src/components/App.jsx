import React, {useState} from "react";

function App() {
  const [bgColor, setBgColor] = useState("white");

  function mouseOver() {
    setBgColor("black");
  }

  function mouseLeave() {
    setBgColor("white");
  }

  return (
    <div className="container">
      <h1>Hello</h1>
      <input type="text" placeholder="What's your name?" />
      <button style={{backgroundColor: bgColor}} onMouseOver={mouseOver} onMouseLeave={mouseLeave}>Submit</button>
    </div>
  );
}

export default App;
