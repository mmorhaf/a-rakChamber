import { createAction } from "../creators";

export default {
  ...createAction("SUBMIT_COMMENT", "data"),
  ...createAction("SUBMIT_COMMENT_RETURNED", "data"),
};
