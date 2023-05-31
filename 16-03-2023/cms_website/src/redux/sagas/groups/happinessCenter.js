import { put, takeLatest, call } from "redux-saga/effects";
import { getAllCenters, getCenterById } from "../../network/happinessCenter";
import actions from "../../actions";

const {
  GET_ALL_CENTERS,
  allCentersReturned,
  GET_CENTER_BY_ID,
  centerByIdReturned,
} = actions;

function* performGetAllCenters(action) {
  try {
    const { language } = action;
    const result = yield call(getAllCenters, language);

    if (result) yield put(allCentersReturned({ data: result.res.centers }));
    else yield put(allCentersReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetAllCenters() {
  yield takeLatest(GET_ALL_CENTERS, performGetAllCenters);
}

function* performGetCenterById(action) {
  try {
    const { id, language } = action;

    const result = yield call(getCenterById, id, language);

    if (result) yield put(centerByIdReturned({ data: result.res }));
    else yield put(centerByIdReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetCenterById() {
  yield takeLatest(GET_CENTER_BY_ID, performGetCenterById);
}
