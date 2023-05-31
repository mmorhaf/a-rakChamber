import { createAction } from "../creators";

export default {
  ...createAction("LOADING_ACTION", "loading"),
  ...createAction("LOADING_RETURNED", "data"),
};
