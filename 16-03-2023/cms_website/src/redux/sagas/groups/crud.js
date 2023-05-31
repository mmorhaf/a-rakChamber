import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { payload } from "../../../utils/index";
import actions from "../../actions";
import {
  createNew,
  getAll,
  getAllAb,
  getAllPartners,
  getById,
  getNotifications,
  getReservations,
  getSupplierRequestNotes,
  addSupplierRequestNote,
  getData,
} from "../../network/crud";
import { createFile, uploadFile } from "../../network/file";
const {
  GET_ALL,
  allReturned,
  GET_BY_ID,
  byIdReturned,
  GET_RESERVATIONS,
  allReservationsReturned,
  CREATE_NEW,
  created,
  GET_ALL_PARTNERS,
  allPartnersReturned,
  GET_ALL_AB,
  allAbReturned,
  fileUploaded,
  GET_NOTIFICATIONS,
  allNotificationsReturned,
  GET_SUPPLIER_REQUEST_NOTES,
  allSupplierNotesReturned,
  ADD_SUPPLIER_REQUEST_NOTE,
  addSupplierRequestNoteDone,
  GET_DATA,
  dataReturned,
} = actions;

function* performGetAll(action) {
  try {
    let sort = action.sort;
    let subSort = action.subSort;
    let categoryId = action.categoryId;
    let field = action.field;
    let supplierToken = action?.supplierToken;
    let language = action.language;
    let limit = action.limit;
    let offset = action.offset;
    const result = yield call(
      getAll,
      sort,
      subSort,
      categoryId,
      supplierToken,
      field,
      language,
      limit,
      offset
    );
    if (result && result.res.success) {
      yield put(allReturned({ data: result.res, sort, subSort, categoryId }));
    } else {
      yield put(allReturned({ data: [] }));
    }
  } catch (error) {
    yield put(allReturned({ data: [] }));
    console.error(error);
  }
}

export function* watchGetAll() {
  yield takeEvery(GET_ALL, performGetAll);
}

function* performGetAllAb(action) {
  try {
    let sort = action.sort;
    let subSort = action.subSort;
    let entity = action.entity;
    let categoryId = action.categoryId;
    let limit = action.limit;
    let offset = action.offset;
    let language = action.language;
    const result = yield call(
      getAllAb,
      sort,
      subSort,
      entity,
      limit,
      offset,
      language
    );
    if (result && result.res.success) {
      yield put(allAbReturned({ data: result.res, sort, subSort }));
    } else {
      yield put(allAbReturned({ data: [] }));
    }
  } catch (error) {
    console.error(error);
  }
}
export function* watchGetAllAb() {
  yield takeEvery(GET_ALL_AB, performGetAllAb);
}

function* performGetAllPartners(action) {
  try {
    let language = action.language;

    const result = yield call(getAllPartners, language);
    if (result && result.res.success) {
      yield put(allPartnersReturned({ data: result.res }));
    } else {
      yield put(allPartnersReturned({ data: [] }));
    }
  } catch (error) {
    yield put(allPartnersReturned({ data: [] }));
    console.error(error);
  }
}

export function* watchGetAllPartners() {
  yield takeEvery(GET_ALL_PARTNERS, performGetAllPartners);
}

function* performGetById(action) {
  try {
    let id = action.id;
    let sort = action.sort;
    const result = yield call(getById, sort, id);
    let files = [];
    let links = [];
    if (result)
      yield put(
        byIdReturned({
          data: { result: result.res, files: files, links: links },
        })
      );
    else yield put(byIdReturned({ data: [] }));
  } catch (error) {
    yield put(byIdReturned({ data: [] }));
  }
}

export function* watchGetById() {
  yield takeEvery(GET_BY_ID, performGetById);
}

