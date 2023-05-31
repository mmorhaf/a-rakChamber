import { put, takeLatest, call } from "redux-saga/effects";
import actions from "../../actions";

const { LOADING_ACTION, loadingReturned } = actions;

function* performGetLoading(action) {
  try {
    const { loading } = action;

    yield put(loadingReturned({ data: loading }));
  } catch (error) {
    console.error(error);
  }
}
export function* watchGetLoading() {
  yield takeLatest(LOADING_ACTION, performGetLoading);
}
