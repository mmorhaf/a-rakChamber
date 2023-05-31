import { createAction } from "../creators";

export default {
  ...createAction("POST_SERVICE_FORM", "data"),
  ...createAction("POST_SERVICE_FORM_RETURNED", "data"),
  ...createAction("GET_MY_REQUESTS"),
  ...createAction("GET_MY_REQUESTS_DONE", "data"),
  ...createAction("GET_REQUEST_DETAILS", "id"),
  ...createAction("GET_REQUEST_DETAILS_DONE", "data"),
  ...createAction("ADD_REQUEST_NOTE", "data"),
  ...createAction("ADD_REQUEST_NOTE_DONE", "data"),
  ...createAction("GET_REQUEST_NOTES", "id"),
  ...createAction("GET_REQUEST_NOTES_DONE", "data"),
  ...createAction("GET_REQUEST_STATUS_CHANGES", "id"),
  ...createAction("GET_REQUEST_STATUS_CHANGES_DONE", "data"),
  ...createAction("POST_SUPPLIER_FORM", "data"),
  ...createAction("POST_SUPPLIER_FORM_RETURNED", "data"),
  ...createAction("GET_QRCODE", "data"),
  ...createAction("GET_QRCODE_DONE", "data"),
  ...createAction("IS_SERVICE_PAGE"),
  ...createAction("SERVICE_PAGE"),
  ...createAction("MARK_NOTIFICATION", "data"),
  ...createAction("NOTIFICATION_MARKED", "data"),
};
