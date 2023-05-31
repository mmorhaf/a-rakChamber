import { put, takeLatest, call } from "redux-saga/effects";
import {
  submitServiceForm,
  fetchMyRequests,
  fetchRequestDetails,
  addRequestNote,
  fetchRequestStatusChanges,
  fetchRequestNotes,
  submitSupplierForm,
  generateQRCode,
  markNotification,
  updateSupplier,
} from "../../network/services";
import actions from "../../actions";
import { createFile, uploadFile } from "../../network/file";

const {
  POST_SERVICE_FORM,
  postServiceFormReturned,
  GET_MY_REQUESTS,
  getMyRequestsDone,
  GET_REQUEST_DETAILS,
  getRequestDetailsDone,
  ADD_REQUEST_NOTE,
  addRequestNoteDone,
  GET_REQUEST_NOTES,
  getRequestNotesDone,
  GET_REQUEST_STATUS_CHANGES,
  getRequestStatusChangesDone,
  POST_SUPPLIER_FORM,
  postSupplierFormReturned,
  GET_QRCODE,
  getQrcodeDone,
  uploadFileReturned,
  MARK_NOTIFICATION,
  notificationMarked,
  UPDATE_SUPPLIER,
  updateSupplierReturned,
} = actions;

function* performSubmitServiceForm(action) {
  try {
    const data = action.data;

    const result = yield call(submitServiceForm, data);

    if (result) yield put(postServiceFormReturned({ data: result.data }));
    else yield put(postServiceFormReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchSubmitServiceForm() {
  yield takeLatest(POST_SERVICE_FORM, performSubmitServiceForm);
}

function* performGetMyRequests() {
  try {
    const result = yield call(fetchMyRequests);
    if (
      result.networkSuccess &&
      result.res.serviceRequests &&
      result.res.serviceRequests[0]
    )
      yield put(getMyRequestsDone({ data: result.res.serviceRequests }));
    else yield put(getMyRequestsDone({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetMyRequests() {
  yield takeLatest(GET_MY_REQUESTS, performGetMyRequests);
}

function* performFetchRequestDetails({ id }) {
  try {
    const result = yield call(fetchRequestDetails, id);
    if (result.networkSuccess && result.res && result.res.success) {
      yield put(
        getRequestDetailsDone({
          data: result.res,
        })
      );
    } else {
      yield put(getRequestDetailsDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
  }
}
export function* watchFetchRequestsDetails() {
  yield takeLatest(GET_REQUEST_DETAILS, performFetchRequestDetails);
}

function* performAddRequestNote({ data }) {
  try {
    const result = yield call(addRequestNote, data);
    if (result.networkSuccess) {
      yield put(addRequestNoteDone({ data: result.data }));
    } else yield put(addRequestNoteDone({ data: result.data }));
  } catch (e) {
    yield put(addRequestNoteDone({ data: { success: false } }));
    return;
  }
}
export function* watchAddRequestNote() {
  yield takeLatest(ADD_REQUEST_NOTE, performAddRequestNote);
}

function* performFetchRequestNotes({ id }) {
  try {
    const result = yield call(fetchRequestNotes, id);

    if (result.networkSuccess && result.res.notes && result.res.notes[0])
      yield put(getRequestNotesDone({ data: result.res.notes }));
    else yield put(getRequestNotesDone({ data: [] }));
  } catch (e) {
    yield put(getRequestNotesDone({ data: { success: false } }));
    return;
  }
}
export function* watchFetchRequestNotes() {
  yield takeLatest(GET_REQUEST_NOTES, performFetchRequestNotes);
}

function* performFetchRequestStatusChanges({ id }) {
  try {
    const result = yield call(fetchRequestStatusChanges, id);
    if (result.networkSuccess && result.res.changes && result.res.changes[0])
      yield put(getRequestStatusChangesDone({ data: result.res.changes }));
    else yield put(getRequestStatusChangesDone({ data: [] }));
  } catch (e) {
    yield put(getRequestStatusChangesDone({ data: { success: false } }));
    return;
  }
}
export function* watchFetchRequestStatusChanges() {
  yield takeLatest(
    GET_REQUEST_STATUS_CHANGES,
    performFetchRequestStatusChanges
  );
}

function* performSubmitSupplierForm(action) {
  try {
    let data = action.data;
    let id = data?.id;
    let stamp = data.stamp;
    let signature = data.signature;
    let tradeLicence = data.tradeLicence;
    let chamberMembershipCertificate = data.chamberMembershipCertificate;
    let certificateForRegisteriationForVTA =
      data.certificateForRegisteriationForVTA;
    let ownerPassport = data.ownerPassport;
    let companyProfile = data.companyProfile;
    let representativePassport = data?.representativePassport;
    let stampId = [];
    let signatureId = [];
    let tradeLicenceId = [];
    let chamberMembershipCertificateId = [];
    let certificateForRegisteriationForVTAId = [];
    let ownerPassportId = [];
    let companyProfileId = [];
    let representativePassportId = [];
    if (data?.approvedActivity?.length > 0)
      data["approvedActivity"] = data["approvedActivity"]?.map(
        (item) => item?.value
      );
    if (stamp && stamp.length > 0) {
      var formData = new FormData();
      formData.append("fileKey", "supplier-stamp");
      stamp.map((file) => {
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
          title: id
            ? { en: "Updated Company Stamp", ar: " تحديث ختم الشركة" }
            : { en: "Company Stamp", ar: "ختم الشركة" },
          extension: file.extension,
          ...file,
        });
      });
      let allFilesPayload = yield call(createFile, filesPayload);
      allFilesPayload.data.files.map((files) => stampId.push(files?.id));
      data = { ...data, stampId: stampId[0] };
    }
    if (signature && signature.length > 0) {
      var formData = new FormData();
      formData.append("fileKey", "supplier-signature");
      signature.map((file) => {
        formData.append("files", file);
      });
      let responseData = yield call(uploadFile, formData);
      console.log(responseData, "responseData");
      if (!responseData.data.success) {
        let error = responseData.data;
        yield put(uploadFileReturned({ data: error }));
      }
      let filesPayload = [];
      responseData.data.files.map((file, index) => {
        filesPayload.push({
          uuid: file.filename || null,
          source: "client",
          title: id
            ? { en: "Updated Signature", ar: "تحديث التوقيع" }
            : { en: "Signature", ar: "التوقيع" },
          extension: file.extension,
          ...file,
        });
      });
      let allFilesPayload = yield call(createFile, filesPayload);
      allFilesPayload.data.files.map((files) => signatureId.push(files?.id));
      data = { ...data, signtureId: signatureId[0] };
    }
    if (tradeLicence && tradeLicence.length > 0) {
      var formData = new FormData();
      formData.append("fileKey", "supplier-tradeLicence");
      tradeLicence.map((file) => {
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
          title: id
            ? {
                en: "Updated Copy of trade license",
                ar: "تحديث نسخة من الرخصة التجارية",
              }
            : { en: "Copy of trade license", ar: "نسخة من الرخصة التجارية" },
          extension: file.extension,
          ...file,
        });
      });
      let allFilesPayload = yield call(createFile, filesPayload);
      allFilesPayload.data.files.map((files) => tradeLicenceId.push(files?.id));
      data = { ...data, tradeLicenceId: tradeLicenceId[0] };
    }
    if (
      chamberMembershipCertificate &&
      chamberMembershipCertificate.length > 0
    ) {
      var formData = new FormData();
      formData.append("fileKey", "supplier-chamberMembershipCertificate");
      chamberMembershipCertificate.map((file) => {
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
          title: id
            ? {
                en: "Updated Copy of Chamber Membership Certificate",
                ar: "تحديث نسخة من شهادة عضوية الغرفة",
              }
            : {
                en: "Copy of Chamber Membership Certificate",
                ar: "نسخة من شهادة عضوية الغرفة",
              },
          extension: file.extension,
          ...file,
        });
      });
      let allFilesPayload = yield call(createFile, filesPayload);
      allFilesPayload.data.files.map((files) =>
        chamberMembershipCertificateId.push(files?.id)
      );
      data = {
        ...data,
        chamberMembershipCertificateId: chamberMembershipCertificateId[0],
      };
    }
    if (
      certificateForRegisteriationForVTA &&
      certificateForRegisteriationForVTA.length > 0
    ) {
      var formData = new FormData();
      formData.append("fileKey", "supplier-certificateForRegisteriationForVTA");
      certificateForRegisteriationForVTA.map((file) => {
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
          title: id
            ? {
                en: "Updated Copy of Certificate of registration for VAT ",
                ar: "تحديث نسخة من شهادة التسجيل في ضريبة القيمة المضافة",
              }
            : {
                en: "Copy of Certificate of registration for VAT ",
                ar: "نسخة من شهادة التسجيل في ضريبة القيمة المضافة",
              },
          extension: file.extension,
          ...file,
        });
      });
      let allFilesPayload = yield call(createFile, filesPayload);
      allFilesPayload.data.files.map((files) =>
        certificateForRegisteriationForVTAId.push(files?.id)
      );
      data = {
        ...data,
        certificateForRegisteriationForVTAId:
          certificateForRegisteriationForVTAId[0],
      };
    }
    if (ownerPassport && ownerPassport.length > 0) {
      var formData = new FormData();
      formData.append("fileKey", "supplier-ownerPassport");
      ownerPassport.map((file) => {
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
          title: id
            ? {
                en: "Updated Copy owner passport",
                ar: "تحديث نسخة من جواز سفر المالك",
              }
            : {
                en: "Copy Copy owner passport",
                ar: "نسخة من جواز سفر المالك",
              },
          extension: file.extension,
          ...file,
        });
      });
      let allFilesPayload = yield call(createFile, filesPayload);
      allFilesPayload.data.files.map((files) =>
        ownerPassportId.push(files?.id)
      );
      data = { ...data, ownerPassportId: ownerPassportId[0] };
    }
    if (representativePassport && representativePassport.length > 0) {
      var formData = new FormData();
      formData.append("fileKey", "supplier-representativePassport");
      representativePassport.map((file) => {
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
          title: id
            ? {
                en: "Updated Copy Representative passport/ID",
                ar: "تحديث نسخة من جواز سفر أو هوية المندوب ",
              }
            : {
                en: "Copy Representative passport/ID",
                ar: "نسخة من جواز سفر أو هوية المندوب ",
              },
          extension: file.extension,
          ...file,
        });
      });
      let allFilesPayload = yield call(createFile, filesPayload);
      allFilesPayload.data.files.map((files) =>
        representativePassportId.push(files?.id)
      );
      data = { ...data, representativePassportId: representativePassportId[0] };
    }
    if (companyProfile && companyProfile.length > 0) {
      var formData = new FormData();
      formData.append("fileKey", "supplier-companyProfile");
      companyProfile.map((file) => {
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
          title: id
            ? { en: "Updated Company Profile", ar: "تحديث ملف الشركة" }
            : { en: "Company Profile", ar: "ملف الشركة" },
          extension: file.extension,
          ...file,
        });
      });
      let allFilesPayload = yield call(createFile, filesPayload);
      allFilesPayload.data.files.map((files) =>
        companyProfileId.push(files?.id)
      );
      data = { ...data, companyProfileId: companyProfileId[0] };
    }
    const result = id
      ? yield call(updateSupplier, data, id)
      : yield call(submitSupplierForm, data);
    if (result) yield put(postSupplierFormReturned({ data: result.data }));
    else yield put(postSupplierFormReturned({ data: [] }));
  } catch (error) {
    console.error(error);
    yield put(postSupplierFormReturned({ data: [] }));
  }
}

export function* watchSubmitSupplierForm() {
  yield takeLatest(POST_SUPPLIER_FORM, performSubmitSupplierForm);
}

function* performQrCode(action) {
  try {
    const data = action.data;

    const result = yield call(generateQRCode, data);

    if (result && result.networkSuccess && result.data.success)
      yield put(getQrcodeDone({ data: result.data }));
    else yield put(getQrcodeDone({ data: [] }));
  } catch (error) {
    console.error(error);
    yield put(getQrcodeDone({ data: [] }));
  }
}

export function* watchQrCode() {
  yield takeLatest(GET_QRCODE, performQrCode);
}

function* performMarkNotification(action) {
  try {
    let data = { ids: action?.data };
    const result = yield call(markNotification, data);
    if (result.data.success)
      yield put(notificationMarked({ data: result.data }));
    else yield put(notificationMarked({ data: [] }));
  } catch (e) {
    yield put(notificationMarked({ data: "" }));
    return;
  }
}
export function* watchMarkNotification() {
  yield takeLatest(MARK_NOTIFICATION, performMarkNotification);
}
