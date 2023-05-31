import { put, takeLatest, call } from "redux-saga/effects";
import {
  getAccessToken,
  getUaepassProfile,
  getUaepassProfile2,
  getAccessToken2,
  uaePassLogin,
  uaePassPerson,
  uaePassPersonData,
  uaePassLogout,
} from "../../network/uaePass";
import actions from "../../actions";
import { push } from "connected-react-router";
import { store } from "../../store";
const {
  GET_ACCESS_TOKEN,
  getAccessTokenDone,
  GET_PROFILE,
  getProfileDone,
  UAE_PASS_LOGIN,
  uaePassLoginDone,
  GET_UAE_PASS_PERSON,
  getUaePassPersonDone,
  SEND_UAE_PASS_PERSON_DATA,
  sendUaePassPersonDataDone,
  UAE_PASS_LOGOUT,
} = actions;

function* performGetAccessToken(action) {
  const result = yield call(getAccessToken2, action.data);
  if (result.errorCode || !result.networkSuccess) {
    yield put(
      getAccessTokenDone({
        payload: result,
      })
    );
  } else {
    if (result.access_token)
      yield call(() =>
        localStorage.setItem("uaePassaccessToken", result.access_token)
      );

    yield put(
      getAccessTokenDone({
        payload: result,
      })
    );
  }
}
export function* watchGetAccessToken() {
  yield takeLatest(GET_ACCESS_TOKEN, performGetAccessToken);
}

function* performGetUaepassProfile(action) {
  const result = yield call(getUaepassProfile2, action.token);

  if (result.errorCode || !result.networkSuccess) {
    yield put(getProfileDone({ payload: result }));
  } else {
    yield put(
      getProfileDone({
        payload: {
          ...result,
        },
      })
    );
    sessionStorage.setItem("uaePassUserInfo", JSON.stringify(result.data));
  }
}
export function* watchGetUaepassProfile() {
  yield takeLatest(GET_PROFILE, performGetUaepassProfile);
}

function* performGetUaepassLogin(action) {
  try {
    const data = action.data;
    const result = yield call(uaePassLogin, data);
    if (result && result.networkSuccess)
      yield put(uaePassLoginDone({ data: { ...result } }));
    else {
      yield put(uaePassLoginDone({ data: [] }));
    }
  } catch (error) {
    yield put(uaePassLoginDone({ data: [] }));
  }
}

export function* watchGetUaepassLogin() {
  yield takeLatest(UAE_PASS_LOGIN, performGetUaepassLogin);
}

function* performGetUaepassPerson() {
  try {
    const result = yield call(uaePassPerson);
    if (result && result.networkSuccess)
      yield put(getUaePassPersonDone({ data: { ...result } }));
    else {
      yield put(getUaePassPersonDone({ data: [] }));
    }
  } catch (error) {
    yield put(getUaePassPersonDone({ data: [] }));
  }
}

export function* watchGetUaepassPerson() {
  yield takeLatest(GET_UAE_PASS_PERSON, performGetUaepassPerson);
}

function* performSendUaepassData(action) {
  try {
    const data = action.data;
    const result = yield call(uaePassPersonData, data);
    if (result && result.networkSuccess)
      yield put(sendUaePassPersonDataDone({ data: { ...result } }));
    else {
      yield put(sendUaePassPersonDataDone({ data: [] }));
    }
  } catch (error) {
    yield put(sendUaePassPersonDataDone({ data: [] }));
  }
}

export function* watchSendUaepassData() {
  yield takeLatest(SEND_UAE_PASS_PERSON_DATA, performSendUaepassData);
}

function* performUaepassLogOut() {
  yield call(uaePassLogout);
  sessionStorage.setItem("loggedType", 0);
  sessionStorage.setItem("memberType", "");
  sessionStorage.removeItem("updateUser");
  sessionStorage.removeItem("uaePassUserInfo");
  // store.dispatch(push("/login"));
}

export function* watchUaepassLogOut() {
  yield takeLatest(UAE_PASS_LOGOUT, performUaepassLogOut);
}
