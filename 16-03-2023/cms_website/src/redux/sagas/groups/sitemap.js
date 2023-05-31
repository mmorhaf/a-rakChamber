import { put, takeLatest, call, takeEvery } from "redux-saga/effects";
import { getSitemap } from "../../network/sitemap";
import actions from "../../actions";

const { REQ_SITEMAP, sitemapReturned } = actions;

function* performGetSitemap(action) {
  try {
    const result = yield call(getSitemap);

    if (result) {
      yield put(sitemapReturned({ data: result.res }));
    } else yield put(sitemapReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetSitemap() {
  yield takeEvery(REQ_SITEMAP, performGetSitemap);
}
