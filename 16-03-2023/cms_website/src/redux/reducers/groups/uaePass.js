import actions from "../../actions";
import { combineReducers } from "redux";

const {
  UPDATE_AUTH_CODE,
  GET_ACCESS_TOKEN,
  GET_ACCESS_TOKEN_DONE,
  GET_PROFILE,
  GET_PROFILE_DONE,
  UAE_PASS_LOGIN,
  UAE_PASS_LOGIN_DONE,
  GET_UAE_PASS_PERSON,
  GET_UAE_PASS_PERSON_DONE,
  SEND_UAE_PASS_PERSON_DATA,
  SEND_UAE_PASS_PERSON_DATA_DONE,
} = actions;

export const authCode = (state = false, action) => {
  switch (action.type) {
    case UPDATE_AUTH_CODE:
      return action.payload;
    default:
      return state;
  }
};

export const accessTokenLoading = (state = false, action) => {
  switch (action.type) {
    case GET_ACCESS_TOKEN:
      return true;
    case GET_ACCESS_TOKEN_DONE:
      return false;
    default:
      return state;
  }
};

export const accessToken = (state = false, action) => {
  switch (action.type) {
    case GET_ACCESS_TOKEN_DONE:
      return action.payload;
    default:
      return state;
  }
};

export const uaepassProfileLoading = (state = false, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return true;
    case GET_PROFILE_DONE:
      return false;
    default:
      return state;
  }
};

export const uaepassProfile = (state = [], action) => {
  switch (action.type) {
    case GET_PROFILE_DONE:
      return action.payload;
    default:
      return state;
  }
};
export const uaepassLoginLoading = (state = false, action) => {
  switch (action.type) {
    case UAE_PASS_LOGIN:
      return true;
    case UAE_PASS_LOGIN_DONE:
      return false;
    default:
      return state;
  }
};

export const uaepassLoginDone = (state = [], action) => {
  switch (action.type) {
    case UAE_PASS_LOGIN_DONE:
      return action.data;
    default:
      return state;
  }
};
export const uaepassPersonLoading = (state = false, action) => {
  switch (action.type) {
    case GET_UAE_PASS_PERSON:
      return true;
    case GET_UAE_PASS_PERSON_DONE:
      return false;
    default:
      return state;
  }
};

export const uaepassPersonDone = (state = [], action) => {
  switch (action.type) {
    case GET_UAE_PASS_PERSON_DONE:
      return action.data;
    default:
      return state;
  }
};
export const uaepassPersonDataLoading = (state = false, action) => {
  switch (action.type) {
    case SEND_UAE_PASS_PERSON_DATA:
      return true;
    case SEND_UAE_PASS_PERSON_DATA_DONE:
      return false;
    default:
      return state;
  }
};

export const uaepassPersonDataDone = (state = [], action) => {
  switch (action.type) {
    case SEND_UAE_PASS_PERSON_DATA_DONE:
      return action.data;
    default:
      return state;
  }
};
export default combineReducers({
  authCode,
  accessTokenLoading,
  accessToken,
  uaepassProfileLoading,
  uaepassProfile,
  uaepassLoginLoading,
  uaepassLoginDone,
  uaepassPersonLoading,
  uaepassPersonDone,
  uaepassPersonDataLoading,
  uaepassPersonDataDone,
});
