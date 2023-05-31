import { put, takeLatest, call } from "redux-saga/effects";
import { submitComment } from "../../network/comment";
import actions from "../../actions";

const { SUBMIT_COMMENT, submitCommentReturned } = actions;

function* performSubmitComment(action) {
  try {
    let data = action.data;

    const result = yield call(submitComment, data);

    if (result) yield put(submitCommentReturned({ data: result.data }));
    else yield put(submitCommentReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}
export function* watchSubmitComment() {
  yield takeLatest(SUBMIT_COMMENT, performSubmitComment);
}
