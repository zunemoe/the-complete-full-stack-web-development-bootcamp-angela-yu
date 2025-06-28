import React from "react";
import NoteTitle from "./NoteTitle";
import NoteContent from "./NoteContent";

function Note(props) {
  return (
    <div className="note">      
      <NoteTitle title={props.title} />
      <NoteContent content={props.content} />
    </div>
  );
}

export default Note;
