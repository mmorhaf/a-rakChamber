import { put, takeLatest, call } from "redux-saga/effects";
import { search, searchPost, searchNewsPost } from "../../network/search";
import actions from "../../actions";

const {
  DO_SEARCH,
  doSearchReturned,
  DO_POST_SEARCH,
  doPostSearchReturned,
  DO_NEWS_SEARCH,
  doNewsSearchReturned,
} = actions;

function* performSearch(action) {
  try {
    let { data, language } = action;

    if (data !== false) {
      const result = yield call(search, data, language);

      if (result) yield put(doSearchReturned({ data: result.res }));
      else yield put(doSearchReturned({ data: [] }));
    } else yield put(doSearchReturned({ data: false }));
  } catch (error) {
    console.error(error);
  }
}
export function* watchSearch() {
  yield takeLatest(DO_SEARCH, performSearch);
}
function* performSearchPost(action) {
  try {
    let { data, language } = action;

    const result = yield call(searchPost, data, language);
    if (result) yield put(doPostSearchReturned({ data: result.res }));
    else yield put(doPostSearchReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}
export function* watchSearchPost() {
  yield takeLatest(DO_POST_SEARCH, performSearchPost);
}

function* performSearchNews(action) {
  try {
    let { data, sort, language } = action;

    const result = yield call(searchNewsPost, data, sort, language);

    if (result) yield put(doNewsSearchReturned({ data: result.res }));
    else yield put(doNewsSearchReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}
export function* watchSearchNews() {
  yield takeLatest(DO_NEWS_SEARCH, performSearchNews);
}
