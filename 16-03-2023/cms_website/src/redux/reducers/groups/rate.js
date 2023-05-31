import actions from "../../actions";
import { combineReducers } from "redux";

const {
  ASK_FOR_RATE,
  ASK_FOR_RATE_RETURNED,
  ADD_FEEDBACK,
  ADD_FEEDBACK_RETURNED,
  ADD_ISUSEFUL,
  ADD_ISUSEFUL_RETURNED,
  ADD_REPORT,
  ADD_REPORT_RETURNED,
  RATE_FILE_ACTION,
  RATE_FILE_RETURNED,
} = actions;

export const askingForRating = (state = false, action) => {
  switch (action.type) {
    case ASK_FOR_RATE:
      return true;
    case ASK_FOR_RATE_RETURNED:
      return false;
    default:
      return state;
  }
};
export const askingForRatingReturned = (state = false, action) => {
  switch (action.type) {
    case ASK_FOR_RATE_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const sendFeedBack = (state = false, action) => {
  switch (action.type) {
    case ADD_FEEDBACK:
      return true;
    case ADD_FEEDBACK_RETURNED:
      return false;
    default:
      return state;
  }
};

export const sendFeedBackReturned = (state = false, action) => {
  switch (action.type) {
    case ADD_FEEDBACK_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const sendIsUsefull = (state = false, action) => {
  switch (action.type) {
    case ADD_ISUSEFUL:
      return true;
    case ADD_ISUSEFUL_RETURNED:
      return false;
    default:
      return state;
  }
};

export const sendIsUsefullReturned = (state = false, action) => {
  switch (action.type) {
    case ADD_ISUSEFUL_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const sendReport = (state = false, action) => {
  switch (action.type) {
    case ADD_REPORT:
      return true;
    case ADD_REPORT_RETURNED:
      return false;
    default:
      return state;
  }
};

export const sendReportReturned = (state = false, action) => {
  switch (action.type) {
    case ADD_REPORT_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const fileRating = (state = false, action) => {
  switch (action.type) {
    case RATE_FILE_ACTION:
      return true;
    case RATE_FILE_RETURNED:
      return false;
    default:
      return state;
  }
};
export const fileRatingReturned = (state = false, action) => {
  switch (action.type) {
    case RATE_FILE_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  askingForRating,
  askingForRatingReturned,
  sendFeedBack,
  sendFeedBackReturned,
  sendIsUsefull,
  sendIsUsefullReturned,
  sendReport,
  sendReportReturned,
  fileRating,
  fileRatingReturned,
});
