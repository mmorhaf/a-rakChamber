import { createAction } from "../creators";

export default {
  ...createAction(
    "GET_CATEGORIES",
    "sort",
    "subSort",
    "isFeatured",
    "language",
    "limit",
    "offset"
  ),
  ...createAction("CATEGORIES_RETURNED", "data"),
  ...createAction("GET_CATEGORY_BY_ID", "id", "language"),
  ...createAction("CATEGORY_BY_ID_RETURNED", "data"),
  ...createAction("GET_CATEGORY_BY_ALIAS", "alias", "language"),
  ...createAction("BY_ALIAS_RETURNED", "data"),
  ...createAction("GET_CATEGORY_TREE_BY_ALIAS", "alias"),
  ...createAction("CATEGORY_TREE_RETURNED", "data"),
};
