import { createAction } from "../creators";

export default {
  ...createAction(
    "GET_ALL_POSTS",
    "sort",
    "isFeatured",
    "language",
    "categoryId",
    "limit",
    "offset",
    "order"
  ),
  ...createAction("ALL_POSTS_RETURNED", "data"),
  ...createAction("GET_POST_BY_ID", "id", "language"),
  ...createAction("POST_BY_ID_RETURNED", "data"),
  ...createAction("GET_POST_BY_ALIAS", "alias", "language"),
  ...createAction("BY_ALIAS_RETURNED", "data"),
  ...createAction("GET_TODAY_EVENTS", "language"),
  ...createAction("TODAY_EVENTS_RETURNED", "data"),

  ...createAction("GET_POST_VIEWERS", "id"),
  ...createAction("POST_VIEWERS_RETURNED", "data"),

  ...createAction("GET_TOP_PUBLICATIONS", "language"),
  ...createAction("TOP_PUBLICATIONS_RETURNED", "data"),

  ...createAction("GET_POST_BY_CATEGORY", "data", "language"),
  ...createAction("ALL_POSTS_BY_CATEGORY_RETURNED", "data"),

  // ...createAction("GET_ALL_PARTNERS", "language"),
  // ...createAction("ALL_PARTNERS_RETURNED", "data"),
};
