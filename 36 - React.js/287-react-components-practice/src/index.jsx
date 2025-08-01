import React from "react";
import ReactDOM from "react-dom/client";

const date = new Date();
const currentTime = date.getHours();

let greeting;

const customStyle = {
  color: "",
};

if (currentTime < 12) {
  greeting = "Good Morning";
  customStyle.color = "red";
} else if (currentTime < 18) {
  greeting = "Good Afternoon";
  customStyle.color = "green";
} else {
  greeting = "Good Night";
  customStyle.color = "blue";
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <h1 className="heading" style={customStyle}>
    {greeting}
  </h1>
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
