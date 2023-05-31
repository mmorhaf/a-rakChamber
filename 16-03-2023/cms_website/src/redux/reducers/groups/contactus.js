import actions from "../../actions";
import { combineReducers } from "redux";

const { CONTACT_US_ACTION, CONTACT_US_RETURNED } = actions;

export const contactUsRequest = (state = false, action) => {
  switch (action.type) {
    case CONTACT_US_ACTION:
      return true;
    case CONTACT_US_RETURNED:
      return false;
    default:
      return state;
  }
};
export const contactUsReturned = (state = false, action) => {
  switch (action.type) {
    case CONTACT_US_RETURNED:
      return action.res;
    default:
      return state;
  }
};

export default combineReducers({
  contactUsRequest,
  contactUsReturned,
});
