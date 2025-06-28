import React from "react";
import Emoji from "./Emoji";
import Title from "./Title";
import Description from "./Description";

function Card(props) {
    return (
        <div className="term">
            <dt>
                <Emoji emoji={props.emoji} />
                <Title title={props.title} />
            </dt>
            <Description description={props.description} />
        </div>
    );
}

export default Card;