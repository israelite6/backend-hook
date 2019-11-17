import React from "react";
import Mutation from "./Mutation";
import BaseFrorm from "./BaseForm";

function FormChild(props) {
  const handleSubmit = callBack => () => {
    if (props.onSubmit(callBack)) {
      props.runMutation(props.onSubmit(callBack));
    }
  };
  const children = React.Children.map(props.children, child => {
    return React.cloneElement(child, {
      errors: props.errors,
      handleInput: props.handleInput,
      data: props.data,
      handleSubmit,
      setValidation: props.setValidation,
      getInput: props.getInput,
      setInput: props.setInput
    });
  });
  return <React.Fragment>{children}</React.Fragment>;
}
export default function Form(props) {
  return (
    <Mutation {...props}>
      <BaseFrorm {...props}>
        <FormChild {...props}>{props.children}</FormChild>
      </BaseFrorm>
    </Mutation>
  );
}
