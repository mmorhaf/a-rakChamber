import actions from "../../actions";
import { combineReducers } from "redux";

const {
  GET_ALL_CENTERS,
  ALL_CENTERS_RETURNED,
  GET_CENTER_BY_ID,
  CENTER_BY_ID_RETURNED,
} = actions;

export const getAllCenters = (state = false, action) => {
  switch (action.type) {
    case GET_ALL_CENTERS:
      return true;
    case ALL_CENTERS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const allCentersReturned = (state = false, action) => {
  switch (action.type) {
    case ALL_CENTERS_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const getCenterById = (state = false, action) => {
  switch (action.type) {
    case GET_CENTER_BY_ID:
      return true;
    case CENTER_BY_ID_RETURNED:
      return false;
    default:
      return state;
  }
};
export const centerByIdReturned = (state = false, action) => {
  switch (action.type) {
    case CENTER_BY_ID_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  getAllCenters,
  allCentersReturned,
  getCenterById,
  centerByIdReturned,
});
