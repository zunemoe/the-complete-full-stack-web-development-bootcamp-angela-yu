import React from "react";

function Emoji(props) {
    return (
        <span className="emoji" role="img" aria-label={props.emoji}>
            {props.emoji}
        </span>
    );
}

export default Emoji;