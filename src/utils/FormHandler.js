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
export function FormHandler(setFormData, formData) {
  //const { formData, setFormData } = context;
  const handleInput = event => {
    event.persist();
    setFormData(r => {
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

  const onSubmit = submitCallback => {
    console.log(submitCallback);
    setFormData(r => {
      return {
        ...r,
        errors: validation(r.validationData).errors
      };
    });
    if (Object.keys(formData.errors).length > 0) {
      return null;
    }
    if (submitCallback) {
      return submitCallback(formData.data);
    } else {
      return formData.data;
    }
  };
  const reset = () => {
    setFormData({ validationData: {}, errors: {}, data: {} });
  };
  const setValidation = data => {
    //setFormData({ validationData: data });
    setFormData(r => ({
      ...r,
      validationData: UpdateObject(r.validationData, data)
    }));
  };

  return { handleInput, onSubmit, reset, setValidation };
}
