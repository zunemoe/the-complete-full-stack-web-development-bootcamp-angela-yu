import React, { useState } from "react";
import { useEffect } from "react";
import TodoItem from "./TodoItem";

function App() {
  const [items, setItems] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    console.log("Items updated:", items);
  }, [items]);

  function handleInputChange(event) {
    const { value } = event.target;
    setInputText(value);
  }

  function handleAddItem() {
    if (inputText.length > 0) {
      setItems(prevItems => [
        inputText,
        ...prevItems
                
      ]);
    
      setInputText(""); // Clear the input after adding the item        
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleAddItem();
    } else if (event.key === "Escape") {
      setInputText(""); // Clear the input when Escape is pressed
    }
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" placeholder="To-do item" value={inputText} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
        <button onClick={handleAddItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((item, index) => {            
            return <TodoItem key={index} item={item} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
