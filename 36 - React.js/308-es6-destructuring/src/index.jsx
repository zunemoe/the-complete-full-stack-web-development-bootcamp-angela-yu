// CHALLENGE: uncomment the code below and see the car stats rendered
import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import cars from "./practice";

const [honda, tesla] = cars;
const [hondaTopSpeed, hondaTopColour] = [honda.speedStats.hondaTopSpeed, honda.coloursByPopularity[0]]
const [teslaTopSpeed, teslaTopColour] = [tesla.speedStats.teslaTopSpeed, tesla.coloursByPopularity[0]];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <table>
    <thead>
      <tr>
        <th>Brand</th>
        <th>Top Speed</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{tesla.model}</td>
        <td>{teslaTopSpeed}</td>
        <td>{teslaTopColour}</td>
      </tr>
      <tr>
        <td>{honda.model}</td>
        <td>{hondaTopSpeed}</td>
        <td>{hondaTopColour}</td>
      </tr>
    </tbody>
  </table>
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
