import actions from "../../actions";
import { combineReducers } from "redux";

const { LOADING_ACTION, LOADING_RETURNED } = actions;

export const isLoading = (state = true, action) => {
  switch (action.type) {
    case LOADING_ACTION:
      return action.loading;
    case LOADING_RETURNED:
      return false;
    default:
      return state;
  }
};

export const loadingActionReturned = (state = true, action) => {
  switch (action.type) {
    case LOADING_RETURNED:
      return action.data;

    default:
      return state;
  }
};
export default combineReducers({
  isLoading,
  loadingActionReturned,
});
