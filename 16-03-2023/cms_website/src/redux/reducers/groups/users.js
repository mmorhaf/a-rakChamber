import actions from "../../actions";
import { combineReducers } from "redux";

const {
  LOG_IN_ACTION,
  LOG_IN_COMPLETE,
  SIGN_UP_ACTION,
  SIGN_UP_COMPLETE,
  FORGOT_PASSWORD_ACTION,
  FORGOT_PASSWORD_EMAIL_RETURNED,
  RESET_PASSWORD_ACTION,
  RESET_PASSWORD_RETURNED,
  CONFIRM_USER,
  CONFIRM_USER_RETURNED,
  UPDATE_USER_Action,
  USER_UPDATED,
  ACTIVATE_ACCOUNT,
  ACTIVATE_ACCOUNT_RETURNED,
} = actions;

export const logIn = (state = false, action) => {
  switch (action.type) {
    case LOG_IN_ACTION:
      return true;
    case LOG_IN_COMPLETE:
      return false;
    default:
      return state;
  }
};
export const logInComplete = (state = false, action) => {
  switch (action.type) {
    case LOG_IN_COMPLETE:
      return action.data;
    default:
      return state;
  }
};

export const signUp = (state = false, action) => {
  switch (action.type) {
    case SIGN_UP_ACTION:
      return true;
    case SIGN_UP_COMPLETE:
      return false;
    default:
      return state;
  }
};
export const signUpComplete = (state = false, action) => {
  switch (action.type) {
    case SIGN_UP_COMPLETE:
      return action.data;
    default:
      return state;
  }
};

export const forgot = (state = false, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_ACTION:
      return true;
    case FORGOT_PASSWORD_EMAIL_RETURNED:
      return false;
    default:
      return state;
  }
};
export const forgotPasswordComplete = (state = null, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_EMAIL_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const reset = (state = false, action) => {
  switch (action.type) {
    case RESET_PASSWORD_ACTION:
      return true;
    case RESET_PASSWORD_RETURNED:
      return false;
    default:
      return state;
  }
};
export const resetPasswordComplete = (state = null, action) => {
  switch (action.type) {
    case RESET_PASSWORD_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const confirm = (state = false, action) => {
  switch (action.type) {
    case CONFIRM_USER:
      return true;
    case CONFIRM_USER_RETURNED:
      return false;
    default:
      return state;
  }
};
export const userConfirmReturned = (state = false, action) => {
  switch (action.type) {
    case CONFIRM_USER_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const updateUser = (state = false, action) => {
  switch (action.type) {
    case UPDATE_USER_Action:
      return true;
    case USER_UPDATED:
      return false;
    default:
      return state;
  }
};
export const userUpdated = (state = false, action) => {
  switch (action.type) {
    case USER_UPDATED:
      return action.response;
    default:
      return state;
  }
};

export const activateAccount = (state = false, action) => {
  switch (action.type) {
    case ACTIVATE_ACCOUNT:
      return true;
    case ACTIVATE_ACCOUNT_RETURNED:
      return false;
    default:
      return state;
  }
};
export const activateAccountReturned = (state = null, action) => {
  switch (action.type) {
    case ACTIVATE_ACCOUNT_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  logIn,
  logInComplete,
  forgot,
  forgotPasswordComplete,
  reset,
  resetPasswordComplete,
  signUp,
  signUpComplete,
  confirm,
  userConfirmReturned,
  updateUser,
  userUpdated,
  activateAccount,
  activateAccountReturned,
});
