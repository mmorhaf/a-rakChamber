import * as ACTION_TYPES from "../actions/actionTypes";

//use in interface
export function signIn(data) {
  return {
    type: ACTION_TYPES.SIGN_IN,
    payload: data,
  };
}
//use in saga
export function signInComplete(data) {
  return {
    type: ACTION_TYPES.SIGN_IN_COMPLETE,
    payload: data,
  };
}
