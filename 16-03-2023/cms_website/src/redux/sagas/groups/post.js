import { put, takeLatest, call, takeEvery } from "redux-saga/effects";
import {
  getAllPosts,
  getPostById,
  getPostByAlias,
  getThisdayEvents,
  increasePostViewers,
  fetchTopPublications,
  getAllPostsByCategory,
  // getAllPartners,
} from "../../network/post";
import actions from "../../actions";

const {
  GET_ALL_POSTS,
  allPostsReturned,
  GET_POST_BY_ID,
  postByIdReturned,
  GET_POST_BY_ALIAS,
  byAliasReturned,
  GET_TODAY_EVENTS,
  todayEventsReturned,
  GET_POST_VIEWERS,
  postViewersReturned,
  GET_TOP_PUBLICATIONS,
  topPublicationsReturned,
  // GET_ALL_PARTNERS,
  // allPartnersReturned,
  GET_POST_BY_CATEGORY,
  allPostsByCategoryReturned,
} = actions;

function* performPostViewrsCount(action) {
  try {
    const { id } = action;

    const result = yield call(increasePostViewers, id);

    if (result) yield put(postViewersReturned({ data: result }));
    else yield put(postViewersReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchPostViewrsCount() {
  yield takeEvery(GET_POST_VIEWERS, performPostViewrsCount);
}

function* performGetTopPublications(action) {
  try {
    const { language } = action;

    const result = yield call(fetchTopPublications, language);
    if (result) yield put(topPublicationsReturned({ data: result.res }));
    else yield put(topPublicationsReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetTopPublications() {
  yield takeEvery(GET_TOP_PUBLICATIONS, performGetTopPublications);
}

function* performGetAllPosts(action) {
  try {
    const {
      sort: data,
      isFeatured,
      language,
      categoryId,

      limit,
      offset,
      order,
    } = action;
    const result = yield call(
      getAllPosts,
      data,
      isFeatured,
      language,
      categoryId,
      limit,
      offset,
      order
    );
    if (result) yield put(allPostsReturned({ data: result.res }));
    else yield put(allPostsReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetAllPosts() {
  yield takeEvery(GET_ALL_POSTS, performGetAllPosts);
}

function* performGetPostById(action) {
  try {
    const { id, language } = action;

    const result = yield call(getPostById, id, language);

    if (result) yield put(postByIdReturned({ data: result }));
    else yield put(postByIdReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}
export function* watchGetPostById() {
  yield takeLatest(GET_POST_BY_ID, performGetPostById);
}

function* performGetPostByAlias(action) {
  try {
    const { alias, language } = action;

    const result = yield call(getPostByAlias, alias, language);
    if (result) yield put(byAliasReturned({ data: result.res }));
    else yield put(byAliasReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}
export function* watchGetPostByAlias() {
  yield takeLatest(GET_POST_BY_ALIAS, performGetPostByAlias);
}

function* performGetTodayEvents(action) {
  try {
    const { language } = action;
    const result = yield call(getThisdayEvents, language);

    if (result) yield put(todayEventsReturned({ data: result.res.posts }));
    else yield put(todayEventsReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}
export function* watchGetTodayEvents() {
  yield takeLatest(GET_TODAY_EVENTS, performGetTodayEvents);
}

function* performGetAllPostsByCategory(action) {
  try {
    const { language, data } = action;
    const result = yield call(getAllPostsByCategory, data, language);
    if (result) yield put(allPostsByCategoryReturned({ data: result.res }));
    else yield put(allPostsByCategoryReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetAllPostsByCategory() {
  yield takeEvery(GET_POST_BY_CATEGORY, performGetAllPostsByCategory);
}

// function* performGetAllPartners(action) {
//   try {
//     const { language } = action;

//     const result = yield call(getAllPartners, language);

//     if (result) yield put(allPartnersReturned({ data: result.res }));
//     else yield put(allPartnersReturned({ data: [] }));
//   } catch (error) {
//     console.error(error);
//   }
// }

// export function* watchGetAllPartners() {
//   yield takeEvery(GET_ALL_PARTNERS, performGetAllPartners);
// }
