import UpdateObject from "./UpdateObject";

export default function Reducer(state, newState) {
  let d = Object.assign({}, UpdateObject(state, newState));
  localStorage.setItem(state.name + "_cache", JSON.stringify(d));
  return d;
}

export function MiniReducer(state, newState) {
  return state;
}
