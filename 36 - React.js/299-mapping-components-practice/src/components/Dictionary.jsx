import React from "react";
import Card from "./Card";

function Dictionary(props) {
    return (
        <dl className="dictionary">
            {props.emojis.map(emoji => (
                <Card 
                    key={emoji.id}
                    emoji={emoji.emoji}
                    title={emoji.name}
                    description={emoji.meaning}
                />
            ))}
        </dl>
    );
}

export default Dictionary;