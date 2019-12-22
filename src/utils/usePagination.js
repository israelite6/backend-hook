import React from "react";

export default function usePagination(props) {
  const [option, setOption] = React.useState({});

  const setData = data => {
    setOption(data);
  };

  return { setData };
}
