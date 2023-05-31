import { put, takeLatest, call } from "redux-saga/effects";
import { submitRequest } from "../../network/request";
import actions from "../../actions";
import { createFile, uploadFile } from "../../network/file";

const { SUBMIT_REQUEST, submitRequestReturned, uploadFileReturned } = actions;

function* performSubmitRequest(action) {
  try {
    let data = action.data;
    let requestFile = data.requestFile;
    let uploadedFileId = [];
    if (requestFile && requestFile.length > 0) {
      var formData = new FormData();
      formData.append("fileKey", "openData-requestFile");
      requestFile.map((file) => {
        formData.append("files", file);
      });
      let responseData = yield call(uploadFile, formData);
      if (!responseData.data.success) {
        let error = responseData.data;
        yield put(uploadFileReturned({ data: error }));
      }
      let filesPayload = [];
      responseData.data.files.map((file, index) => {
        filesPayload.push({
          uuid: file.filename || null,
          source: "client",
          title: { ar: file.originalname, en: file.originalname },
          extension: file.extension,
          ...file,
        });
      });
      let allFilesPayload = yield call(createFile, filesPayload);
      allFilesPayload.data.files.map((files) => uploadedFileId.push(files?.id));
      data = { ...data, uploadedFileId: uploadedFileId[0] };
    }
    const result = yield call(submitRequest, data);

    if (result) yield put(submitRequestReturned({ data: result.data }));
    else yield put(submitRequestReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}
export function* watchSubmitRequest() {
  yield takeLatest(SUBMIT_REQUEST, performSubmitRequest);
}
