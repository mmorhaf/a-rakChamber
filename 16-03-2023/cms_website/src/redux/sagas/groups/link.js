import { put, takeLatest, call, takeEvery } from "redux-saga/effects";
import { getAllLinks } from "../../network/link";
import actions from "../../actions";

const { LIST_ALL_LINKS, allLinksReturned } = actions;

function* performGetAllLinks(action) {
  try {
    const { language } = action;
    const result = yield call(getAllLinks, language);

    if (result) yield put(allLinksReturned({ data: result.res.links }));
    else yield put(allLinksReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetAllLinks() {
  yield takeEvery(LIST_ALL_LINKS, performGetAllLinks);
}
