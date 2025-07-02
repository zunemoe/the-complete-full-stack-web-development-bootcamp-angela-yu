import React, { useState } from "react";

function CreateArea(props) {
  // console.log("CreateArea component rendered");
  // console.log("CreateArea props:", props);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.log("Form submitted with note:", note);
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          name="title" 
          placeholder="Title" 
          type="text"
          value={note.title}
          onChange={handleChange}
          />
        <textarea 
          name="content" 
          placeholder="Take a note..." 
          rows="3" 
          value={note.content}
          onChange={handleChange}
          />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
