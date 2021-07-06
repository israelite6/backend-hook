import React from "react";
export default function useState(props) {
  const [state, setStates] = React.useState(props);
  const setState = (data) => {
    setStates((prev) => {
      if (data === "reset") {
        return {};
      }
      return { ...prev, ...data };
    });
  };
  return [state, setState];
}
