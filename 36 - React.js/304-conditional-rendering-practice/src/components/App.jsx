import React, {useState} from "react";
import Form from "./Form";

var userIsRegistered = true;

function App() {
  const [count, setCount] = useState(10);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }
  return (
    <div className="container">
      <h1>{count}</h1>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <Form userIsRegistered={userIsRegistered} />
    </div>
  );
}

export default App;
