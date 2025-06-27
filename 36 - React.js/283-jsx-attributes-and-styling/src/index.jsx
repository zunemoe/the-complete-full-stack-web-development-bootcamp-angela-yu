import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <h1 className="heading" contentEditable="true" spellCheck="false">My Favourite Foods</h1>
    <div className="container">
      <img className="img" src="https://picsum.photos/100?grayscale"/>
      <img className="img" src="https://picsum.photos/100?random"/>
      <img className="img" src="https://picsum.photos/100"/>
    </div>    
  </div>
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
