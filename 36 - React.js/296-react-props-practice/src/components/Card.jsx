import React from 'react';
import Avatar from './Avatar';
import ContactDetail from './ContactDetail';

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="name">{props.name}</h2>
        <Avatar imgUrl={props.imgUrl} />
      </div>
      <div className="bottom">
        <ContactDetail detail={props.phone} />
        <ContactDetail detail={props.email} />
      </div>
    </div>
  );
}

export default Card;