import React, {useState} from "react";


function App() {
  const [name, setName] = useState("Zune");

  function updateName(event) {
    setName(event.target.value);
  }

  return (
    <div className="container">
      <h1>Hello {name}! </h1>
      <input 
        type="text" 
        placeholder="What's your name?" 
        onChange={}
        value={name}      
        />
      <button onClick={updateName}>Submit</button>
    </div>
  );
}

export default App;
