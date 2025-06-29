import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setContact((prevContact) => {
      return {
        ...prevContact,
        [name]: value
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitted(true);    
  }

  return (
    <div className="container">
      {isSubmitted ? (
        <>
          <h1>
            Hello {contact.fName} {contact.lName} !
          </h1>
          <p>{contact.email}</p>
        </>
      ) : (
        <h1>Hello !</h1>
      )}

      <form>
        <input
          name="fName"
          placeholder="First Name"
          value={contact.fName}
          onChange={handleChange}
        />
        <input
          name="lName"
          placeholder="Last Name"
          value={contact.lName}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={contact.email}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
