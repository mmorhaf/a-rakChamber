import { put, call, takeEvery, takeLatest, all } from "redux-saga/effects";
import {
  uploadFile,
  createFile,
  deleteFile,
  downloadFile,
  readCounter,
  downloadCounter,
} from "../../network/file";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import actions from "../../actions";
const MySwal = withReactContent(Swal);
const {
  UPLOAD_FILE_ACTION,
  fileCreated,
  DELETE_FILE_ACTION,
  fileDeleted,
  DOWNLOAD_FILE,
  fileDownloaded,
  READ_FILE_ACTION,
  readCompleted,
  DOWNLOAD_COUNT,
  downloadCountCompleted,
} = actions;

function* performUploadFile(action) {
  try {
    var formData = new FormData();
    const data = action.files;
    const arTitle = action?.arTitle;
    const enTitle = action?.enTitle;
    formData.append("fileKey", action?.key);
    data.map((file) => formData.append("files", file));
    const result = yield call(uploadFile, formData);

    if (result.data.success) {
      const filesDetails = [];

      result.data.files.map((file, idx) =>
        filesDetails.push({
          uuid: file.filename,
          source: "client",
          publishMode: 1,
          acl: 1,
          extension: file.originalname.split(".").pop(),
          title: {
            ar: arTitle ? arTitle : file.originalname,
            en: enTitle ? enTitle : file.originalname,
          },
          ...file,
        })
      );

      const createdFile = yield call(createFile, filesDetails);

      const response = createdFile.data.files.map((file, idx) => ({
        ...file,
        fileType: action.files[idx]["fileType"],
      }));

      if (createdFile) yield put(fileCreated({ response }));
      else yield put(fileCreated({ response: [] }));
    } else {
      yield put(
        fileCreated({
          response: {
            success: false,
            file: action.files[0].name,
            message: result.data.message,
          },
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
}

export function* watchUploadFile() {
  yield takeEvery(UPLOAD_FILE_ACTION, performUploadFile);
}

function* performDeleteFileById(action) {
  try {
    const result = yield call(deleteFile, action.id);

    if (result) yield put(fileDeleted({ response: result.data }));
    else yield put(fileDeleted({ response: [] }));
  } catch (error) {
    console.error(error);
  }
}
export function* watchDeleteFileById() {
  yield takeLatest(DELETE_FILE_ACTION, performDeleteFileById);
}
function* performDownloadFile(action) {
  try {
    if (action.payload.files) {
      let files = action.payload.files;
      let fullDataFiles = yield all(
        files &&
          files.map(async (file) => ({
            ...file,
            binaryData: await downloadFile(file.uuid),
          }))
      );
      yield put(fileDownloaded({ response: fullDataFiles }));
    } else if (action.payload.item) {
      let data = action.payload.item.uuid;
      const result = yield call(downloadFile, data);
      yield put(fileDownloaded({ response: result }));
    }
  } catch (error) {
    yield put(fileDownloaded({ response: [] }));
  }
}
export function* watchDownloadFile() {
  yield takeLatest(DOWNLOAD_FILE, performDownloadFile);
}

function* performReadFile(action) {
  try {
    const result = yield call(readCounter, action.id);

    if (result) yield put(readCompleted({ response: result.data }));
    else yield put(readCompleted({ response: {} }));
  } catch (error) {
    console.error(error);
  }
}
export function* watchReadCompleted() {
  yield takeLatest(READ_FILE_ACTION, performReadFile);
}
function* performDownloadCountFile(action) {
  try {
    const result = yield call(downloadCounter, action.id);
    if (result?.data?.success)
      yield put(downloadCountCompleted({ response: result.data }));
    else yield put(downloadCountCompleted({ response: {} }));
  } catch (error) {
    console.error(error);
  }
}
export function* watchDownloadCompleted() {
  yield takeLatest(DOWNLOAD_COUNT, performDownloadCountFile);
}
