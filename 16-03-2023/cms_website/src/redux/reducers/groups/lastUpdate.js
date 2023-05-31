import actions from "../../actions";
import { combineReducers } from "redux";

const { GET_LAST_UPDATE, LAST_UPDATE_RETURNED } = actions;

export const lastUpdateRequest = (state = false, action) => {
  switch (action.type) {
    case GET_LAST_UPDATE:
      return true;
    case LAST_UPDATE_RETURNED:
      return false;
    default:
      return state;
  }
};
export const lastUpdateReturned = (state = false, action) => {
  switch (action.type) {
    case LAST_UPDATE_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  lastUpdateRequest,
  lastUpdateReturned,
});
