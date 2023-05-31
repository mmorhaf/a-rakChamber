import { put, takeLatest, call } from "redux-saga/effects";
import {
  getAllCareers,
  getCareerById,
  submitCareerApp,
  getCareerByAlias,
} from "../../network/careers";
import actions from "../../actions";
import { uploadFile, createFile } from "../../network/file";
const {
  GET_ALL_CAREERS,
  allCareersReturned,
  GET_CAREER_BY_ID,
  careerByIdReturned,
  POST_CAREER_APPLICATION,
  postCareerApplicationReturned,
  SUBMIT_CAREER,
  submitCareerDone,
  GET_CAREER_BY_ALIAS,
  getCareerByAliasReturned,
} = actions;

function* performGetAllCareers(action) {
  try {
    const { language, department } = action;
    const result = yield call(getAllCareers, language, department);

    if (result) yield put(allCareersReturned({ data: result.res.careers }));
    else yield put(allCareersReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetAllCareers() {
  yield takeLatest(GET_ALL_CAREERS, performGetAllCareers);
}

function* performGetCareerById(action) {
  try {
    const { id, language } = action;

    const result = yield call(getCareerById, id, language);

    if (result) yield put(careerByIdReturned({ data: result.res }));
    else yield put(careerByIdReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetCareerById() {
  yield takeLatest(GET_CAREER_BY_ID, performGetCareerById);
}

function* performSubmitCv(action) {
  try {
    const data = action.data;
    const result = yield call(submitCareerApp, data);
    console.log("data", data);
    if (result) yield put(postCareerApplicationReturned({ data: result.data }));
    else yield put(postCareerApplicationReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchSubmitCv() {
  yield takeLatest(POST_CAREER_APPLICATION, performSubmitCv);
}

function* performGetCareerByAlias(action) {
  try {
    const { alias, language } = action;

    const result = yield call(getCareerByAlias, alias, language);

    if (result) yield put(getCareerByAliasReturned({ data: result.res }));
    else yield put(getCareerByAliasReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetCareerByAlias() {
  yield takeLatest(GET_CAREER_BY_ALIAS, performGetCareerByAlias);
}

//submitCareer

function* performSubmitCareer(action) {
  const idForImage = [];
  const idForCV = [];
  try {
    let data = action.payload;
    const photo = data?.photo;
    const cv = data?.cv;

    if (data?.photo && data?.photo?.length > 0) {
      var formData = new FormData();
      formData.append("fileKey", "career-photo");
      photo.map((file) => {
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
      filePayload?.data?.files?.map((files) => idForImage?.push(files.id));
    }
    if (data?.cv && data?.cv?.length > 0) {
      var formData = new FormData();
      formData.append("fileKey", "career-cv");
      cv.map((file) => {
        formData.append("files", file);
      });

      let responseData = yield call(uploadFile, formData);
      let payload = [];
      responseData?.data?.files.map((file, index) => {
        payload.push({
          uuid: file.filename || null,
          title: { ar: file.originalname, en: file.originalname },
          extension: file.extension,
          ...file,
        });
      });

      const filePayload = yield call(createFile, payload);
      filePayload?.data?.files?.map((files) => idForCV?.push(files.id));
    }

    // submit Career
    const result = yield call(submitCareerApp, {
      careerId: data?.careerId,
      firstName: data?.firstName,
      lastName: data?.lastName,
      careerId: data?.careerId,
      dateOfBirth: data?.dateOfBirth,
      placeOfBirth: data?.placeOfBirth,
      experienceYears: data?.experienceYears,
      qualification: data?.qualification,
      residentCity: data?.residentCity,
      residentCountry: data?.residentCountry,
      phone: data?.phone,
      homeNumber: data?.homeNumber,
      email: data?.email,
      skybeId: data?.skybeId,
      currentLocation: data?.currentLocation,
      gender: data?.gender,
      religon: data?.religon,
      nationality: data?.nationality,
      photoId: idForImage[0],
      cvId: idForCV[0],
    });
    if (result) {
      yield put(submitCareerDone({ data: result.data }));
    } else {
      yield put(submitCareerDone({ data: [] }));
    }
  } catch (e) {
    yield put(submitCareerDone({ data: [] }));
    return;
  }
}

export function* watchSubmitCareer() {
  yield takeLatest(SUBMIT_CAREER, performSubmitCareer);
}
