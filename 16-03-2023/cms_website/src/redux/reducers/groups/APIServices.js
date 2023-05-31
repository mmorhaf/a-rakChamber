import actions from "../../actions";
import { combineReducers } from "redux";

const {
  POST_BUSINESS_DIRECTORY_FORM,
  POST_BUSINESS_DIRECTORY_FORM_RETURNED,
  GET_ESERVICES_DETAILS,
  GET_ESERVICES_DETAILS_RETURNED,
  GET_ESERVICES_GROUPS,
  GET_ESERVICES_GROUPS_RETURNED,
  POST_COO_VERIFY_FORM,
  POST_COO_VERIFY_FORM_RETURNED,
  GET_RATIFICATION_VERIFY,
  GET_RATIFICATION_VERIFY_RETURNED,
  SERVICE_LOGIN,
  SERVICE_LOGIN_DONE,
  SERVICE_LOGIN_FAILD,
  FETCH_SELECT_MENU_DATA,
  FETCH_SELECT_MENU_DATA_DONE,
  FETCH_ISIC_ACTIVITY_DATA,
  FETCH_ISIC_ACTIVITY_DATA_DONE,
  CALCULATE_FEES,
  CALCULATE_FEES_DONE,
  SAVE_NEW_COO_DATA,
  SAVE_NEW_COO_DATA_DONE,
  UPLOAD_RAK_FILE,
  UPLOAD_RAK_FILE_DONE,
  GET_RAK_REQUESTS_LIST_DONE,
  GET_RAK_REQUESTS_LIST,
  GET_COO_VERIFY_DATA,
  GET_COO_VERIFY_DATA_RETURNED,
  GET_COO_ACCREDITED_LIST,
  GET_COO_ACCREDITED_LIST_DONE,
  SEND_COO_ADDITIONAL_REQUEST,
  SEND_COO_ADDITIONAL_REQUEST_DONE,
  SEND_OTHER_REQUEST,
  SEND_OTHER_REQUEST_DONE,
  SEND_COO_EDIT_REQUEST,
  SEND_COO_EDIT_REQUEST_DONE,
  GET_GOODS_DETAILS_LIST,
  GET_GOODS_DETAILS_LIST_DONE,
  SEND_COO_EDIT_GOODS,
  SEND_COO_EDIT_GOODS_DONE,
  GET_RATIFICATION_TYPE,
  GET_RATIFICATION_TYPE_DONE,
  GET_RATIFICATION_DOC_TYPE,
  GET_RATIFICATION_DOC_TYPE_DONE,
  SEND_RATIFICATION_REQUEST,
  SEND_RATIFICATION_REQUEST_DONE,
  GET_MEMBERSHIP_VERIFY,
  GET_MEMBERSHIP_VERIFY_DONE,
  GET_MEMBERSHIP_FEES,
  GET_MEMBERSHIP_FEES_DONE,
  LOADING_DONE,
  IS_LOADING,
  GET_MEMBERSHIP_PROFILE,
  GET_MEMBERSHIP_PROFILE_DONE,
  SEND_COO_ATTACHMENTS,
  SEND_COO_ATTACHMENTS_DONE,
  DELETE_REQUEST,
  DELETE_REQUEST_DONE,
  GET_RAK_ISSUED_REQUESTS_LIST,
  GET_RAK_ISSUED_REQUESTS_LIST_DONE,
  SEND_PAYMENT_REQUEST_DATA,
  SEND_PAYMENT_REQUEST_DATA_DONE,
  GET_TOTALS_DATA,
  GET_TOTALS_DATA_DONE,
  GET_PAYMENT_DETAILS_DATA,
  GET_PAYMENT_DETAILS_DATA_DONE,
  POST_CONFIRM_PAYMENT_DATA,
  POST_CONFIRM_PAYMENT_DATA_DONE,
  GET_RATIFICATION_REQUEST_DATA,
  GET_RATIFICATION_REQUEST_DATA_DONE,
  GET_RATIFICATION_ATTACH_DATA,
  GET_RATIFICATION_ATTACH_DATA_DONE,
  SEND_RATIFICATION_UPDATE_REQUEST,
  SEND_RATIFICATION_UPDATE_REQUEST_DONE,
  GET_COO_ADDITIONAL_REQUEST_DETAILS,
  GET_COO_ADDITIONAL_REQUEST_DETAILS_DONE,
  GET_OTHER_REQUEST_DETAILS,
  GET_OTHER_REQUEST_DETAILS_DONE,
  GET_COO_EDIT_REQUEST_DETAILS,
  GET_COO_EDIT_REQUEST_DETAILS_DONE,
  GET_COO_EDIT_REQUEST_ORIGIN_DETAILS,
  GET_COO_EDIT_REQUEST_ORIGIN_DETAILS_DONE,
  GET_COO_EDIT_GOODS_DATA,
  GET_COO_EDIT_GOODS_DATA_DONE,
  GET_COO_STAMPS,
  GET_COO_STAMPS_DONE,
  CHECK_INVOICE_NO,
  CHECK_INVOICE_NO_DONE,
  SEND_DELETED_ATTACHMENTS,
  SEND_DELETED_ATTACHMENTS_DONE,
  SEND_COO_ADDITIONAL_REQUEST_UPDATE,
  SEND_COO_ADDITIONAL_REQUEST_UPDATE_DONE,
  SEND_OTHER_REQUEST_UPDATE,
  SEND_OTHER_REQUEST_UPDATE_DONE,
  SEND_MOST_USED_SERVICE,
  SEND_MOST_USED_SERVICE_DONE,
  GET_MOST_USED_SERVICE,
  GET_MOST_USED_SERVICE_DONE,
  GET_ESERVICES_LIST,
  GET_ESERVICES_LIST_RETURNED,
  GET_COO_REQUEST_DETAILS,
  GET_COO_REQUEST_DETAILS_DONE,
  SEND_COO_UPDATE_REQUEST,
  SEND_COO_UPDATE_REQUEST_DONE,
  SEND_UPDATED_PASSWORD,
  SEND_UPDATED_PASSWORD_DONE,
  POST_BUSINESS_DIRECTORY_ACTIVITY,
  POST_BUSINESS_DIRECTORY_ACTIVITY_RETURNED,
  POST_SEARCH_KEYWORD,
  POST_SEARCH_KEYWORD_DATA,
  SEND_CUSTOMER_RATE,
  SEND_CUSTOMER_RATE_DONE,
  GET_PAYMENT_TRX,
  GET_PAYMENT_TRX_DONE,
  SEND_MEMBER_REGISTER,
  SEND_MEMBER_REGISTER_DONE,
  SEND_MEMBER_PROFILE_UPDATE,
  SEND_MEMBER_PROFILE_UPDATE_DONE,
  SERVICE_LOGIN_UPDATE,
  SERVICE_LOGIN_UPDATE_DONE,
  GET_CIRCULARS,
  GET_CIRCULARS_DONE,
  SEND_NOTIFICATION,
  SEND_NOTIFICATION_DONE,
  GET_NOTIFICATION,
  GET_NOTIFICATION_DONE,
  SEND_EMAIL,
  SEND_EMAIL_DONE,
  GET_FILE_LIST,
  GET_FILE_LIST_DONE,
  FILE_STAMP,
  FILE_STAMP_DONE,
  FINISH_FILE_STAMP,
  FINISH_FILE_STAMP_DONE,
  SUPPLIER_LOGIN,
  SUPPLIER_LOGIN_DONE,
  SEND_SUPPLIER_REGISTER,
  SEND_SUPPLIER_REGISTER_DONE,
  GET_SERVICE_STEP,
  GET_SERVICE_STEP_DONE,
  POST_PRINT_TRACKING,
  POST_PRINT_TRACKING_DONE,
  GET_TRX_COO_LIST,
  GET_TRX_COO_LIST_DONE,
} = actions;

