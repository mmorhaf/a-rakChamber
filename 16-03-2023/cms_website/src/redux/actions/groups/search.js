import { createAction } from "../creators";

export default {
  ...createAction("DO_SEARCH", "data", "language"),
  ...createAction("DO_SEARCH_RETURNED", "data"),
  ...createAction("DO_POST_SEARCH", "data", "language"),
  ...createAction("DO_POST_SEARCH_RETURNED", "data"),

  ...createAction("DO_NEWS_SEARCH", "data", "sort", "language"),
  ...createAction("DO_NEWS_SEARCH_RETURNED", "data"),
};
