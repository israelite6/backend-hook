import collect from "collect.js";

let Variable = { collect: {}, config: {} };

export const setVariable = ({ key, value }) => {
  Variable[key] = value;
};

export const getVariable = (key) => {
  return Variable[key];
};

export const Collect = ({ name, data }) => {
  if (!Variable["collect"][name]) {
    Variable["collect"][name] = {};
  }
  if (data) {
    Variable["collect"][name] = new collect(data);
  }

  return Variable["collect"][name];
};
