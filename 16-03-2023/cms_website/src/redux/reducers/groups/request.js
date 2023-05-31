import actions from "../../actions";
import { combineReducers } from "redux";

const { SUBMIT_REQUEST, SUBMIT_REQUEST_RETURNED } = actions;

export const RequestSubmit = (state = false, action) => {
  switch (action.type) {
    case SUBMIT_REQUEST:
      return true;
    case SUBMIT_REQUEST_RETURNED:
      return false;
    default:
      return state;
  }
};
export const requestReturned = (state = false, action) => {
  switch (action.type) {
    case SUBMIT_REQUEST_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  RequestSubmit,
  requestReturned,
});
