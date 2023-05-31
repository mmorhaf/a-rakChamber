import { createAction } from "../creators";

export default {
  ...createAction("GET_MENU"),
  ...createAction("MENU_RETURNED", "data"),
};
