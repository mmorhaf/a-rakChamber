import actions from "../../actions";
import { combineReducers } from "redux";

const {
  DO_SEARCH,
  DO_SEARCH_RETURNED,
  DO_POST_SEARCH,
  DO_POST_SEARCH_RETURNED,
  DO_NEWS_SEARCH,
  DO_NEWS_SEARCH_RETURNED,
} = actions;

export const searchData = (state = false, action) => {
  switch (action.type) {
    case DO_SEARCH:
      return action.data;
    default:
      return state;
  }
};
export const searchDataReturned = (state = false, action) => {
  switch (action.type) {
    case DO_SEARCH_RETURNED:
      return action.data;
    default:
      return state;
  }
};
export const searchPost = (state = false, action) => {
  switch (action.type) {
    case DO_POST_SEARCH:
      return action.data;
    default:
      return state;
  }
};
export const searchPostReturned = (state = false, action) => {
  switch (action.type) {
    case DO_POST_SEARCH_RETURNED:
      return action.data;
    default:
      return state;
  }
};
export const doNewsSearch = (state = false, action) => {
  switch (action.type) {
    case DO_NEWS_SEARCH:
      return action.data;
    default:
      return state;
  }
};
export const doNewsSearchReturned = (state = false, action) => {
  switch (action.type) {
    case DO_NEWS_SEARCH_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  searchData,
  searchDataReturned,
  searchPost,
  searchPostReturned,
  doNewsSearchReturned,
  doNewsSearch,
});
