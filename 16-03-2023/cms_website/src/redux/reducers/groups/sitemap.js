import actions from "../../actions";
import { combineReducers } from "redux";

const { REQ_SITEMAP, SITEMAP_RETURNED } = actions;

export const getSitemap = (state = false, action) => {
  switch (action.type) {
    case REQ_SITEMAP:
      return true;
    case SITEMAP_RETURNED:
      return false;
    default:
      return state;
  }
};
export const returnedSitemap = (state = false, action) => {
  switch (action.type) {
    case SITEMAP_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  getSitemap,
  returnedSitemap,
});
