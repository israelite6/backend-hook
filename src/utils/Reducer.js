import UpdateObject from "./UpdateObject";
import { setCacheData } from "./Cache";

export function Reducer(state, newState) {
  if (newState.resetCache) {
    delete newState.resetCache;
    localStorage.setItem(newState.name + "_cache", JSON.stringify(newState));
    setCacheData(newState);
    return newState;
  }
  let d = Object.assign({}, UpdateObject(state, newState));
  localStorage.setItem(state.name + "_cache", JSON.stringify(d));
  setCacheData(d);
  return d;
}

export function OptionReducer(state, newState) {
  return Object.assign({}, UpdateObject(state, newState));
}
