import React from "react";
import BaseFrorm from "./BaseForm";
import { AppContext } from "../provider/AppProvider";
import FetchFn from "../utils/FetchFn";

function FormChild(props) {
  const { options, setOptions } = React.useContext(AppContext);

  const handleSubmit = callBack => () => {
    if (props.onSubmit(callBack)) {
      setOptions({ appLoading: true });
      FetchFn({
        uri: options.services[props.service] + props.url,
        data: props.onSubmit(callBack),
        method: props.method ? props.method : "POST"
      })
        .then(res => {
          setOptions({ appLoading: false });
          if (props.hasOwnProperty("onSuccess")) {
            props.onSuccess(res);
          }
        })
        .catch(err => {
          setOptions({ appLoading: false });
          if (props.hasOwnProperty("onError")) {
            props.onError(err);
          }
        });
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
export default function Fetch(props) {
  return (
    <BaseFrorm {...props}>
      <FormChild {...props}>{props.children}</FormChild>
    </BaseFrorm>
  );
}
