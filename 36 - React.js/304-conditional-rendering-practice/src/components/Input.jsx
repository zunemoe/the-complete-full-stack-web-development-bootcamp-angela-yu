import React from "react";

function Input(props) {
    return (
        <input 
            type = {props.type}
            placeholder = {props.placeholder}
            autoComplete="false"
        />
    );
}

export default Input;