import React from "react";
import validator from "validator";
import UpdateObject from "./UpdateObject";

function validation(condition) {
  const errors = {};
  const validate = {};
  Object.keys(condition).map(field => {
    let error = [];
    Object.keys(condition[field]).map(rule => {
      switch (rule) {
        case "email":
          if (
            !validator.isEmail(
              condition[field].value ? condition[field].value : ""
            ) &&
            !validator.isEmpty(
              condition[field].value ? condition[field].value : ""
            )
          ) {
            error.push(condition[field][rule]);
          }
          break;
        case "required":
          if (
            validator.isEmpty(
              condition[field].value ? condition[field].value : ""
            )
          ) {
            error.push(condition[field][rule]);
          }
          break;
        case "password":
          let val = condition[field][rule].split("|");

          if (condition[val[0]].value !== condition[field].value) {
            error.push(val[1]);
          }
          break;
      }
    });
    if (error.length > 0) {
      Object.assign(errors, { [field]: error });
      Object.assign(validate, { [field]: true });
    }
  });

  return { validate: validate, errors: errors };
}
export function useForm(props) {
  //const { data, setdata } = context;
  //const { cache, setCache } = React.useContext(AppContext);
  const [data, setData] = React.useState({
    validationData: {},
    errors: {},
    data: {}
  });

  const handleInput = event => {
    try {
      event.persist();
    } catch (e) {}

    setData(r => {
      return {
        ...r,
        validationData: UpdateObject(r.validationData, {
          [event.target.name]: { value: event.target.value }
        }),
        errors: validation(
          UpdateObject(r.validationData, {
            [event.target.name]: { value: event.target.value }
          })
        ).errors,
        data: UpdateObject(r.data, {
          [event.target.name]: event.target.value
        })
      };
    });
  };

  const onSubmit = submitCallback => event => {
    if (event) {
      event.preventDefault();
    }
    setData(r => {
      return {
        ...r,
        errors: validation(r.validationData).errors
      };
    });
    if (Object.keys(validation(data.validationData).errors).length > 0) {
      return null;
    }
    if (submitCallback) {
      return submitCallback(data.data);
    } else {
      return data.data;
    }
  };
  const reset = () => {
    setData({ validationData: {}, errors: {}, data: {} });
  };
  const setValidation = data => {
    //setdata({ validationData: data });
    setData(r => ({
      ...r,
      validationData: UpdateObject(r.validationData, data)
    }));
  };

  const setInput = (data, fields) => {
    if (typeof data !== "object" && Array.isArray(data)) {
      reset();
    }

    try {
      if (fields) {
        fields.map(fm => {
          if (data[fm]) {
            handleInput({
              target: { name: fm, value: data[fm] },
              persist: function() {}
            });
          }
          return fm;
        });
      } else {
        Object.keys(data).map(field => {
          if (data[field]) {
            handleInput({
              target: { name: field, value: data[field] },
              persist: function() {}
            });
          }

          return field;
        });
      }
    } catch (e) {
      // reset();
    }
  };

  const getInput = field => {
    return data.data[field] ? data.data[field] : "";
  };

  return {
    handleInput,
    onSubmit,
    reset,
    setValidation,
    data,
    setInput,
    getInput
  };
}
