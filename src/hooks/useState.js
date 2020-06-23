import React from "react";
export default function useState(props) {
  const [state, setStates] = React.useState(props);
  const setState = (data) => setStates((prev) => ({ ...prev, ...data }));
  return [state, setState];
}
