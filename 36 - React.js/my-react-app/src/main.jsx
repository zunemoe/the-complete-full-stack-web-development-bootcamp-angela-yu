import React from 'react'
import ReactDom  from 'react-dom/client'
import './index.css'

function Card(props) {
  return (
    <div className="card">
      <img src={props.img} />
      <h2>{props.name}</h2>
      <p>{props.phone}</p>
      <p>{props.email}</p>
    </div>
  );
}

ReactDom.createRoot(document.getElementById('root')).render(
  <div>
    <h1>My Contacts</h1>
    <Card img ="https://i.pravatar.cc/200?u=1" name="John Doe" phone="+123456789" email="john.doe@example.com" />
    <Card img ="https://i.pravatar.cc/200?u=2" name="Jane Smith" phone="+987654321" email="jane.smith@example.com" />
    <Card img ="https://i.pravatar.cc/200?u=3" name="Alice Johnson" phone="+1122334455" email="alice.johnson@example.com" />
  </div>
);


