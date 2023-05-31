import { createAction } from "../creators";

export default {
  ...createAction(
    "GET_ALL",
    "sort",
    "subSort",
    "categoryId",
    "supplierToken",
    "field",
    "language",
    "limit",
    "offset"
  ),
  ...createAction("ALL_RETURNED", "sort", "subSort", "categoryId", "data"),
  ...createAction("GET_RESERVATIONS", "sort", "id"),
  ...createAction("ALL_RESERVATIONS_RETURNED", "sort", "data", "id"),
  ...createAction("GET_BY_ID", "sort", "subSort", "id"),
  ...createAction("BY_ID_RETURNED", "sort", "subSort", "data"),
  ...createAction("CREATE_NEW", "sort", "subSort", "id", "payload", "language"),
  ...createAction("CREATED", "sort", "subSort", "response"),
  ...createAction("GET_ALL_PARTNERS", "language"),
  ...createAction("ALL_PARTNERS_RETURNED", "data"),

  ...createAction("GET_DATA", "data", "sort"),
  ...createAction("DATA_RETURNED", "data", "dataObject"),
  
  ...createAction(
    "GET_ALL_AB",
    "sort",
    "subSort",
    "entity",
    "categoryId",
    "limit",
    "offset",
    "language"
  ),
  ...createAction("CLEAR", "data"),
  ...createAction("ALL_AB_RETURNED", "sort", "subSort", "entity", "data"),
  ...createAction("GET_NOTIFICATIONS", "sort", "limit", "offset"),
  ...createAction("ALL_NOTIFICATIONS_RETURNED", "data"),
  ...createAction("GET_SUPPLIER_REQUEST_NOTES", "id"),
  ...createAction("ALL_SUPPLIER_NOTES_RETURNED", "data"),
  ...createAction("ADD_SUPPLIER_REQUEST_NOTE", "data"),
  ...createAction("ADD_SUPPLIER_REQUEST_NOTE_DONE", "data"),
  ...createAction("SET_PAGINATION", "data"),
};
