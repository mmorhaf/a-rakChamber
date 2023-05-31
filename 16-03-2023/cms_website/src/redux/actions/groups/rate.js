import { createAction } from "../creators";

export default {
  ...createAction("ASK_FOR_RATE", "url"),
  ...createAction("ASK_FOR_RATE_RETURNED", "data"),
  ...createAction("ADD_FEEDBACK", "data"),
  ...createAction("ADD_FEEDBACK_RETURNED", "data"),
  ...createAction("ADD_ISUSEFUL", "data"),
  ...createAction("ADD_ISUSEFUL_RETURNED", "data"),
  ...createAction("ADD_REPORT", "data"),
  ...createAction("ADD_REPORT_RETURNED", "data"),
  ...createAction("RATE_FILE_ACTION", "data"),
  ...createAction("RATE_FILE_RETURNED", "data"),
};
