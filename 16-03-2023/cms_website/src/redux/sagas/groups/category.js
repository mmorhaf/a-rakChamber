import { put, takeLatest, takeEvery, call } from "redux-saga/effects";
import {
  getCategories,
  getCategoryById,
  getCategoryByAlias,
  getCategoryTreeByAlias,
} from "../../network/category";
import actions from "../../actions";

const {
  GET_CATEGORIES,
  categoriesReturned,
  GET_CATEGORY_BY_ID,
  categoryByIdReturned,
  GET_CATEGORY_BY_ALIAS,
  byAliasReturned,
  GET_CATEGORY_TREE_BY_ALIAS,
  categoryTreeReturned,
} = actions;

function* performGetCategories(action) {
  try {
    const { sort: type, subSort: subType, isFeatured, language } = action;
    const result = yield call(
      getCategories,
      type,
      subType,
      isFeatured,
      language
    );

    if (result) yield put(categoriesReturned({ data: result.res }));
    else yield put(categoriesReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetCategories() {
  yield takeEvery(GET_CATEGORIES, performGetCategories);
}

function* performGetCategoryById(action) {
  try {
    const { id, language } = action;

    const result = yield call(getCategoryById, id, language);
    if (result) yield put(categoryByIdReturned({ data: result.res }));
    else yield put(categoryByIdReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetCategoryById() {
  yield takeEvery(GET_CATEGORY_BY_ID, performGetCategoryById);
}

function* performGetCategoryByAlias(action) {
  try {
    const { alias, language } = action;

    const result = yield call(getCategoryByAlias, alias, language);
    if (result) yield put(byAliasReturned({ data: result.res }));
    else yield put(byAliasReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetCategoryByAlias() {
  yield takeEvery(GET_CATEGORY_BY_ALIAS, performGetCategoryByAlias);
}

function* performGetCategoryTree(action) {
  try {
    const { alias } = action;

    const result = yield call(getCategoryTreeByAlias, alias);
    if (result) yield put(categoryTreeReturned({ data: result.res.menuItems }));
    else yield put(categoryTreeReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetCategoryTree() {
  yield takeEvery(GET_CATEGORY_TREE_BY_ALIAS, performGetCategoryTree);
}
