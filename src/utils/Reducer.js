import UpdateObject from "./UpdateObject";

export function Reducer(state, newState) {
  if (newState.resetCache) {
    localStorage.setItem(state.name + "_cache", JSON.stringify({}));
    return d;
  }
  let d = Object.assign({}, UpdateObject(state, newState));
  localStorage.setItem(state.name + "_cache", JSON.stringify(d));
  return d;
}

export function OptionReducer(state, newState) {
  return Object.assign({}, UpdateObject(state, newState));
}
