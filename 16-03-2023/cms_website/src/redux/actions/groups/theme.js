import { createAction } from "../creators";

export default {
  ...createAction("GET_THEME_LIST_ACTION"),
  ...createAction("THEME_LIST_RETURNED", "data"),
  ...createAction("CHANGE_THEME", "data"),
  ...createAction("SET_DARK_THEME", "data"),
  ...createAction("SET_DIRECTION", "data"),
  ...createAction("INCREASE_FONT"),
  ...createAction("DECREASE_FONT"),
  ...createAction("RESET_FONT"),
};
