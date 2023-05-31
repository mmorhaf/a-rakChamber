import { createAction } from "../creators";

export default {
  ...createAction("IS_LOADING"),
  ...createAction("LOADING_DONE"),

  ...createAction("POST_BUSINESS_DIRECTORY_FORM", "data"),
  ...createAction("POST_BUSINESS_DIRECTORY_FORM_RETURNED", "data"),

  ...createAction("POST_SEARCH_KEYWORD", "data"),
  ...createAction("POST_SEARCH_KEYWORD_DATA", "data"),

  ...createAction("POST_BUSINESS_DIRECTORY_ACTIVITY", "data"),
  ...createAction("POST_BUSINESS_DIRECTORY_ACTIVITY_RETURNED", "data"),

  ...createAction("GET_ESERVICES_DETAILS", "data"),
  ...createAction("GET_ESERVICES_DETAILS_RETURNED", "data"),

  ...createAction("GET_ESERVICES_GROUPS", "data"),
  ...createAction("GET_ESERVICES_GROUPS_RETURNED", "data"),

  ...createAction("GET_ESERVICES_LIST", "data"),
  ...createAction("GET_ESERVICES_LIST_RETURNED", "data"),

  ...createAction("POST_COO_VERIFY_FORM", "data"),
  ...createAction("POST_COO_VERIFY_FORM_RETURNED", "data"),

  ...createAction("GET_RATIFICATION_VERIFY", "data"),
  ...createAction("GET_RATIFICATION_VERIFY_RETURNED", "data"),

  ...createAction(
    "SERVICE_LOGIN",
    "user",
    "password",
    "loginType",
    "loginById"
  ),
  ...createAction("SERVICE_LOGIN_DONE", "status"),
  ...createAction("SERVICE_LOGIN_FAILD", "code"),

  ...createAction("SERVICE_LOGIN_UPDATE", "data", "loginType"),
  ...createAction("SERVICE_LOGIN_UPDATE_DONE", "data"),

  ...createAction("FETCH_SELECT_MENU_DATA"),
  ...createAction("FETCH_SELECT_MENU_DATA_DONE", "data"),

  ...createAction("FETCH_ISIC_ACTIVITY_DATA"),
  ...createAction("FETCH_ISIC_ACTIVITY_DATA_DONE", "data"),

  ...createAction("CALCULATE_FEES", "data"),
  ...createAction("CALCULATE_FEES_DONE", "data"),

  ...createAction("SAVE_NEW_COO_DATA", "data"),
  ...createAction("SAVE_NEW_COO_DATA_DONE", "data"),

  ...createAction("UPLOAD_RAK_FILE", "body"),
  ...createAction("UPLOAD_RAK_FILE_DONE", "data"),

  ...createAction("GET_RAK_REQUESTS_LIST", "data"),
  ...createAction("GET_RAK_REQUESTS_LIST_DONE", "data"),

  ...createAction("GET_COO_VERIFY_DATA", "data"),
  ...createAction("GET_COO_VERIFY_DATA_RETURNED", "data"),

  ...createAction("GET_COO_ACCREDITED_LIST", "data"),
  ...createAction("GET_COO_ACCREDITED_LIST_DONE", "data"),

  ...createAction("SEND_COO_ADDITIONAL_REQUEST", "data"),
  ...createAction("SEND_COO_ADDITIONAL_REQUEST_DONE", "data"),

  ...createAction("GET_COO_ADDITIONAL_REQUEST_DETAILS", "data"),
  ...createAction("GET_COO_ADDITIONAL_REQUEST_DETAILS_DONE", "data"),

  ...createAction("SEND_OTHER_REQUEST", "data"),
  ...createAction("SEND_OTHER_REQUEST_DONE", "data"),

  ...createAction("GET_OTHER_REQUEST_DETAILS", "data"),
  ...createAction("GET_OTHER_REQUEST_DETAILS_DONE", "data"),

  ...createAction("SEND_COO_EDIT_REQUEST", "sendType", "data"),
  ...createAction("SEND_COO_EDIT_REQUEST_DONE", "data"),

  ...createAction("GET_COO_EDIT_REQUEST_DETAILS", "data"),
  ...createAction("GET_COO_EDIT_REQUEST_DETAILS_DONE", "data"),

  ...createAction("GET_COO_EDIT_REQUEST_ORIGIN_DETAILS", "data"),
  ...createAction("GET_COO_EDIT_REQUEST_ORIGIN_DETAILS_DONE", "data"),

  ...createAction("SEND_COO_EDIT_GOODS", "sendType", "data"),
  ...createAction("SEND_COO_EDIT_GOODS_DONE", "data"),

  ...createAction("GET_COO_EDIT_GOODS_DATA", "data"),
  ...createAction("GET_COO_EDIT_GOODS_DATA_DONE", "data"),

  ...createAction("GET_GOODS_DETAILS_LIST", "data"),
  ...createAction("GET_GOODS_DETAILS_LIST_DONE", "data"),

  ...createAction("GET_RATIFICATION_TYPE"),
  ...createAction("GET_RATIFICATION_TYPE_DONE", "data"),

  ...createAction("GET_RATIFICATION_DOC_TYPE"),
  ...createAction("GET_RATIFICATION_DOC_TYPE_DONE", "data"),

  ...createAction("SEND_RATIFICATION_REQUEST", "data"),
  ...createAction("SEND_RATIFICATION_REQUEST_DONE", "data"),

  ...createAction("GET_MEMBERSHIP_VERIFY", "data"),
  ...createAction("GET_MEMBERSHIP_VERIFY_DONE", "data"),

  ...createAction("GET_MEMBERSHIP_FEES", "data"),
  ...createAction("GET_MEMBERSHIP_FEES_DONE", "data"),

  ...createAction("GET_MEMBERSHIP_PROFILE", "data", "dataType"),
  ...createAction("GET_MEMBERSHIP_PROFILE_DONE", "data"),

  ...createAction("SEND_COO_ATTACHMENTS", "data", "reqType"),
  ...createAction("SEND_COO_ATTACHMENTS_DONE", "data"),

  ...createAction("DELETE_REQUEST", "data"),
  ...createAction("DELETE_REQUEST_DONE", "data"),

  ...createAction("GET_RAK_ISSUED_REQUESTS_LIST", "data"),
  ...createAction("GET_RAK_ISSUED_REQUESTS_LIST_DONE", "data"),

  ...createAction("SEND_PAYMENT_REQUEST_DATA", "data"),
  ...createAction("SEND_PAYMENT_REQUEST_DATA_DONE", "data"),

  ...createAction("GET_TOTALS_DATA", "data"),
  ...createAction("GET_TOTALS_DATA_DONE", "data"),

  ...createAction("GET_PAYMENT_DETAILS_DATA", "data"),
  ...createAction("GET_PAYMENT_DETAILS_DATA_DONE", "data"),

  ...createAction("POST_CONFIRM_PAYMENT_DATA", "data"),
  ...createAction("POST_CONFIRM_PAYMENT_DATA_DONE", "data"),

  ...createAction("GET_RATIFICATION_REQUEST_DATA", "data", "reqType"),
  ...createAction("GET_RATIFICATION_REQUEST_DATA_DONE", "data"),

  ...createAction("GET_RATIFICATION_ATTACH_DATA", "data", "reqType"),
  ...createAction("GET_RATIFICATION_ATTACH_DATA_DONE", "data"),

  ...createAction("SEND_RATIFICATION_UPDATE_REQUEST", "data"),
  ...createAction("SEND_RATIFICATION_UPDATE_REQUEST_DONE", "data"),

  ...createAction("GET_COO_STAMPS", "data"),
  ...createAction("GET_COO_STAMPS_DONE", "data"),

  ...createAction("CHECK_INVOICE_NO", "data"),
  ...createAction("CHECK_INVOICE_NO_DONE", "data"),

  ...createAction("SEND_DELETED_ATTACHMENTS", "data", "reqType"),
  ...createAction("SEND_DELETED_ATTACHMENTS_DONE", "data"),

  ...createAction("SEND_COO_ADDITIONAL_REQUEST_UPDATE", "data"),
  ...createAction("SEND_COO_ADDITIONAL_REQUEST_UPDATE_DONE", "data"),

  ...createAction("SEND_OTHER_REQUEST_UPDATE", "data"),
  ...createAction("SEND_OTHER_REQUEST_UPDATE_DONE", "data"),

  ...createAction("SEND_MOST_USED_SERVICE", "data"),
  ...createAction("SEND_MOST_USED_SERVICE_DONE", "data"),

  ...createAction("GET_MOST_USED_SERVICE"),
  ...createAction("GET_MOST_USED_SERVICE_DONE", "data"),

  ...createAction("GET_COO_REQUEST_DETAILS", "data"),
  ...createAction("GET_COO_REQUEST_DETAILS_DONE", "data"),

  ...createAction("SEND_COO_UPDATE_REQUEST", "data"),
  ...createAction("SEND_COO_UPDATE_REQUEST_DONE", "data"),

  ...createAction("SEND_UPDATED_PASSWORD", "data", "userType"),
  ...createAction("SEND_UPDATED_PASSWORD_DONE", "data"),

  ...createAction("SEND_CUSTOMER_RATE", "data"),
  ...createAction("SEND_CUSTOMER_RATE_DONE", "data"),

  ...createAction("GET_PAYMENT_TRX", "data"),
  ...createAction("GET_PAYMENT_TRX_DONE", "data"),

  ...createAction("SEND_MEMBER_REGISTER", "data", "userType"),
  ...createAction("SEND_MEMBER_REGISTER_DONE", "data"),

  ...createAction("SEND_MEMBER_PROFILE_UPDATE", "data", "dataType"),
  ...createAction("SEND_MEMBER_PROFILE_UPDATE_DONE", "data"),

  ...createAction("GET_CIRCULARS"),
  ...createAction("GET_CIRCULARS_DONE", "data"),

  ...createAction("SEND_NOTIFICATION", "data"),
  ...createAction("SEND_NOTIFICATION_DONE", "data"),

  ...createAction("GET_NOTIFICATION", "data"),
  ...createAction("GET_NOTIFICATION_DONE", "data"),

  ...createAction("SEND_EMAIL", "data"),
  ...createAction("SEND_EMAIL_DONE", "data"),

  ...createAction("GET_FILE_LIST", "data"),
  ...createAction("GET_FILE_LIST_DONE", "data"),

  ...createAction("FILE_STAMP", "data", "code", "fileType"),
  ...createAction("FILE_STAMP_DONE", "data"),

  ...createAction("FINISH_FILE_STAMP", "data"),
  ...createAction("FINISH_FILE_STAMP_DONE", "data"),

  ...createAction("SUPPLIER_LOGIN", "email", "password"),
  ...createAction("SUPPLIER_LOGIN_DONE", "status"),

  ...createAction("SEND_SUPPLIER_REGISTER", "data"),
  ...createAction("SEND_SUPPLIER_REGISTER_DONE", "data"),

  ...createAction("GET_SERVICE_STEP", "data"),
  ...createAction("GET_SERVICE_STEP_DONE", "data"),

  ...createAction("POST_PRINT_TRACKING", "data"),
  ...createAction("POST_PRINT_TRACKING_DONE", "data"),

  ...createAction("GET_TRX_COO_LIST", "data"),
  ...createAction("GET_TRX_COO_LIST_DONE", "data"),
};
