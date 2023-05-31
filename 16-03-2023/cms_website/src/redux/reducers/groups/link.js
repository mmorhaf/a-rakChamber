import actions from "../../actions";
import { combineReducers } from "redux";

const { LIST_ALL_LINKS, ALL_LINKS_RETURNED } = actions;

export const getAllLinks = (state = false, action) => {
  switch (action.type) {
    case LIST_ALL_LINKS:
      return true;
    case ALL_LINKS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const allLinksReturned = (state = [], action) => {
  switch (action.type) {
    case ALL_LINKS_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  getAllLinks,
  allLinksReturned,
});
