import actions from "../../actions";
import { combineReducers } from "redux";

const { SUBMIT_COMMENT, SUBMIT_COMMENT_RETURNED } = actions;

export const commentRequest = (state = false, action) => {
  switch (action.type) {
    case SUBMIT_COMMENT:
      return true;
    case SUBMIT_COMMENT_RETURNED:
      return false;
    default:
      return state;
  }
};
export const commentReturned = (state = false, action) => {
  switch (action.type) {
    case SUBMIT_COMMENT_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  commentRequest,
  commentReturned,
});
