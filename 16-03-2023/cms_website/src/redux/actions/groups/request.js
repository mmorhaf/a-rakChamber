import { createAction } from "../creators";

export default {
  ...createAction("SUBMIT_REQUEST", "data"),
  ...createAction("SUBMIT_REQUEST_RETURNED", "data"),
};