export const postBusinessDirectoryForm = (state = false, action) => {
  switch (action.type) {
    case POST_BUSINESS_DIRECTORY_FORM:
      return true;
    case POST_BUSINESS_DIRECTORY_FORM_RETURNED:
      return false;
    default:
      return state;
  }
};
export const businessDirectoryFormReturned = (state = {}, action) => {
  switch (action.type) {
    case POST_BUSINESS_DIRECTORY_FORM_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const postBusinessDirectoryByActivity = (state = false, action) => {
  switch (action.type) {
    case POST_BUSINESS_DIRECTORY_ACTIVITY:
      return true;
    case POST_BUSINESS_DIRECTORY_ACTIVITY_RETURNED:
      return false;
    default:
      return state;
  }
};
export const businessDirectoryByActivityReturned = (state = {}, action) => {
  switch (action.type) {
    case POST_BUSINESS_DIRECTORY_ACTIVITY_RETURNED:
      return action.data;
    default:
      return state;
  }
};
export const getEServicesDetails = (state = false, action) => {
  switch (action.type) {
    case GET_ESERVICES_DETAILS:
      return true;
    case GET_ESERVICES_DETAILS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const eServicesDetailsReturned = (state = {}, action) => {
  switch (action.type) {
    case GET_ESERVICES_DETAILS_RETURNED:
      return action.data;
    default:
      return state;
  }
};
export const getEServicesGroups = (state = false, action) => {
  switch (action.type) {
    case GET_ESERVICES_GROUPS:
      return true;
    case GET_ESERVICES_GROUPS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const eServicesGroupsReturned = (state = null, action) => {
  switch (action.type) {
    case GET_ESERVICES_GROUPS_RETURNED:
      return action.data;
    default:
      return state;
  }
};
export const getEServicesList = (state = false, action) => {
  switch (action.type) {
    case GET_ESERVICES_LIST:
      return true;
    case GET_ESERVICES_LIST_RETURNED:
      return false;
    default:
      return state;
  }
};
export const eServicesListReturned = (state = null, action) => {
  switch (action.type) {
    case GET_ESERVICES_LIST_RETURNED:
      return action.data;
    default:
      return state;
  }
};
export const postCooVerificationForm = (state = false, action) => {
  switch (action.type) {
    case POST_COO_VERIFY_FORM:
      return true;
    case POST_COO_VERIFY_FORM_RETURNED:
      return false;
    default:
      return state;
  }
};
export const cooVerificationFormReturned = (state = {}, action) => {
  switch (action.type) {
    case POST_COO_VERIFY_FORM_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const getRatificationVerification = (state = false, action) => {
  switch (action.type) {
    case GET_RATIFICATION_VERIFY:
      return true;
    case GET_RATIFICATION_VERIFY_RETURNED:
      return false;
    default:
      return state;
  }
};
export const ratificationVerificationReturned = (state = false, action) => {
  switch (action.type) {
    case GET_RATIFICATION_VERIFY_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const serviceLogIn = (state = false, action) => {
  switch (action.type) {
    case SERVICE_LOGIN:
      return true;
    case SERVICE_LOGIN_DONE:
      return false;
    default:
      return state;
  }
};
export const serviceLogInDone = (state = 0, action) => {
  switch (action.type) {
    case SERVICE_LOGIN_DONE:
      return action.status;
    default:
      return state;
  }
};

export const serviceLogInFaild = (state = false, action) => {
  switch (action.type) {
    case SERVICE_LOGIN_FAILD:
      return action.code;
    default:
      return state;
  }
};

export const selectMenuData = (state = false, action) => {
  switch (action.type) {
    case FETCH_SELECT_MENU_DATA:
      return true;
    case FETCH_SELECT_MENU_DATA_DONE:
      return false;
    default:
      return state;
  }
};
export const selectMenuDataDone = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SELECT_MENU_DATA_DONE:
      return action.data;
    default:
      return state;
  }
};

export const isicActivityData = (state = false, action) => {
  switch (action.type) {
    case FETCH_ISIC_ACTIVITY_DATA:
      return true;
    case FETCH_ISIC_ACTIVITY_DATA_DONE:
      return false;
    default:
      return state;
  }
};
export const isicActivityDataDone = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ISIC_ACTIVITY_DATA_DONE:
      return action.data;
    default:
      return state;
  }
};

export const calculateFees = (state = false, action) => {
  switch (action.type) {
    case CALCULATE_FEES:
      return true;
    case CALCULATE_FEES_DONE:
      return false;
    default:
      return state;
  }
};
export const calculateFeesDone = (state = {}, action) => {
  switch (action.type) {
    case CALCULATE_FEES_DONE:
      return action.data;
    default:
      return state;
  }
};

export const sendNewCOOForm = (state = false, action) => {
  switch (action.type) {
    case SAVE_NEW_COO_DATA:
      return true;
    case SAVE_NEW_COO_DATA_DONE:
      return false;
    default:
      return state;
  }
};
export const sendNewCOOFormDone = (state = {}, action) => {
  switch (action.type) {
    case SAVE_NEW_COO_DATA_DONE:
      return action.data;
    default:
      return state;
  }
};
export const uploadRakFile = (state = false, action) => {
  switch (action.type) {
    case UPLOAD_RAK_FILE:
      return true;
    case UPLOAD_RAK_FILE_DONE:
      return false;
    default:
      return state;
  }
};
export const uploadRakFileDone = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_RAK_FILE_DONE:
      return action.data;
    default:
      return state;
  }
};
export const getRakRequestList = (state = false, action) => {
  switch (action.type) {
    case GET_RAK_REQUESTS_LIST:
      return true;
    case GET_RAK_REQUESTS_LIST_DONE:
      return false;
    default:
      return state;
  }
};
export const rakRequestListDone = (state = {}, action) => {
  switch (action.type) {
    case GET_RAK_REQUESTS_LIST_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getCooVerificationData = (state = false, action) => {
  switch (action.type) {
    case GET_COO_VERIFY_DATA:
      return true;
    case GET_COO_VERIFY_DATA_RETURNED:
      return false;
    default:
      return state;
  }
};
export const cooVerificationDataReturned = (state = [], action) => {
  switch (action.type) {
    case GET_COO_VERIFY_DATA_RETURNED:
      return action.data;
    default:
      return state;
  }
};
export const getCooAccreditedList = (state = false, action) => {
  switch (action.type) {
    case GET_COO_ACCREDITED_LIST:
      return true;
    case GET_COO_ACCREDITED_LIST_DONE:
      return false;
    default:
      return state;
  }
};
export const cooAccreditedListDone = (state = [], action) => {
  switch (action.type) {
    case GET_COO_ACCREDITED_LIST_DONE:
      return action.data;
    default:
      return state;
  }
};

export const sendCooAdditionalRequest = (state = false, action) => {
  switch (action.type) {
    case SEND_COO_ADDITIONAL_REQUEST:
      return true;
    case SEND_COO_ADDITIONAL_REQUEST_DONE:
      return false;
    default:
      return state;
  }
};
export const cooAdditionalRequestDone = (state = [], action) => {
  switch (action.type) {
    case SEND_COO_ADDITIONAL_REQUEST_DONE:
      return action.data;
    default:
      return state;
  }
};

export const sendOtherRequest = (state = false, action) => {
  switch (action.type) {
    case SEND_OTHER_REQUEST:
      return true;
    case SEND_OTHER_REQUEST_DONE:
      return false;
    default:
      return state;
  }
};
export const otherRequestDone = (state = [], action) => {
  switch (action.type) {
    case SEND_OTHER_REQUEST_DONE:
      return action.data;
    default:
      return state;
  }
};


export const sendCooEditRequest = (state = false, action) => {
  switch (action.type) {
    case SEND_COO_EDIT_REQUEST:
      return true;
    case SEND_COO_EDIT_REQUEST_DONE:
      return false;
    default:
      return state;
  }
};
export const cooEditRequestDone = (state = [], action) => {
  switch (action.type) {
    case SEND_COO_EDIT_REQUEST_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getGoodsDetailsList = (state = false, action) => {
  switch (action.type) {
    case GET_GOODS_DETAILS_LIST:
      return true;
    case GET_GOODS_DETAILS_LIST_DONE:
      return false;
    default:
      return state;
  }
};
export const goodsDetailsList = (state = [], action) => {
  switch (action.type) {
    case GET_GOODS_DETAILS_LIST_DONE:
      return action.data;
    default:
      return state;
  }
};

export const sendCooGoodsEditRequest = (state = false, action) => {
  switch (action.type) {
    case SEND_COO_EDIT_GOODS:
      return true;
    case SEND_COO_EDIT_GOODS_DONE:
      return false;
    default:
      return state;
  }
};
export const sendCooEditGoodsDone = (state = [], action) => {
  switch (action.type) {
    case SEND_COO_EDIT_GOODS_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getRatificationType = (state = false, action) => {
  switch (action.type) {
    case GET_RATIFICATION_TYPE:
      return true;
    case GET_RATIFICATION_TYPE_DONE:
      return false;
    default:
      return state;
  }
};
export const ratificationType = (state = [], action) => {
  switch (action.type) {
    case GET_RATIFICATION_TYPE_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getRatificationDocType = (state = false, action) => {
  switch (action.type) {
    case GET_RATIFICATION_DOC_TYPE:
      return true;
    case GET_RATIFICATION_DOC_TYPE_DONE:
      return false;
    default:
      return state;
  }
};
export const ratificationDocType = (state = [], action) => {
  switch (action.type) {
    case GET_RATIFICATION_DOC_TYPE_DONE:
      return action.data;
    default:
      return state;
  }
};

export const sendRatificationReq = (state = false, action) => {
  switch (action.type) {
    case SEND_RATIFICATION_REQUEST:
      return true;
    case SEND_RATIFICATION_REQUEST_DONE:
      return false;
    default:
      return state;
  }
};
export const ratificationRequest = (state = [], action) => {
  switch (action.type) {
    case SEND_RATIFICATION_REQUEST_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getMembershipVerify = (state = false, action) => {
  switch (action.type) {
    case GET_MEMBERSHIP_VERIFY:
      return true;
    case GET_MEMBERSHIP_VERIFY_DONE:
      return false;
    default:
      return state;
  }
};
export const membershipVerify = (state = {}, action) => {
  switch (action.type) {
    case GET_MEMBERSHIP_VERIFY_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getMembershipFees = (state = false, action) => {
  switch (action.type) {
    case GET_MEMBERSHIP_FEES:
      return true;
    case GET_MEMBERSHIP_FEES_DONE:
      return false;
    default:
      return state;
  }
};
export const membershipFees = (state = {}, action) => {
  switch (action.type) {
    case GET_MEMBERSHIP_FEES_DONE:
      return action.data;
    default:
      return state;
  }
};

export const spinnerToggle = (state = false, action) => {
  switch (action.type) {
    case IS_LOADING:
      return true;
    case LOADING_DONE:
      return false;
    default:
      return state;
  }
};

export const getMembershipProfile = (state = false, action) => {
  switch (action.type) {
    case GET_MEMBERSHIP_PROFILE:
      return true;
    case GET_MEMBERSHIP_PROFILE_DONE:
      return false;
    default:
      return state;
  }
};
export const membershipProfile = (state = {}, action) => {
  switch (action.type) {
    case GET_MEMBERSHIP_PROFILE_DONE:
      return action.data;
    default:
      return state;
  }
};
export const sendCooAttachments = (state = false, action) => {
  switch (action.type) {
    case SEND_COO_ATTACHMENTS:
      return true;
    case SEND_COO_ATTACHMENTS_DONE:
      return false;
    default:
      return state;
  }
};
export const cooAttachments = (state = {}, action) => {
  switch (action.type) {
    case SEND_COO_ATTACHMENTS_DONE:
      return action.data;
    default:
      return state;
  }
};

export const sendDeleteRequestInfo = (state = false, action) => {
  switch (action.type) {
    case DELETE_REQUEST:
      return true;
    case DELETE_REQUEST_DONE:
      return false;
    default:
      return state;
  }
};
export const requestDeleted = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REQUEST_DONE:
      return action.data;
    default:
      return state;
  }
};
export const getRakIssuedRequestList = (state = false, action) => {
  switch (action.type) {
    case GET_RAK_ISSUED_REQUESTS_LIST:
      return true;
    case GET_RAK_ISSUED_REQUESTS_LIST_DONE:
      return false;
    default:
      return state;
  }
};
export const rakIssuedRequestListDone = (state = {}, action) => {
  switch (action.type) {
    case GET_RAK_ISSUED_REQUESTS_LIST_DONE:
      return action.data;
    default:
      return state;
  }
};

export const sendPaymentRequest = (state = false, action) => {
  switch (action.type) {
    case SEND_PAYMENT_REQUEST_DATA:
      return true;
    case SEND_PAYMENT_REQUEST_DATA_DONE:
      return false;
    default:
      return state;
  }
};
export const paymentRequest = (state = {}, action) => {
  switch (action.type) {
    case SEND_PAYMENT_REQUEST_DATA_DONE:
      return action.data;
    default:
      return state;
  }
};
export const getPaymentDetails = (state = false, action) => {
  switch (action.type) {
    case GET_PAYMENT_DETAILS_DATA:
      return true;
    case GET_PAYMENT_DETAILS_DATA_DONE:
      return false;
    default:
      return state;
  }
};
export const paymentDetails = (state = {}, action) => {
  switch (action.type) {
    case GET_PAYMENT_DETAILS_DATA_DONE:
      return action.data;
    default:
      return state;
  }
};
export const sendPaymentConfirm = (state = false, action) => {
  switch (action.type) {
    case POST_CONFIRM_PAYMENT_DATA:
      return true;
    case POST_CONFIRM_PAYMENT_DATA_DONE:
      return false;
    default:
      return state;
  }
};
export const confirmOnlinePayment = (state = {}, action) => {
  switch (action.type) {
    case POST_CONFIRM_PAYMENT_DATA_DONE:
      return action.data;
    default:
      return state;
  }
};
export const getTotals = (state = false, action) => {
  switch (action.type) {
    case GET_TOTALS_DATA:
      return true;
    case GET_TOTALS_DATA_DONE:
      return false;
    default:
      return state;
  }
};
export const totalRequests = (state = {}, action) => {
  switch (action.type) {
    case GET_TOTALS_DATA_DONE:
      return action.data;
    default:
      return state;
  }
};
export const getRatificationRequestDetails = (state = false, action) => {
  switch (action.type) {
    case GET_RATIFICATION_REQUEST_DATA:
      return true;
    case GET_RATIFICATION_REQUEST_DATA_DONE:
      return false;
    default:
      return state;
  }
};
export const ratificationRequestDetails = (state = {}, action) => {
  switch (action.type) {
    case GET_RATIFICATION_REQUEST_DATA_DONE:
      return action.data;
    default:
      return state;
  }
};
export const getRatificationRequestAttach = (state = false, action) => {
  switch (action.type) {
    case GET_RATIFICATION_ATTACH_DATA:
      return true;
    case GET_RATIFICATION_ATTACH_DATA_DONE:
      return false;
    default:
      return state;
  }
};
export const ratificationRequestAttach = (state = {}, action) => {
  switch (action.type) {
    case GET_RATIFICATION_ATTACH_DATA_DONE:
      return action.data;
    default:
      return state;
  }
};
export const sendRatificationReqUpdate = (state = false, action) => {
  switch (action.type) {
    case SEND_RATIFICATION_UPDATE_REQUEST:
      return true;
    case SEND_RATIFICATION_UPDATE_REQUEST_DONE:
      return false;
    default:
      return state;
  }
};
export const ratificationRequestUpdate = (state = [], action) => {
  switch (action.type) {
    case SEND_RATIFICATION_UPDATE_REQUEST_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getCooAdditionalRequestDetails = (state = false, action) => {
  switch (action.type) {
    case GET_COO_ADDITIONAL_REQUEST_DETAILS:
      return true;
    case GET_COO_ADDITIONAL_REQUEST_DETAILS_DONE:
      return false;
    default:
      return state;
  }
};
export const cooAdditionalRequestDetails = (state = [], action) => {
  switch (action.type) {
    case GET_COO_ADDITIONAL_REQUEST_DETAILS_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getOtherRequestDetails = (state = false, action) => {
  switch (action.type) {
    case GET_OTHER_REQUEST_DETAILS:
      return true;
    case GET_OTHER_REQUEST_DETAILS_DONE:
      return false;
    default:
      return state;
  }
};
export const otherRequestDetails = (state = [], action) => {
  switch (action.type) {
    case GET_OTHER_REQUEST_DETAILS_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getCooEditRequestDetails = (state = false, action) => {
  switch (action.type) {
    case GET_COO_EDIT_REQUEST_DETAILS:
      return true;
    case GET_COO_EDIT_REQUEST_DETAILS_DONE:
      return false;
    default:
      return state;
  }
};
export const cooEditRequestDetails = (state = [], action) => {
  switch (action.type) {
    case GET_COO_EDIT_REQUEST_DETAILS_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getCooEditRequestOriginDetails = (state = false, action) => {
  switch (action.type) {
    case GET_COO_EDIT_REQUEST_ORIGIN_DETAILS:
      return true;
    case GET_COO_EDIT_REQUEST_ORIGIN_DETAILS_DONE:
      return false;
    default:
      return state;
  }
};
export const cooEditRequestOriginDetails = (state = [], action) => {
  switch (action.type) {
    case GET_COO_EDIT_REQUEST_ORIGIN_DETAILS_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getCooGoodsEditData = (state = false, action) => {
  switch (action.type) {
    case GET_COO_EDIT_GOODS_DATA:
      return true;
    case GET_COO_EDIT_GOODS_DATA_DONE:
      return false;
    default:
      return state;
  }
};
export const cooGoodsEditData = (state = [], action) => {
  switch (action.type) {
    case GET_COO_EDIT_GOODS_DATA_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getCooStamps = (state = false, action) => {
  switch (action.type) {
    case GET_COO_STAMPS:
      return true;
    case GET_COO_STAMPS_DONE:
      return false;
    default:
      return state;
  }
};
export const cooStamps = (state = [], action) => {
  switch (action.type) {
    case GET_COO_STAMPS_DONE:
      return action.data;
    default:
      return state;
  }
};

export const checkInvoiceNo = (state = false, action) => {
  switch (action.type) {
    case CHECK_INVOICE_NO:
      return true;
    case CHECK_INVOICE_NO_DONE:
      return false;
    default:
      return state;
  }
};
export const invoiceNoChecked = (state = [], action) => {
  switch (action.type) {
    case CHECK_INVOICE_NO_DONE:
      return action.data;
    default:
      return state;
  }
};

export const sendDeletedAttachments = (state = false, action) => {
  switch (action.type) {
    case SEND_DELETED_ATTACHMENTS:
      return true;
    case SEND_DELETED_ATTACHMENTS_DONE:
      return false;
    default:
      return state;
  }
};
export const deletedAttachments = (state = [], action) => {
  switch (action.type) {
    case SEND_DELETED_ATTACHMENTS_DONE:
      return action.data;
    default:
      return state;
  }
};
export const sendCooAdditionalRequestUpdate = (state = false, action) => {
  switch (action.type) {
    case SEND_COO_ADDITIONAL_REQUEST_UPDATE:
      return true;
    case SEND_COO_ADDITIONAL_REQUEST_UPDATE_DONE:
      return false;
    default:
      return state;
  }
};
export const cooAdditionalRequestUpdated = (state = [], action) => {
  switch (action.type) {
    case SEND_COO_ADDITIONAL_REQUEST_UPDATE_DONE:
      return action.data;
    default:
      return state;
  }
};

export const sendOtherRequestUpdate = (state = false, action) => {
  switch (action.type) {
    case SEND_OTHER_REQUEST_UPDATE:
      return true;
    case SEND_OTHER_REQUEST_UPDATE_DONE:
      return false;
    default:
      return state;
  }
};
export const otherRequestUpdated = (state = [], action) => {
  switch (action.type) {
    case SEND_OTHER_REQUEST_UPDATE_DONE:
      return action.data;
    default:
      return state;
  }
};

export const sendMostUsedService = (state = false, action) => {
  switch (action.type) {
    case SEND_MOST_USED_SERVICE:
      return true;
    case SEND_MOST_USED_SERVICE_DONE:
      return false;
    default:
      return state;
  }
};
export const mostUsedService = (state = [], action) => {
  switch (action.type) {
    case SEND_MOST_USED_SERVICE_DONE:
      return action.data;
    default:
      return state;
  }
};
export const getMostUsedService = (state = false, action) => {
  switch (action.type) {
    case GET_MOST_USED_SERVICE:
      return true;
    case GET_MOST_USED_SERVICE_DONE:
      return false;
    default:
      return state;
  }
};
export const mostUsedServiceList = (state = [], action) => {
  switch (action.type) {
    case GET_MOST_USED_SERVICE_DONE:
      return action.data;
    default:
      return state;
  }
};
export const getCooRequestDetails = (state = false, action) => {
  switch (action.type) {
    case GET_COO_REQUEST_DETAILS:
      return true;
    case GET_COO_REQUEST_DETAILS_DONE:
      return false;
    default:
      return state;
  }
};
export const cooRequestDetails = (state = [], action) => {
  switch (action.type) {
    case GET_COO_REQUEST_DETAILS_DONE:
      return action.data;
    default:
      return state;
  }
};
export const sendCooRequestUpdate = (state = false, action) => {
  switch (action.type) {
    case SEND_COO_UPDATE_REQUEST:
      return true;
    case SEND_COO_UPDATE_REQUEST_DONE:
      return false;
    default:
      return state;
  }
};
export const cooRequestUpdated = (state = [], action) => {
  switch (action.type) {
    case SEND_COO_UPDATE_REQUEST_DONE:
      return action.data;
    default:
      return state;
  }
};
export const sendUpdatedPassword = (state = false, action) => {
  switch (action.type) {
    case SEND_UPDATED_PASSWORD:
      return true;
    case SEND_UPDATED_PASSWORD_DONE:
      return false;
    default:
      return state;
  }
};
export const passwordUpdated = (state = [], action) => {
  switch (action.type) {
    case SEND_UPDATED_PASSWORD_DONE:
      return action.data;
    default:
      return state;
  }
};
export const searchByKeyword = (state = false, action) => {
  switch (action.type) {
    case POST_SEARCH_KEYWORD:
      return true;
    case POST_SEARCH_KEYWORD_DATA:
      return false;
    default:
      return state;
  }
};
export const searchByKeywordData = (state = [], action) => {
  switch (action.type) {
    case POST_SEARCH_KEYWORD_DATA:
      return action.data;
    default:
      return state;
  }
};
export const sendCustomerRate = (state = false, action) => {
  switch (action.type) {
    case SEND_CUSTOMER_RATE:
      return true;
    case SEND_CUSTOMER_RATE_DONE:
      return false;
    default:
      return state;
  }
};
export const sendCustomerRateData = (state = [], action) => {
  switch (action.type) {
    case SEND_CUSTOMER_RATE_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getPaymentTrx = (state = false, action) => {
  switch (action.type) {
    case GET_PAYMENT_TRX:
      return true;
    case GET_PAYMENT_TRX_DONE:
      return false;
    default:
      return state;
  }
};
export const paymentTrx = (state = [], action) => {
  switch (action.type) {
    case GET_PAYMENT_TRX_DONE:
      return action.data;
    default:
      return state;
  }
};

export const sendMemberRegister = (state = false, action) => {
  switch (action.type) {
    case SEND_MEMBER_REGISTER:
      return true;
    case SEND_MEMBER_REGISTER_DONE:
      return false;
    default:
      return state;
  }
};
export const memberRegister = (state = [], action) => {
  switch (action.type) {
    case SEND_MEMBER_REGISTER_DONE:
      return action.data;
    default:
      return state;
  }
};
export const sendMemberProfileUpdate = (state = false, action) => {
  switch (action.type) {
    case SEND_MEMBER_PROFILE_UPDATE:
      return true;
    case SEND_MEMBER_PROFILE_UPDATE_DONE:
      return false;
    default:
      return state;
  }
};
export const memberProfileUpdated = (state = [], action) => {
  switch (action.type) {
    case SEND_MEMBER_PROFILE_UPDATE_DONE:
      return action.data;
    default:
      return state;
  }
};
export const serviceLoginUpdate = (state = false, action) => {
  switch (action.type) {
    case SERVICE_LOGIN_UPDATE:
      return true;
    case SERVICE_LOGIN_UPDATE_DONE:
      return false;
    default:
      return state;
  }
};
export const serviceLoginUpdatedDone = (state = [], action) => {
  switch (action.type) {
    case SERVICE_LOGIN_UPDATE_DONE:
      return action.data;
    default:
      return state;
  }
};
export const getCirculars = (state = false, action) => {
  switch (action.type) {
    case GET_CIRCULARS:
      return true;
    case GET_CIRCULARS_DONE:
      return false;
    default:
      return state;
  }
};
export const getCircularsDone = (state = [], action) => {
  switch (action.type) {
    case GET_CIRCULARS_DONE:
      return action.data;
    default:
      return state;
  }
};

export const sendNotification = (state = false, action) => {
  switch (action.type) {
    case SEND_NOTIFICATION:
      return true;
    case SEND_NOTIFICATION_DONE:
      return false;
    default:
      return state;
  }
};
export const sendNotificationDone = (state = {}, action) => {
  switch (action.type) {
    case SEND_NOTIFICATION_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getNotification = (state = false, action) => {
  switch (action.type) {
    case GET_NOTIFICATION:
      return true;
    case GET_NOTIFICATION_DONE:
      return false;
    default:
      return state;
  }
};
export const getNotificationDone = (state = {}, action) => {
  switch (action.type) {
    case GET_NOTIFICATION_DONE:
      return action.data;
    default:
      return state;
  }
};

export const sendEmail = (state = false, action) => {
  switch (action.type) {
    case SEND_EMAIL:
      return true;
    case SEND_EMAIL_DONE:
      return false;
    default:
      return state;
  }
};
export const sendEmailDone = (state = {}, action) => {
  switch (action.type) {
    case SEND_EMAIL_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getFileList = (state = false, action) => {
  switch (action.type) {
    case GET_FILE_LIST:
      return true;
    case GET_FILE_LIST_DONE:
      return false;
    default:
      return state;
  }
};
export const getFileListDone = (state = false, action) => {
  switch (action.type) {
    case GET_FILE_LIST_DONE:
      return action.data;
    default:
      return state;
  }
};

export const fileStamp = (state = false, action) => {
  switch (action.type) {
    case FILE_STAMP:
      return true;
    case FILE_STAMP_DONE:
      return false;
    default:
      return state;
  }
};
export const fileStampDone = (state = [], action) => {
  switch (action.type) {
    case FILE_STAMP_DONE:
      return action.data;
    default:
      return state;
  }
};

export const finishFileStamp = (state = false, action) => {
  switch (action.type) {
    case FINISH_FILE_STAMP:
      return true;
    case FINISH_FILE_STAMP_DONE:
      return false;
    default:
      return state;
  }
};
export const finishFileStampDone = (state = [], action) => {
  switch (action.type) {
    case FINISH_FILE_STAMP_DONE:
      return action.data;
    default:
      return state;
  }
};

export const supplierLogIn = (state = false, action) => {
  switch (action.type) {
    case SUPPLIER_LOGIN:
      return true;
    case SUPPLIER_LOGIN_DONE:
      return false;
    default:
      return state;
  }
};
export const supplierLogInDone = (state = 0, action) => {
  switch (action.type) {
    case SUPPLIER_LOGIN_DONE:
      return action.status;
    default:
      return state;
  }
};

export const sendSupplierRegister = (state = false, action) => {
  switch (action.type) {
    case SEND_SUPPLIER_REGISTER:
      return true;
    case SEND_SUPPLIER_REGISTER_DONE:
      return false;
    default:
      return state;
  }
};
export const supplierRegister = (state = [], action) => {
  switch (action.type) {
    case SEND_SUPPLIER_REGISTER_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getServiceStep = (state = false, action) => {
  switch (action.type) {
    case GET_SERVICE_STEP:
      return true;
    case GET_SERVICE_STEP_DONE:
      return false;
    default:
      return state;
  }
};
export const getServiceStepDone = (state = [], action) => {
  switch (action.type) {
    case GET_SERVICE_STEP_DONE:
      return action.data;
    default:
      return state;
  }
};
export const postPrintTracking = (state = false, action) => {
  switch (action.type) {
    case POST_PRINT_TRACKING:
      return true;
    case POST_PRINT_TRACKING_DONE:
      return false;
    default:
      return state;
  }
};
export const postPrintTrackingDone = (state = {}, action) => {
  switch (action.type) {
    case POST_PRINT_TRACKING_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getTrxCooList = (state = false, action) => {
  switch (action.type) {
    case GET_TRX_COO_LIST:
      return true;
    case GET_TRX_COO_LIST_DONE:
      return false;
    default:
      return state;
  }
};
export const getTrxCooListDone = (state = [], action) => {
  switch (action.type) {
    case GET_TRX_COO_LIST_DONE:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  spinnerToggle,
  postBusinessDirectoryForm,
  businessDirectoryFormReturned,
  getEServicesDetails,
  eServicesDetailsReturned,
  postCooVerificationForm,
  cooVerificationFormReturned,
  getRatificationVerification,
  ratificationVerificationReturned,
  serviceLogIn,
  serviceLogInDone,
  serviceLogInFaild,
  selectMenuData,
  selectMenuDataDone,
  calculateFees,
  calculateFeesDone,
  sendNewCOOForm,
  sendNewCOOFormDone,
  uploadRakFile,
  uploadRakFileDone,
  getRakRequestList,
  rakRequestListDone,
  getCooVerificationData,
  cooVerificationDataReturned,
  getCooAccreditedList,
  cooAccreditedListDone,
  sendCooAdditionalRequest,
  cooAdditionalRequestDone,
  sendOtherRequest,
  otherRequestDone,
  sendCooEditRequest,
  cooEditRequestDone,
  getGoodsDetailsList,
  goodsDetailsList,
  sendCooGoodsEditRequest,
  sendCooEditGoodsDone,
  getRatificationType,
  ratificationType,
  getRatificationDocType,
  ratificationDocType,
  sendRatificationReq,
  ratificationRequest,
  getMembershipVerify,
  membershipVerify,
  getMembershipFees,
  membershipFees,
  getMembershipProfile,
  membershipProfile,
  sendCooAttachments,
  cooAttachments,
  sendDeleteRequestInfo,
  requestDeleted,
  getRakIssuedRequestList,
  rakIssuedRequestListDone,
  sendPaymentRequest,
  paymentRequest,
  getTotals,
  totalRequests,
  getPaymentDetails,
  paymentDetails,
  sendPaymentConfirm,
  confirmOnlinePayment,
  getRatificationRequestDetails,
  ratificationRequestDetails,
  getRatificationRequestAttach,
  ratificationRequestAttach,
  sendRatificationReqUpdate,
  ratificationRequestUpdate,
  getCooAdditionalRequestDetails,
  cooAdditionalRequestDetails,
  getOtherRequestDetails,
  otherRequestDetails,
  getCooEditRequestDetails,
  cooEditRequestDetails,
  getCooEditRequestOriginDetails,
  cooEditRequestOriginDetails,
  getCooGoodsEditData,
  cooGoodsEditData,
  getEServicesGroups,
  eServicesGroupsReturned,
  getCooStamps,
  cooStamps,
  checkInvoiceNo,
  invoiceNoChecked,
  sendDeletedAttachments,
  deletedAttachments,
  sendCooAdditionalRequestUpdate,
  cooAdditionalRequestUpdated,
  sendOtherRequestUpdate,
  otherRequestUpdated,
  sendMostUsedService,
  mostUsedService,
  getMostUsedService,
  mostUsedServiceList,
  getEServicesList,
  eServicesListReturned,
  getCooRequestDetails,
  cooRequestDetails,
  sendCooRequestUpdate,
  cooRequestUpdated,
  sendUpdatedPassword,
  passwordUpdated,
  isicActivityData,
  isicActivityDataDone,
  postBusinessDirectoryByActivity,
  businessDirectoryByActivityReturned,
  searchByKeyword,
  searchByKeywordData,
  sendCustomerRate,
  sendCustomerRateData,
  getPaymentTrx,
  paymentTrx,
  sendMemberRegister,
  memberRegister,
  sendMemberProfileUpdate,
  memberProfileUpdated,
  serviceLoginUpdate,
  serviceLoginUpdatedDone,
  getCirculars,
  getCircularsDone,
  sendNotification,
  sendNotificationDone,
  sendEmail,
  sendEmailDone,
  getFileList,
  getFileListDone,
  fileStamp,
  fileStampDone,
  finishFileStamp,
  finishFileStampDone,
  supplierLogIn,
  supplierLogInDone,
  sendSupplierRegister,
  supplierRegister,
  getNotification,
  getNotificationDone,
  getServiceStep,
  getServiceStepDone,
  postPrintTracking,
  postPrintTrackingDone,
  getTrxCooList,
  getTrxCooListDone,
});
