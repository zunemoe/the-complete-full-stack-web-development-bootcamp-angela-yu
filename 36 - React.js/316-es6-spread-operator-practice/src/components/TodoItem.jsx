import React from "react";

function toggleStrike(event) {
    event.target.classList.toggle("strike");
}

function TodoItem(props) {
    return (
        <div>
            <li onClick={toggleStrike}>{props.item}</li>
        </div>        
    );
}

export default TodoItem;