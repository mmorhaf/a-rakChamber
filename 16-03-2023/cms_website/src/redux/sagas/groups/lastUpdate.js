import { put, takeLatest, call } from "redux-saga/effects";
import { getLastUpdate } from "../../network/lastUpdate";
import actions from "../../actions";

const { GET_LAST_UPDATE, lastUpdateReturned } = actions;

function* performGetLastUpdate(action) {
  try {
    const result = yield call(getLastUpdate);

    if (result) yield put(lastUpdateReturned({ data: result.res }));
    else yield put(lastUpdateReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}
export function* watchGetLastUpdate() {
  yield takeLatest(GET_LAST_UPDATE, performGetLastUpdate);
}
