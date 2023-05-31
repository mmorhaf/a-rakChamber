import actions from "../../actions";
import { combineReducers } from "redux";

const {
  GET_ALL,
  ALL_RETURNED,
  GET_BY_ID,
  BY_ID_RETURNED,
  GET_RESERVATIONS,
  ALL_RESERVATIONS_RETURNED,
  CREATE_NEW,
  CREATED,
  CLEAR,
  GET_ALL_PARTNERS,
  ALL_PARTNERS_RETURNED,
  GET_ALL_AB,
  ALL_AB_RETURNED,
  GET_NOTIFICATIONS,
  ALL_NOTIFICATIONS_RETURNED,
  GET_SUPPLIER_REQUEST_NOTES,
  ALL_SUPPLIER_NOTES_RETURNED,
  ADD_SUPPLIER_REQUEST_NOTE,
  ADD_SUPPLIER_REQUEST_NOTE_DONE,
  SET_PAGINATION,
  GET_DATA,
  DATA_RETURNED,
  ALL_CLEAR
} = actions;

export const getAll = (state = false, action) => {
  switch (action.type) {
    case GET_ALL:
      return true;
    case ALL_RETURNED:
      return false;
    default:
      return state;
  }
};
export const allReturned = (state = [], action) => {
  switch (action.type) {
    case ALL_RETURNED:
      if (action.data) {
        return {
          ...state,
          [action.data.returnedTypeName]:
            action.data[action.data.returnedTypeName],
          count:
            action.data.returnedTypeName === "posts" ? action.data.count : null,
        };
      } else return false;

    default:
      return state;
  }
};

export const getAllAb = (state = false, action) => {
  switch (action.type) {
    case GET_ALL_AB:
      return true;
    case ALL_AB_RETURNED:
      return false;
    default:
      return state;
  }
};
export const allAbReturned = (state = [], action) => {
  switch (action.type) {
    case ALL_AB_RETURNED:
      return {
        ...state,
        [action.data.returnedTypeName]:
          action.data[action.data.returnedTypeName],
        count: action.data.count,
      };

    default:
      return state;
  }
};



export const getAllPartners = (state = false, action) => {
  switch (action.type) {
    case GET_ALL_PARTNERS:
      return true;
    case ALL_PARTNERS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const allPartnersReturned = (state = [], action) => {
  switch (action.type) {
    case ALL_PARTNERS_RETURNED:
      return {
        ...state,
        [action.data.returnedTypeName]:
          action.data[action.data.returnedTypeName],
      };
    default:
      return state;
  }
};
export const getById = (state = false, action) => {
  switch (action.type) {
    case GET_BY_ID:
      return true;
    case BY_ID_RETURNED:
      return false;
    default:
      return state;
  }
};
export const byIdReturned = (state = false, action) => {
  switch (action.type) {
    case BY_ID_RETURNED:
      return action.data;
    default:
      return state;
  }
};


export const getData = (state = false, action) => {
  switch (action.type) {
    case GET_DATA:
      return true;
    case DATA_RETURNED:
      return false;
    default:
      return state;
  }
};
export const dataReturned = (state = [], action) => {
  switch (action.type) {
    case DATA_RETURNED:
      return {
        ...state,
        [action.data.returnedTypeName
          ? action.data.returnedTypeName
          : action?.dataObject]: action.data[action.data.returnedTypeName]
          ? action.data[action.data.returnedTypeName]
          : action?.data,
      };

    case ALL_CLEAR:
      return {
        [action.data.returnedTypeName]:
          action.data[action.data.returnedTypeName],
      };
    default:
      return state;
  }
};

export const getReservations = (state = false, action) => {
  switch (action.type) {
    case GET_RESERVATIONS:
      return true;
    case ALL_RESERVATIONS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const allReservationsReturned = (state = [], action) => {
  switch (action.type) {
    case ALL_RESERVATIONS_RETURNED:
      return {
        ...state,
        [action.data.returnedTypeName]:
          action.data[action.data.returnedTypeName],
      };
    default:
      return state;
  }
};

export const createNew = (state = false, action) => {
  switch (action.type) {
    case CREATE_NEW:
      return true;
    case CREATED:
      return false;
    default:
      return state;
  }
};
export const created = (state = false, action) => {
  switch (action.type) {
    case CREATED:
      return action.response;
    case CLEAR:
      return false;
    default:
      return state;
  }
};

export const getNotifications = (state = false, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return true;
    case ALL_NOTIFICATIONS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const allNotificationsReturned = (state = [], action) => {
  switch (action.type) {
    case ALL_NOTIFICATIONS_RETURNED:
      return {
        ...state,
        [action.data.returnedTypeName]:
          action.data[action.data.returnedTypeName],
        count: action.data.count,
      };
    default:
      return state;
  }
};

export const getSupplierRequestNotes = (state = false, action) => {
  switch (action.type) {
    case GET_SUPPLIER_REQUEST_NOTES:
      return true;
    case ALL_SUPPLIER_NOTES_RETURNED:
      return false;
    default:
      return state;
  }
};
export const allSupplierNotesReturned = (state = [], action) => {
  switch (action.type) {
    case ALL_SUPPLIER_NOTES_RETURNED:
      return {
        ...state,
        [action.data.returnedTypeName]:
          action.data[action.data.returnedTypeName],
        count: action.data.count,
      };
    default:
      return state;
  }
};

export const addSupplierRequestNote = (state = false, action) => {
  switch (action.type) {
    case ADD_SUPPLIER_REQUEST_NOTE:
      return true;
    case ADD_SUPPLIER_REQUEST_NOTE_DONE:
      return false;
    default:
      return state;
  }
};

export const addSupplierRequestNoteDone = (state = false, action) => {
  switch (action.type) {
    case ADD_SUPPLIER_REQUEST_NOTE_DONE:
      return action.data;
    default:
      return state;
  }
};

export const setPagination = (state = false, action) => {
  switch (action.type) {
    case SET_PAGINATION:
      return action?.data;
    default:
      return state;
  }
};

export default combineReducers({
  getAll,
  allReturned,
  getById,
  byIdReturned,
  getReservations,
  allReservationsReturned,
  createNew,
  created,
  getAllPartners,
  allPartnersReturned,
  getAllAb,
  allAbReturned,
  getNotifications,
  allNotificationsReturned,
  getSupplierRequestNotes,
  allSupplierNotesReturned,
  addSupplierRequestNote,
  addSupplierRequestNoteDone,
  setPagination,
  getData,
  dataReturned,
});
