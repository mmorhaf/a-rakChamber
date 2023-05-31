import actions from "../../actions";
import { combineReducers } from "redux";

const {
  POST_SERVICE_FORM,
  POST_SERVICE_FORM_RETURNED,
  GET_MY_REQUESTS,
  GET_MY_REQUESTS_DONE,
  GET_REQUEST_DETAILS,
  GET_REQUEST_DETAILS_DONE,
  ADD_REQUEST_NOTE,
  ADD_REQUEST_NOTE_DONE,
  GET_REQUEST_NOTES,
  GET_REQUEST_NOTES_DONE,
  GET_REQUEST_STATUS_CHANGES,
  GET_REQUEST_STATUS_CHANGES_DONE,
  POST_SUPPLIER_FORM,
  POST_SUPPLIER_FORM_RETURNED,
  GET_QRCODE,
  GET_QRCODE_DONE,
  IS_SERVICE_PAGE,
  SERVICE_PAGE,
  NOTIFICATION_REQUEST,
  NOTIFICATION_MARKED,
} = actions;

export const postServiceForm = (state = false, action) => {
  switch (action.type) {
    case POST_SERVICE_FORM:
      return true;
    case POST_SERVICE_FORM_RETURNED:
      return false;
    default:
      return state;
  }
};
export const serviceFormReturned = (state = {}, action) => {
  switch (action.type) {
    case POST_SERVICE_FORM_RETURNED:
      return action.data;
    default:
      return state;
  }
};
export const getMyRequests = (state = false, action) => {
  switch (action.type) {
    case GET_MY_REQUESTS:
      return true;
    case GET_MY_REQUESTS_DONE:
      return false;
    default:
      return state;
  }
};
export const myRequests = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_REQUESTS_DONE:
      return action.data;
    default:
      return state;
  }
};
export const gettingRequestDetails = (state = false, action) => {
  switch (action.type) {
    case GET_REQUEST_DETAILS:
      return true;
    case GET_REQUEST_DETAILS_DONE:
      return false;
    default:
      return state;
  }
};
export const requestDetails = (state = false, action) => {
  switch (action.type) {
    case GET_REQUEST_DETAILS_DONE:
      return action.data;
    default:
      return state;
  }
};

export const addingRequestNote = (state = false, action) => {
  switch (action.type) {
    case ADD_REQUEST_NOTE:
      return true;
    case ADD_REQUEST_NOTE_DONE:
      return false;
    default:
      return state;
  }
};

export const requestNoteAdded = (state = false, action) => {
  switch (action.type) {
    case ADD_REQUEST_NOTE_DONE:
      return action.data;
    default:
      return state;
  }
};

export const getRequestNotes = (state = false, action) => {
  switch (action.type) {
    case GET_REQUEST_NOTES:
      return true;
    case GET_REQUEST_NOTES_DONE:
      return false;
    default:
      return state;
  }
};

export const requestNotes = (state = false, action) => {
  switch (action.type) {
    case GET_REQUEST_NOTES_DONE:
      return action.data;
    default:
      return state;
  }
};
export const gettingRequestStatusChanges = (state = false, action) => {
  switch (action.type) {
    case GET_REQUEST_STATUS_CHANGES:
      return true;
    case GET_REQUEST_STATUS_CHANGES_DONE:
      return false;
    default:
      return state;
  }
};

export const requestStatusChanges = (state = false, action) => {
  switch (action.type) {
    case GET_REQUEST_STATUS_CHANGES_DONE:
      return action.data;

    default:
      return state;
  }
};

export const postSupplierForm = (state = false, action) => {
  switch (action.type) {
    case POST_SUPPLIER_FORM:
      return true;
    case POST_SUPPLIER_FORM_RETURNED:
      return false;
    default:
      return state;
  }
};
export const supplierFormReturned = (state = {}, action) => {
  switch (action.type) {
    case POST_SUPPLIER_FORM_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const getQRCode = (state = false, action) => {
  switch (action.type) {
    case GET_QRCODE:
      return true;
    case GET_QRCODE_DONE:
      return false;
    default:
      return state;
  }
};
export const QRCode = (state = {}, action) => {
  switch (action.type) {
    case GET_QRCODE_DONE:
      return action.data;
    default:
      return state;
  }
};

export const servicePageCheck = (state = false, action) => {
  switch (action.type) {
    case IS_SERVICE_PAGE:
      return true;
    case SERVICE_PAGE:
      return false;
    default:
      return state;
  }
};

export const markNotification = (state = false, action) => {
  switch (action.type) {
    case NOTIFICATION_REQUEST:
      return true;
    case NOTIFICATION_MARKED:
      return false;
    default:
      return state;
  }
};

export const notificationMarked = (state = false, action) => {
  switch (action.type) {
    case NOTIFICATION_MARKED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  postServiceForm,
  serviceFormReturned,
  getMyRequests,
  myRequests,
  gettingRequestDetails,
  requestDetails,
  addingRequestNote,
  requestNoteAdded,
  getRequestNotes,
  requestNotes,
  gettingRequestStatusChanges,
  requestStatusChanges,
  postSupplierForm,
  supplierFormReturned,
  getQRCode,
  QRCode,
  servicePageCheck,
  markNotification,
  notificationMarked,
});
