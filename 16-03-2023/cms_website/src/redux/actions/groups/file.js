import { createAction } from "../creators";

export default {
  ...createAction("UPLOAD_FILE_ACTION", "files", "arTitle", "enTitle", "key"),
  ...createAction("UPLOAD_FILE_RETURNED", "data"),
  ...createAction("CREATE_FILE", "payload"),
  ...createAction("FILE_CREATED", "response"),
  ...createAction("DELETE_FILE_ACTION", "id"),
  ...createAction("FILE_DELETED", "response"),
  ...createAction("DOWNLOAD_FILE", "payload"),
  ...createAction("FILE_DOWNLOADED", "response"),
  ...createAction("READ_FILE_ACTION", "id"),
  ...createAction("READ_COMPLETED", "response"),
  ...createAction("DOWNLOAD_COUNT", "id"),
  ...createAction("DOWNLOAD_COUNT_COMPLETED", "response"),
};
