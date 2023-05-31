import { put, takeLatest, call, takeEvery } from "redux-saga/effects";
import { fetchBlockData } from "../../network/blocks";
import actions from "../../actions";

const { GET_BLOCK_DATA, blockDataReturned, BlockFilesReturned } = actions;

function* performGetBlockData(action) {
  try {
    const { language, url } = action;
    const result = yield call(fetchBlockData, language, url);

    if (result) {
      yield put(blockDataReturned({ data: result.res }));
    } else yield put(blockDataReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetBlockData() {
  yield takeEvery(GET_BLOCK_DATA, performGetBlockData);
}
