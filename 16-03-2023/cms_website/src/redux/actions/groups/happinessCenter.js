import { createAction } from "../creators";

export default {
  ...createAction("GET_ALL_CENTERS", "language"),
  ...createAction("ALL_CENTERS_RETURNED", "data"),
  ...createAction("GET_CENTER_BY_ID", "id", "language"),
  ...createAction("CENTER_BY_ID_RETURNED", "data"),
};
