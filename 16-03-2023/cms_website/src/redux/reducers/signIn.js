import * as ACTION_TYPES from "../actions/actionTypes";
import { combineReducers } from "redux";

const fetchSignIn = (state = false, action) => {
  switch (action.type) {
    case ACTION_TYPES.SIGN_IN:
      return true;
    case ACTION_TYPES.SIGN_IN_COMPLETE:
      return false;
    default:
      return state;
  }
};

const signInComplete = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SIGN_IN_COMPLETE:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  fetchSignIn,
  signInComplete,
});
