import actions from "../../actions";
import { combineReducers } from "redux";

const { GET_MENU, MENU_RETURNED } = actions;

export const getMenu = (state = false, action) => {
  switch (action.type) {
    case GET_MENU:
      return true;
    case MENU_RETURNED:
      return false;
    default:
      return state;
  }
};
export const menuReturned = (state = false, action) => {
  switch (action.type) {
    case MENU_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  getMenu,
  menuReturned,
});