function* performGetData(action) {
  try {
    let sort = action.sort;
    // let subSort = action.subSort;

    let data = action.data;
    const result = yield call(getData, data, sort);
    if (result && result.res.success) {
      yield put(
        dataReturned({ data: result.res, sort, dataObject: data?.dataObject })
      );
    } else {
      yield put(dataReturned({ data: [] }));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetData() {
  yield takeEvery(GET_DATA, performGetData);
}

function* performGetReservations(action) {
  try {
    let sort = action.sort;
    let id = action.id;
    const result = yield call(getReservations, sort, id);
    if (result && result.res.success) {
      yield put(allReservationsReturned({ data: result.res, sort, id }));
    } else {
      yield put(allReservationsReturned({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(allReservationsReturned({ data: [] }));
  }
}

export function* watchGetAllReservations() {
  yield takeEvery(GET_RESERVATIONS, performGetReservations);
}

function* performCreateNew(action) {
  try {
    let data = action.payload;
    let sort = action.sort;
    let id = action.id;
    let filesIds = [];
    let replyFile = data?.replyFiles;
    if (replyFile && replyFile.length > 0) {
      var formData = new FormData();
      formData.append("fileKey", "replay-replyFiles");
      replyFile.map((file) => {
        formData.append("files", file);
      });

      let responseData = yield call(uploadFile, formData);
      if (!responseData.data.success) {
        let error = responseData.data.message;
        yield put(fileUploaded({ response: error }));
      }
      let filesPayload = [];
      responseData.data.files.map((file, index) => {
        filesPayload.push({
          uuid: file.filename || null,
          extension: file.extension,
          title: { en: "Reply Attachment", ar: "مرفق الرد" },
          source: "client",
          ...file,
        });
      });
      let allFilesPayload = yield call(createFile, filesPayload);
      filesIds = allFilesPayload.data.files[0].id;

      data = { ...data, filesIds: filesIds };
    }
    let creatingData = yield payload(data, sort, null);
    let result = [];
    result = yield call(createNew, sort, creatingData);
    if (result?.data?.success && sort === "service/request/booking") {
      yield put(created({ response: result.data }));
    } else {
      yield put(created({ response: result.data }));
    }
  } catch (e) {
    yield put(created({ response: "" }));
    return;
  }
}

export function* watchCreateNew() {
  yield takeLatest(CREATE_NEW, performCreateNew);
}
function* performGetNotifications(action) {
  try {
    let sort = action.sort;
    let limit = action.limit;
    let offset = action.offset;
    const result = yield call(getNotifications, sort, limit, offset);
    if (result && result.res.success) {
      yield put(allNotificationsReturned({ data: result.res }));
    } else {
      yield put(allNotificationsReturned({ data: [] }));
    }
  } catch (error) {
    console.error(error);
  }
}
export function* watchGetNotifications() {
  yield takeEvery(GET_NOTIFICATIONS, performGetNotifications);
}

function* performGetSupplierRequestNotes(action) {
  try {
    let id = action.id;
    const result = yield call(getSupplierRequestNotes, id);
    if (result && result.res.success) {
      yield put(allSupplierNotesReturned({ data: result.res }));
    } else {
      yield put(allSupplierNotesReturned({ data: [] }));
    }
  } catch (error) {
    console.error(error);
  }
}
export function* watchGetSupplierRequestNotes() {
  yield takeEvery(GET_SUPPLIER_REQUEST_NOTES, performGetSupplierRequestNotes);
}

function* performAddSupplierRequestNote({ data }) {
  try {
    const result = yield call(addSupplierRequestNote, data);
    if (result.networkSuccess)
      yield put(addSupplierRequestNoteDone({ data: result.data }));
    else yield put(addSupplierRequestNoteDone({ data: result.data }));
  } catch (e) {
    yield put(addSupplierRequestNoteDone({ data: { success: false } }));
    return;
  }
}
export function* watchAddSupplierRequestNote() {
  yield takeLatest(ADD_SUPPLIER_REQUEST_NOTE, performAddSupplierRequestNote);
}
