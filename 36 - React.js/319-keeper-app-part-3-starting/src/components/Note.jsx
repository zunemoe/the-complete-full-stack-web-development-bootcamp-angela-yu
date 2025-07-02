import React from "react";

function Note(props) {
  // console.log("Note component rendered");
  // console.log("Note props:", props);
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={() => {
        props.onDelete(props.id);
      }}
      >DELETE</button>
    </div>
  );
}

export default Note;
