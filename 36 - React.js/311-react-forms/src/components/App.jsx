import React, {useState} from "react";

function App() {
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [inputName, setInputName] = useState("");

  function handleInputChange(event) {
    setInputName(event.target.value);

    event.preventDefault();
  }

  function updateName() {
    setName(inputName);
  }

  function updatefName(event) {
    setfName(event.target.value);    
  }

  function updatelName(event) {
    setlName(event.target.value);
  }

  return (
    <div className="container">
      <h1>Hello {fname} {lname}! </h1>
      <input 
        type="text" 
        placeholder="First Name"         
        value={fname}     
        onChange={updatefName}
        />
        <input 
        type="text" 
        placeholder="Last Name"         
        value={lname}     
        onChange={updatelName}
        />
      <button onClick={updateName}>Submit</button>
    </div>
  );
}

export default App;
