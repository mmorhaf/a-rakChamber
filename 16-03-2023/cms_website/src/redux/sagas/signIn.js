/*import { put, takeLatest, call } from "redux-saga/effects";
import * as signInRequests from "../network/signInRequests";
import { SIGN_IN, signInComplete } from "../actions/actionTypes";

//translations

function* performSignIn({ data }) {
  try {
    const result = yield call(signInRequests.signIn, { data });
    if (result) yield put(signInComplete(result));
    else yield put(signInComplete({ data: [] }));
  } catch {
    yield put(signInComplete({ data: [] }));
    return;
  }
}

export function* watchSignIn() {
  yield takeLatest(SIGN_IN, performSignIn);
}*/
