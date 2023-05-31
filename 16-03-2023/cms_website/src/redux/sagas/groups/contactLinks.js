import { put, takeLatest, call } from "redux-saga/effects";
import { getContactLinks } from "../../network/contactLinks";
import actions from "../../actions";

const { GET_CONTACT_LINKS, contactLinksReturned } = actions;

function* performGetContactLinks(action) {
  try {
    const { language } = action;
    const result = yield call(getContactLinks, language);

    if (result) yield put(contactLinksReturned({ data: result.res.links }));
    else yield put(contactLinksReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetContactLinks() {
  yield takeLatest(GET_CONTACT_LINKS, performGetContactLinks);
}
