import { createAction } from "../creators";

export default {
  ...createAction("GET_BLOCK_DATA", "language", "url"),
  ...createAction("BLOCK_DATA_RETURNED", "data"),
};
