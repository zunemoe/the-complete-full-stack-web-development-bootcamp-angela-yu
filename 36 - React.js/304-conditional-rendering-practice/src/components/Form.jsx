import React from "react";
import Input from "./Input";
import Button from "./Button";

function Form(props) {
  return (
    <form className="form">
      <Input type="text" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      {
        !props.userIsRegistered && <Input type="password" placeholder="Confirm Password"/>
      }
      <Button userIsRegistered={props.userIsRegistered} />      
    </form>
  );
}

export default Form;
