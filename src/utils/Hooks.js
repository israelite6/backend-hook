import React from "react";

export function useData(props) {
  const [data, setData] = React.useState(false);

  return { data, setData };
}
