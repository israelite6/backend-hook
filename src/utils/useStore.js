import React from "react";
import Reducer from "./Reducer";

export default function useStore() {
  const [cache, setCache] = React.useReducer(Reducer, {});
  return { cache, setCache };
}
