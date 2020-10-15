let Variable = { collect: {}, config: {} };

export const setVariable = ({ key, value }) => {
  Variable[key] = value;
};

export const getVariable = (key) => {
  return Variable[key];
};

export function Store(key) {
  const set = (value) => {
    Variable[key] = value;
  };

  const get = () => {
    return Variable[key];
  };

  return { set, get };
}
