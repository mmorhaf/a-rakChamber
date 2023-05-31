import { put, takeLatest, call } from "redux-saga/effects";
import { contactUs } from "../../network/contactus";
import actions from "../../actions";
import { uploadFile, createFile } from "../../network/file";
const { CONTACT_US_ACTION, contactUsReturned, uploadFileReturned } = actions;

function* performContactUs(action) {
  const idForFiles = [];

  try {
    let data = action.data;

    const file = data?.file;

    if (data?.file && data?.file?.length > 0) {
      var formData = new FormData();
      formData.append("fileKey", "ideas-file");
      file.map((file) => {
        formData.append("files", file);
      });

      let responseData = yield call(uploadFile, formData);

      let payload = [];
      responseData?.data?.files.map((file, index) => {
        payload.push({
          uuid: file.filename || null,
          extension: file.extension,
          title: { ar: file.originalname, en: file.originalname },
          ...file,
        });
      });

      const filePayload = yield call(createFile, payload);
      filePayload?.data?.files?.map((files) => idForFiles?.push(files.id));
    }
    delete data["file"];
    const result = yield call(contactUs, {
      ...action.data,
      fileIds: idForFiles,
    });

    if (result) yield put(contactUsReturned({ res: result }));
    else yield put(contactUsReturned({ res: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetContactusSubjects() {
  yield takeLatest(CONTACT_US_ACTION, performContactUs);
}
