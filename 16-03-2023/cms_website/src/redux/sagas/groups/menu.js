import { put, call, takeEvery } from "redux-saga/effects";
import { getMenu } from "../../network/menu";
import actions from "../../actions";

const { GET_MENU, menuReturned } = actions;

function* performGetMenu(action) {
  try {
    const result = yield call(getMenu);
    if (result) yield put(menuReturned({ data: result.res.menuItems }));
    else yield put(menuReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetMenu() {
  yield takeEvery(GET_MENU, performGetMenu);
}
