let Variable = { collect: {}, config: {} };

export const setVariable = ({ key, value }) => {
  Variable[key] = value;
};

export const getVariable = (key) => {
  return Variable[key];
};
