import React from "react";
import BaseFrorm from "./BaseForm";
import { AppContext } from "../provider/AppProvider";
import FetchFn from "../utils/FetchFn";

function FormChild(props) {
  const { options, setOptions, resetCache } = React.useContext(AppContext);

  const handleSubmit = callBack => () => {
    console.log(props.onSubmit(callBack));
    if (props.onSubmit(callBack)) {
      setOptions({ appLoading: true });
      FetchFn({
        uri: options.authUrl + "/logout",
        method: "GET"
      })
        .then(res => {
          setOptions({ appLoading: false });
          localStorage.removeItem(options.name + "_token");
          if (props.hasOwnProperty("onSuccess")) {
            resetCache();
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

  React.useEffect(() => {
    handleSubmit()();
  }, []);
  const children = React.Children.map(props.children, child => {
    return React.cloneElement(child, {
      //errors: props.errors,
      //handleInput: props.handleInput,
      //data: props.data,
      //handleSubmit,
      //setValidation: props.setValidation,
      //getInput: props.getInput,
      //setInput: props.setInput
    });
  });
  return <React.Fragment>{children}</React.Fragment>;
}
export default function Logout(props) {
  return (
    <BaseFrorm {...props}>
      <FormChild {...props}>{props.children}</FormChild>
    </BaseFrorm>
  );
}
