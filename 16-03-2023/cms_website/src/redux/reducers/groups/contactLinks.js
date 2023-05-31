import actions from "../../actions";
import { combineReducers } from "redux";

const { GET_CONTACT_LINKS, CONTACT_LINKS_RETURNED } = actions;

export const getContactLinks = (state = false, action) => {
  switch (action.type) {
    case GET_CONTACT_LINKS:
      return true;
    case CONTACT_LINKS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const contactLinksReturned = (state = false, action) => {
  switch (action.type) {
    case CONTACT_LINKS_RETURNED:
      return action.data;
    default:
      return state;
  }
};
export default combineReducers({
  getContactLinks,
  contactLinksReturned,
});
