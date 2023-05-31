import { put, takeLatest, call, takeEvery } from "redux-saga/effects";
import {
  askingForRate,
  sendFeedBack,
  sendIsUseful,
  sendReport,
  rateFile,
} from "../../network/rate";
import actions from "../../actions";

const {
  ASK_FOR_RATE,
  askForRateReturned,
  ADD_FEEDBACK,
  addFeedbackReturned,
  ADD_ISUSEFUL,
  addIsusefulReturned,
  ADD_REPORT,
  addReportReturned,
  RATE_FILE_ACTION,
  rateFileReturned,
} = actions;

function* performFileRating(action) {
  try {
    const { data: { id, rate } = {} } = action;
    const result = yield call(rateFile, id, rate);

    if (result) yield put(rateFileReturned({ data: result.data }));
    else yield put(rateFileReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchFileRating() {
  yield takeEvery(RATE_FILE_ACTION, performFileRating);
}

function* performAskForRating(action) {
  try {
    const { url } = action;
    const result = yield call(askingForRate, url);

    if (result) {
      yield put(askForRateReturned({ data: result.res.feedBack }));
    } else yield put(askForRateReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchAskForRating() {
  yield takeEvery(ASK_FOR_RATE, performAskForRating);
}

function* performAddFeedback(action) {
  try {
    const { data } = action;
    const result = yield call(sendFeedBack, data);

    if (result) yield put(addFeedbackReturned({ data: result }));
    else yield put(addFeedbackReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchAddFeedback() {
  yield takeEvery(ADD_FEEDBACK, performAddFeedback);
}

function* performSendIsUsefull(action) {
  try {
    const { data } = action;
    const result = yield call(sendIsUseful, data);

    if (result) yield put(addIsusefulReturned({ data: result }));
    else yield put(addIsusefulReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchSendIsUsefull() {
  yield takeEvery(ADD_ISUSEFUL, performSendIsUsefull);
}

function* performSendReport(action) {
  try {
    const { data } = action;
    const result = yield call(sendReport, data);

    if (result) yield put(addReportReturned({ data: result }));
    else yield put(addReportReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchendReport() {
  yield takeEvery(ADD_REPORT, performSendReport);
}
