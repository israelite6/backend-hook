import React from "react";
import { FormHandler } from "./../utils/FormHandler";

export default function BaseFrorm(props) {
  const [formData, setDataForm] = React.useState({
    validationData: {},
    errors: {},
    data: {}
  });
  const { handleInput, onSubmit, reset, setValidation } = FormHandler(
    setDataForm,
    formData
  );

  const setInput = (data, fields) => {
    if (typeof data !== "object" && Array.isArray(data)) {
      reset();
    }

    try {
      if (fields) {
        fields.map(fm => {
          handleInput({
            target: { name: fm, value: data[fm] },
            persist: function() {}
          });
          return fm;
        });
      } else {
        Object.keys(data).map(field => {
          handleInput({
            target: { name: field, value: data[field] },
            persist: function() {}
          });
          return field;
        });
      }
    } catch (e) {
      // reset();
    }
  };
  const getInput = field => {
    return formData.data[field] ? formData.data[field] : "";
  };

  const children = React.Children.map(props.children, child => {
    return React.cloneElement(child, {
      onSubmit,
      handleInput,
      errors: formData.errors,
      data: formData.data,
      setValidation,
      getInput,
      setInput,
      runMutation: props.runMutation
    });
  });
  return <React.Fragment>{children}</React.Fragment>;
}
