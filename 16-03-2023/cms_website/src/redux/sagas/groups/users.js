import { put, takeLatest, call } from "redux-saga/effects";

import {
  logIn,
  signUp,
  forgotPassword,
  resetPassword,
  userConfirm,
  updateUserById,
  activateAccount,
} from "../../network/users";
import actions from "../../actions";
import { push } from "connected-react-router";
import { store } from "../../store";

const {
  LOG_IN_ACTION,
  logInComplete,
  SIGN_UP_ACTION,
  signUpComplete,
  FORGOT_PASSWORD_ACTION,
  forgotPasswordEmailReturned,
  RESET_PASSWORD_ACTION,
  resetPasswordReturned,
  CONFIRM_USER,
  confirmUserReturned,
  LOG_OUT,
  UPDATE_USER_Action,
  userUpdated,
  ACTIVATE_ACCOUNT,
  activateAccountReturned,
} = actions;

function* performSignIn(action) {
  try {
    let data = action.payload;
    const result = yield call(logIn, data);
    if (result) {
      yield put(logInComplete({ data: result.data }));
      sessionStorage.setItem("authUserSession", result.data.token);
      sessionStorage.setItem(
        "profileSession",
        JSON.stringify(result.data.user)
      );
      if (data.remember) {
        localStorage.setItem("authUser", result.data.token);
        localStorage.setItem("profile", JSON.stringify(result.data.user));
      }
    } else yield put(logInComplete({ data: [] }));
  } catch {
    yield put(logInComplete({ data: [] }));
    return;
  }
}

export function* watchLogIn() {
  yield takeLatest(LOG_IN_ACTION, performSignIn);
}

function* performSignUp(action) {
  try {
    let data = action.payload;
    const result = yield call(signUp, data);

    if (result) yield put(signUpComplete({ data: result.data }));
    else yield put(signUpComplete({ data: [] }));
  } catch {
    yield put(signUpComplete({ data: [] }));
    return;
  }
}

export function* watchSignUp() {
  yield takeLatest(SIGN_UP_ACTION, performSignUp);
}

function* performForgotPassword(action) {
  try {
    let data = action.payload;
    const result = yield call(forgotPassword, data);
    if (result) yield put(forgotPasswordEmailReturned({ data: result.data }));
    else yield put(forgotPasswordEmailReturned({ data: [] }));
  } catch {
    yield put(forgotPasswordEmailReturned({ data: [] }));
    return;
  }
}

export function* watchForgotPassword() {
  yield takeLatest(FORGOT_PASSWORD_ACTION, performForgotPassword);
}

function* performResetPassword(action) {
  try {
    let data = action.payload;
    delete data["confirmPassword"];
    delete data["confirmOldPassword"];
    const result = yield call(resetPassword, data);
    if (result) yield put(resetPasswordReturned({ data: result.data }));
    else yield put(resetPasswordReturned({ data: [] }));
  } catch {
    yield put(resetPasswordReturned({ data: [] }));
    return;
  }
}

export function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD_ACTION, performResetPassword);
}

function* performConfirmUser(action) {
  try {
    let data = action.data;
    const result = yield call(userConfirm, data);
    if (result) yield put(confirmUserReturned({ data: result.data }));
    else yield put(confirmUserReturned({ data: [] }));
  } catch {
    yield put(confirmUserReturned({ data: [] }));
    return;
  }
}

export function* watchConfirmUser() {
  yield takeLatest(CONFIRM_USER, performConfirmUser);
}

function* performLogOut() {
  localStorage.removeItem("authUser");
  sessionStorage.removeItem("authUserSession");
  sessionStorage.removeItem("profileSession");
  sessionStorage.removeItem("supplierAuthUserSession");
  sessionStorage.removeItem("supplierProfile");
  localStorage.removeItem("profile");
  yield put(logInComplete({ data: null }));
  store.dispatch(push("/home"));
}

export function* watchLogOut() {
  yield takeLatest(LOG_OUT, performLogOut);
}

function* performUserUpdate(action) {
  try {
    let data = action.payload;
    let userId = action.id;
    const result = yield call(updateUserById, userId, data);
    if (result) {
      sessionStorage.setItem("serviceProfile", JSON.stringify(result?.data));
      yield put(userUpdated({ response: result.data }));
    } else yield put(userUpdated({ response: result }));
  } catch (error) {
    yield put(userUpdated({ response: "" }));
  }
}
export function* watchUpdateUser() {
  yield takeLatest(UPDATE_USER_Action, performUserUpdate);
}

function* performActivateAccount(action) {
  try {
    let data = action.payload;
    const result = yield call(activateAccount, data);
    if (result) yield put(activateAccountReturned({ data: result.data }));
    else yield put(activateAccountReturned({ data: result.data }));
  } catch {
    yield put(activateAccountReturned({ data: [] }));
    return;
  }
}

export function* watchActivateAccount() {
  yield takeLatest(ACTIVATE_ACCOUNT, performActivateAccount);
}
