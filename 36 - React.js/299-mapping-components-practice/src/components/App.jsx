import React from "react";
import ReactDOM from "react-dom/client";
import Dictionary from "./Dictionary";
import emojipedia from "../emojipedia.js";

const moji = emojipedia.map(function (emoji) {
  emoji.meaning = emoji.meaning.substring(0, 100);
  return emoji.meaning;
});

console.log("moji", moji);

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <Dictionary emojis={emojipedia} />
    </div>
  );
}

export default App;
