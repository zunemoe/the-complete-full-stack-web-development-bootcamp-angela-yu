import React from "react";
import Card from "./Card";
import contacts from "../contacts";

function App() {
  return (
    <div>
      <h1>My Contacts</h1>
      {contacts.map(contact => (
        <Card 
          name={contact.name}
          imgUrl={contact.imgURL}
          phone={contact.phone}
          email={contact.email}
        />
      ))}
    </div>
  );
}

export default App;
