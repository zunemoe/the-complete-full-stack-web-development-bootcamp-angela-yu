import React from "react";

function Button(props) {
    return (
        <button type="submit">
            {props.userIsRegistered ? "Login" : "Register"}
        </button>
    );
}

export default Button;