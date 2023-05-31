import { createAction } from "../creators";

export default {
  ...createAction("GET_LAST_UPDATE"),
  ...createAction("LAST_UPDATE_RETURNED", "data"),
};
