import React from "react";
import UpdateObject from "./../utils/UpdateObject";

function validation(condition) {
  const errors = {};
  const validate = {};
  Object.keys(condition).map((field) => {
    let error = [];
    Object.keys(condition[field]).map((rule) => {
      switch (rule) {
        case "email":
          if (
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              condition[field].value ? condition[field].value : ""
            ) &&
            String(condition[field].value ? condition[field].value : "")
              .length !== 0
          ) {
            error.push(condition[field][rule]);
          }
          break;
        case "required":
          if (
            String(condition[field].value ? condition[field].value : "").trim()
              .length === 0
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

export default function useForm(props) {
  //const { data, setdata } = context;
  //const { cache, setCache } = React.useContext(AppContext);
  const [data, setData] = React.useState({
    validationData: {},
    errors: { submitted: false },
    data: {},
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleInput = (event) => {
    try {
      event.persist();
    } catch (e) {}

    setData((r) => {
      let value = event.target.value;

      return {
        ...r,
        validationData: UpdateObject(r.validationData, {
          [event.target.name]: { value: value },
        }),
        errors: {
          ...validation(
            UpdateObject(r.validationData, {
              [event.target.name]: { value: value },
            })
          ).errors,
          submitted: isSubmitted,
        },
        data: UpdateObject(r.data, {
          [event.target.name]: value,
        }),
      };
    });
  };

  const onSubmit = (submitCallback) => (event) => {
    if (event) {
      event.preventDefault();
    }
    setData((r) => {
      return {
        ...r,
        errors: validation(r.validationData).errors,
      };
    });
    if (
      Object.keys(validation(data.validationData).errors).filter(
        (kf) => kf !== "submitted"
      ).length > 0
    ) {
      setData((prev) => UpdateObject(prev, { errors: { submitted: true } }));
      setIsSubmitted(true);

      return null;
    }
    let d = data.data;
    Object.keys(d).map((key) => {
      if (typeof d[key] === "string") {
        d[key] = d[key].trim();
      }
      return key;
    });
    if (submitCallback) {
      return submitCallback(d);
    } else {
      return d;
    }
  };
  const reset = () => {
    setData((prev) => {
      Object.keys(prev.validationData).map((key) => {
        prev.validationData[key].value = "";
      });
      return { ...prev, errors: {}, data: {} };
    });
  };
  const setValidation = (data) => {
    //setdata({ validationData: data });
    setData((r) => ({
      ...r,
      validationData: UpdateObject(r.validationData, data),
    }));
  };

  const setInput = (data, fields) => {
    if (typeof data !== "object" && Array.isArray(data)) {
      reset();
    }

    try {
      if (fields) {
        fields.map((fm) => {
          if (data[fm] || data[fm] === false) {
            handleInput({
              target: { name: fm, value: data[fm] },
              persist: function () {},
            });
          }
          return fm;
        });
      } else {
        Object.keys(data).map((field) => {
          if (data[field] || data[field] === false) {
            handleInput({
              target: { name: field, value: data[field] },
              persist: function () {},
            });
          }

          return field;
        });
      }
    } catch (e) {
      // reset();
    }
  };

  const getInput = (field) => {
    return data.data[field] || data.data[field] === false
      ? data.data[field]
      : "";
  };

  return {
    handleInput,
    onSubmit,
    reset,
    setValidation,
    data: data.data,
    errors: data.errors,
    setInput,
    getInput,
  };
}
