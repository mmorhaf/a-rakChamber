import { createAction } from "../creators";

export default {
  ...createAction("LIST_ALL_LINKS", "language"),
  ...createAction("ALL_LINKS_RETURNED", "data"),
};
