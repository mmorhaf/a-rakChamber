import { put, takeLatest, call } from "redux-saga/effects";
import {
  businessDirectorySearch,
  fetchEServicesDetails,
  fetchEServicesGroups,
  cooVerification,
  ratificationVerification,
  serviceLogin,
  getSelectMenuData,
  calculateFees,
  newCoo,
  uploadFileRak,
  getRakRequestsList,
  cooVerificationData,
  getCooAccreditedList,
  cooAdditionalRequest,
  otherRequest,
  cooEditRequest,
  goodsDetailsList,
  cooEditGoodsDetail,
  ratificationType,
  ratificationDocType,
  ratificationRequest,
  membershipVerification,
  membershipFees,
  membershipProfile,
  cooAttachments,
  deleteRequest,
  getIssuedRequestsList,
  paymentRequest,
  totals,
  paymentDetails,
  confirmPayment,
  ratificationRequestDetails,
  ratificationRequestAttach,
  ratificationRequestUpdate,
  cooAdditionalRequestDetails,
  otherRequestDetails,
  cooEditRequestDetails,
  cooEditRequestOriginDetails,
  cooEditGoodsDetailData,
  cooStamps,
  checkInvoice,
  ratificationRequestDelete,
  cooAdditionalRequestUpdate,
  otherRequestUpdate,
  sendMostUsedService,
  getMostUsedService,
  fetchEServicesLists,
  getCooRequestDetails,
  cooRequestUpdate,
  updatePassword,
  getIsicActivityData,
  businessDirectorySearchByActivity,
  searchByKeyword,
  sendCustomerRating,
  getPaymentTrx,
  sendMemberRegister,
  profileCompanyUpdate,
  editServiceUserProfile,
  getCirculars,
  sendNotification,
  sendEmail,
  getFileList,
  fileStamp,
  finishFileStamp,
  supplierLogin,
  sendSupplierRegister,
  getNotifications,
  getServiceStep,
  printTracking,
  getTrxCooList,
  sendCooListToIcc,
  checkCooListToIcc,
} from "../../network/APIServices";
import actions from "../../actions";
import { push } from "connected-react-router";
import { store } from "../../store";
import Swal from "sweetalert2";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const {
  POST_BUSINESS_DIRECTORY_FORM,
  postBusinessDirectoryFormReturned,
  GET_ESERVICES_DETAILS,
  getEservicesDetailsReturned,
  GET_ESERVICES_GROUPS,
  getEservicesGroupsReturned,
  POST_COO_VERIFY_FORM,
  postCooVerifyFormReturned,
  GET_RATIFICATION_VERIFY,
  getRatificationVerifyReturned,
  SERVICE_LOGIN,
  serviceLoginDone,
  serviceLoginFaild,
  FETCH_SELECT_MENU_DATA,
  fetchSelectMenuDataDone,
  CALCULATE_FEES,
  calculateFeesDone,
  SAVE_NEW_COO_DATA,
  saveNewCooDataDone,
  UPLOAD_RAK_FILE,
  uploadRakFileDone,
  GET_RAK_REQUESTS_LIST,
  getRakRequestsListDone,
  GET_COO_VERIFY_DATA,
  getCooVerifyDataReturned,
  GET_COO_ACCREDITED_LIST,
  getCooAccreditedListDone,
  SEND_COO_ADDITIONAL_REQUEST,
  SEND_OTHER_REQUEST,
  sendCooAdditionalRequestDone,
  sendOtherRequestDone,
  SEND_COO_EDIT_REQUEST,
  sendCooEditRequestDone,
  GET_GOODS_DETAILS_LIST,
  getGoodsDetailsListDone,
  SEND_COO_EDIT_GOODS,
  sendCooEditGoodsDone,
  GET_RATIFICATION_TYPE,
  getRatificationTypeDone,
  GET_RATIFICATION_DOC_TYPE,
  getRatificationDocTypeDone,
  SEND_RATIFICATION_REQUEST,
  sendRatificationRequestDone,
  GET_MEMBERSHIP_VERIFY,
  getMembershipVerifyDone,
  GET_MEMBERSHIP_FEES,
  getMembershipFeesDone,
  GET_MEMBERSHIP_PROFILE,
  getMembershipProfileDone,
  SEND_COO_ATTACHMENTS,
  sendCooAttachmentsDone,
  DELETE_REQUEST,
  deleteRequestDone,
  GET_RAK_ISSUED_REQUESTS_LIST,
  getRakIssuedRequestsListDone,
  SEND_PAYMENT_REQUEST_DATA,
  sendPaymentRequestDataDone,
  GET_TOTALS_DATA,
  getTotalsDataDone,
  GET_PAYMENT_DETAILS_DATA,
  getPaymentDetailsDataDone,
  POST_CONFIRM_PAYMENT_DATA,
  postConfirmPaymentDataDone,
  GET_RATIFICATION_REQUEST_DATA,
  getRatificationRequestDataDone,
  GET_RATIFICATION_ATTACH_DATA,
  getRatificationAttachDataDone,
  SEND_RATIFICATION_UPDATE_REQUEST,
  sendRatificationUpdateRequestDone,
  GET_COO_ADDITIONAL_REQUEST_DETAILS,
  GET_OTHER_REQUEST_DETAILS,
  getCooAdditionalRequestDetailsDone,
  getOtherRequestDetailsDone,
  GET_COO_EDIT_REQUEST_DETAILS,
  getCooEditRequestDetailsDone,
  GET_COO_EDIT_REQUEST_ORIGIN_DETAILS,
  getCooEditRequestOriginDetailsDone,
  GET_COO_EDIT_GOODS_DATA,
  getCooEditGoodsDataDone,
  GET_COO_STAMPS,
  getCooStampsDone,
  CHECK_INVOICE_NO,
  checkInvoiceNoDone,
  SEND_DELETED_ATTACHMENTS,
  sendDeletedAttachmentsDone,
  SEND_COO_ADDITIONAL_REQUEST_UPDATE,
  SEND_OTHER_REQUEST_UPDATE,
  sendCooAdditionalRequestUpdateDone,
  sendOtherRequestUpdateDone,

  SEND_MOST_USED_SERVICE,
  sendMostUsedServiceDone,
  GET_MOST_USED_SERVICE,
  getMostUsedServiceDone,
  GET_ESERVICES_LIST,
  getEservicesListReturned,
  GET_COO_REQUEST_DETAILS,
  getCooRequestDetailsDone,
  SEND_COO_UPDATE_REQUEST,
  sendCooUpdateRequestDone,
  SEND_UPDATED_PASSWORD,
  sendUpdatedPasswordDone,
  FETCH_ISIC_ACTIVITY_DATA,
  fetchIsicActivityDataDone,
  POST_BUSINESS_DIRECTORY_ACTIVITY,
  postBusinessDirectoryActivityReturned,
  POST_SEARCH_KEYWORD,
  postSearchKeywordData,
  SEND_CUSTOMER_RATE,
  sendCustomerRateDone,
  GET_PAYMENT_TRX,
  getPaymentTrxDone,
  SEND_MEMBER_REGISTER,
  sendMemberRegisterDone,
  SEND_MEMBER_PROFILE_UPDATE,
  sendMemberProfileUpdateDone,
  SERVICE_LOGIN_UPDATE,
  serviceLoginUpdateDone,
  GET_CIRCULARS,
  getCircularsDone,
  SEND_NOTIFICATION,
  sendNotificationDone,
  SEND_EMAIL,
  sendEmailDone,
  GET_FILE_LIST,
  getFileListDone,
  FILE_STAMP,
  fileStampDone,
  FINISH_FILE_STAMP,
  finishFileStampDone,
  SUPPLIER_LOGIN,
  supplierLoginDone,
  SEND_SUPPLIER_REGISTER,
  sendSupplierRegisterDone,
  GET_NOTIFICATION,
  getNotificationDone,
  GET_SERVICE_STEP,
  getServiceStepDone,
  POST_PRINT_TRACKING,
  postPrintTrackingDone,
  GET_TRX_COO_LIST,
  getTrxCooListDone,
} = actions;

function* performUploadRakFile({ body }) {
  try {
    const result = yield call(uploadFileRak, body);
    if (result && result.networkSuccess && result.res?.length)
      yield put(uploadRakFileDone({ data: result.res }));
    else yield put(uploadRakFileDone({ data: [] }));
  } catch (error) {
    console.error(error);
    yield put(uploadRakFileDone({ data: [] }));
  }
}
export function* watchUploadRakFile() {
  yield takeLatest(UPLOAD_RAK_FILE, performUploadRakFile);
}

function* performSubmitBusinessDirectoryForm(action) {
  try {
    const data = action.data;

    const result = yield call(businessDirectorySearch, data);
    if (result)
      yield put(postBusinessDirectoryFormReturned({ data: result.items }));
    else yield put(postBusinessDirectoryFormReturned({ data: [] }));
  } catch (error) {
    console.error(error);
    yield put(postBusinessDirectoryFormReturned({ data: [] }));
  }
}

export function* watchSubmitBusinessDirectoryForm() {
  yield takeLatest(
    POST_BUSINESS_DIRECTORY_FORM,
    performSubmitBusinessDirectoryForm
  );
}
function* performSubmitBusinessDirectoryByActivity(action) {
  try {
    const data = action.data;

    const result = yield call(businessDirectorySearchByActivity, data);
    if (result)
      yield put(postBusinessDirectoryActivityReturned({ data: result.items }));
    else yield put(postBusinessDirectoryActivityReturned({ data: [] }));
  } catch (error) {
    console.error(error);
    yield put(postBusinessDirectoryActivityReturned({ data: [] }));
  }
}

export function* watchSubmitBusinessDirectoryByActivity() {
  yield takeLatest(
    POST_BUSINESS_DIRECTORY_ACTIVITY,
    performSubmitBusinessDirectoryByActivity
  );
}

function* performEservicesDetails(action) {
  try {
    const data = action.data;
    const result = yield call(fetchEServicesDetails, data);

    if (result && result.networkSuccess)
      yield put(getEservicesDetailsReturned({ data: result }));
    else yield put(getEservicesDetailsReturned({ data: [] }));
  } catch (error) {
    console.error(error);
    yield put(getEservicesDetailsReturned({ data: [] }));
  }
}

export function* watchEservicesDetails() {
  yield takeLatest(GET_ESERVICES_DETAILS, performEservicesDetails);
}

function* performEservicesGroups(action) {
  try {
    const data = action.data;
    const result = yield call(fetchEServicesGroups, data);

    if (result && result.networkSuccess) {
      let res = [];
      for (const [key, value] of Object.entries(result)) {
        if (key != "networkSuccess") res.push(value);
      }
      yield put(getEservicesGroupsReturned({ data: res }));
    } else yield put(getEservicesGroupsReturned({ data: [] }));
  } catch (error) {
    console.error(error);
    yield put(getEservicesGroupsReturned({ data: [] }));
  }
}

export function* watchEservicesGroups() {
  yield takeLatest(GET_ESERVICES_GROUPS, performEservicesGroups);
}

function* performEservicesList(action) {
  try {
    const data = action.data;
    const result = yield call(fetchEServicesLists, data);

    if (result && result.networkSuccess) {
      yield put(getEservicesListReturned({ data: result }));
    } else yield put(getEservicesListReturned({ data: [] }));
  } catch (error) {
    console.error(error);
    yield put(getEservicesListReturned({ data: [] }));
  }
}

export function* watchEservicesList() {
  yield takeLatest(GET_ESERVICES_LIST, performEservicesList);
}

function* performCooVerification(action) {
  try {
    const data = action.data;
    const result = yield call(cooVerification, data);

    if (result && result.networkSuccess)
      yield put(postCooVerifyFormReturned({ data: result }));
    else yield put(postCooVerifyFormReturned({ data: [] }));
  } catch (error) {
    console.error(error);
    yield put(postCooVerifyFormReturned({ data: [] }));
  }
}

export function* watchCooVerification() {
  yield takeLatest(POST_COO_VERIFY_FORM, performCooVerification);
}

function* performRatificationVerification(action) {
  try {
    const data = action.data;
    const result = yield call(ratificationVerification, data);

    if (result && result.networkSuccess)
      yield put(getRatificationVerifyReturned({ data: result }));
    else yield put(getRatificationVerifyReturned({ data: [] }));
  } catch (error) {
    console.error(error);
    yield put(getRatificationVerifyReturned({ data: [] }));
  }
}

export function* watchRatificationVerification() {
  yield takeLatest(GET_RATIFICATION_VERIFY, performRatificationVerification);
}

function* performServiceLogin({ user, password, loginType, loginById }) {
  const data = { user_name: user, password: password, loginType };
  try {
    const result = yield call(serviceLogin, data);
    if (result && result.networkSuccess) {
      if (result.error) {
        yield put(serviceLoginDone({ status: 0 }));
        yield put(serviceLoginFaild({ code: result }));
        sessionStorage.setItem("loggedType", 0);
      } else {
        yield put(serviceLoginDone({ status: loginType }));
        sessionStorage.setItem("loggedType", loginType);
        sessionStorage.setItem(
          "serviceProfile",
          JSON.stringify(result.user[0])
        );
        if (
          new Date(result?.user[0]?.membership_expiry_date).getTime() <
            new Date(new Date()).getTime() &&
          result?.user[0]?.status == 1 &&
          result?.user[0]?.exception_flag == 2
        )
          sessionStorage.setItem("memberType", "expired");
        else if (
          new Date(result?.user[0]?.membership_expiry_date).getTime() <
            new Date(new Date()).getTime() &&
          result?.user[0]?.status == 1 &&
          result?.user[0]?.exception_flag == 1
        )
          sessionStorage.setItem("memberType", "activeExpired");
        else if (result?.user[0]?.status == 1)
          sessionStorage.setItem("memberType", "active");
        else if (result?.user[0]?.status == 2)
          sessionStorage.setItem("memberType", "canceled");
        if (loginById) {
          store.dispatch(push("/services-form/uaepass-exist-register"));
        } else {
          if (
            loginType == 1 &&
            (result?.user[0]?.language == 0 ||
              result?.user[0]?.language == null ||
              result?.user[0]?.preferred_contact_way == 0 ||
              result?.user[0]?.preferred_contact_way == null ||
              result?.user[0]?.gender == 0 ||
              result?.user[0]?.gender == null ||
              result?.user[0]?.age == 0 ||
              result?.user[0]?.age == null ||
              result?.user[0]?.work_type == 0 ||
              result?.user[0]?.work_type == null)
          ) {
            store.dispatch(push("/services-form/profile"));
            sessionStorage.setItem("updateUser", true);
          } else store.dispatch(push("/services/rak-chamber/dashboard"));
        }
      }
    } else {
      yield put(serviceLoginDone({ status: 0 }));
      yield put(serviceLoginFaild({ code: 1 }));
      sessionStorage.setItem("loggedType", 0);
    }
  } catch (error) {
    console.error(error);
    yield put(serviceLoginDone({ status: 0 }));
    sessionStorage.setItem("loggedType", 0);
  }
}

export function* watchServiceLogin() {
  yield takeLatest(SERVICE_LOGIN, performServiceLogin);
}

function* performFetchSelectMenuData() {
  try {
    const result = yield call(getSelectMenuData);

    if (result) {
      yield put(fetchSelectMenuDataDone({ data: { ...result } }));
    } else {
      yield put(fetchSelectMenuDataDone({ data: {} }));
    }
  } catch (error) {
    console.error(error);
    yield put(fetchSelectMenuDataDone({ data: {} }));
  }
}

export function* watchFetchSelectMenuData() {
  yield takeLatest(FETCH_SELECT_MENU_DATA, performFetchSelectMenuData);
}

function* performFetchIsicActivityData() {
  try {
    const result = yield call(getIsicActivityData);

    if (result) {
      yield put(fetchIsicActivityDataDone({ data: { ...result } }));
    } else {
      yield put(fetchIsicActivityDataDone({ data: {} }));
    }
  } catch (error) {
    console.error(error);
    yield put(fetchIsicActivityDataDone({ data: {} }));
  }
}

export function* watchFetchIsicActivityData() {
  yield takeLatest(FETCH_ISIC_ACTIVITY_DATA, performFetchIsicActivityData);
}

function* performCalculateFees({ data }) {
  try {
    const result = yield call(calculateFees, data);

    if (result && result.networkSuccess) {
      yield put(calculateFeesDone({ data: { ...result } }));
    } else {
      yield put(calculateFeesDone({ data: {} }));
    }
  } catch (error) {
    console.error(error);
    yield put(calculateFeesDone({ data: {} }));
  }
}

export function* watchCalculateFees() {
  yield takeLatest(CALCULATE_FEES, performCalculateFees);
}

function* performSendNewCooData({ data }) {
  try {
    const result = yield call(newCoo, data);

    if (result && result.networkSuccess) {
      yield put(saveNewCooDataDone({ data: { ...result } }));
    } else {
      yield put(saveNewCooDataDone({ data: {} }));
    }
  } catch (error) {
    console.error(error);
    yield put(saveNewCooDataDone({ data: {} }));
  }
}

export function* watchSendNewCooData() {
  yield takeLatest(SAVE_NEW_COO_DATA, performSendNewCooData);
}

function* performGetRakRequestsList(action) {
  try {
    const data = action.data;
    const result = yield call(getRakRequestsList, data);
    if (result && result.networkSuccess) {
      yield put(getRakRequestsListDone({ data: { ...result } }));
    } else {
      yield put(getRakRequestsListDone({ data: {} }));
    }
  } catch (error) {
    console.error(error);
    yield put(getRakRequestsListDone({ data: {} }));
  }
}

export function* watchGetRakRequestsList() {
  yield takeLatest(GET_RAK_REQUESTS_LIST, performGetRakRequestsList);
}

function* performCooVerifyData(action) {
  try {
    const data = action.data;
    const result = yield call(cooVerificationData, data);

    if (result && result.networkSuccess)
      yield put(getCooVerifyDataReturned({ data: result }));
    else yield put(getCooVerifyDataReturned({ data: [] }));
  } catch (error) {
    console.error(error);
    yield put(getCooVerifyDataReturned({ data: [] }));
  }
}

export function* watchCooVerifyData() {
  yield takeLatest(GET_COO_VERIFY_DATA, performCooVerifyData);
}

function* performCooAccreditedList(action) {
  try {
    const data = action.data;
    const result = yield call(getCooAccreditedList, data);

    if (result && result.networkSuccess)
      yield put(getCooAccreditedListDone({ data: result }));
    else yield put(getCooAccreditedListDone({ data: [] }));
  } catch (error) {
    console.error(error);
    yield put(getCooAccreditedListDone({ data: [] }));
  }
}

export function* watchCooAccreditedList() {
  yield takeLatest(GET_COO_ACCREDITED_LIST, performCooAccreditedList);
}

function* performCooAdditionalRequest(action) {
  try {
    const data = action.data;
    const result = yield call(cooAdditionalRequest, data);
    if (result && result.networkSuccess)
      yield put(sendCooAdditionalRequestDone({ data: result }));
    else {
      yield put(sendCooAdditionalRequestDone({ data: [] }));
      MySwal.fire({
        icon: "error",
        title: "Invalid Request",
      });
    }
  } catch (error) {
    console.error(error);
    yield put(sendCooAdditionalRequestDone({ data: [] }));
  }
}

export function* watchCooAdditionalRequest() {
  yield takeLatest(SEND_COO_ADDITIONAL_REQUEST, performCooAdditionalRequest);
}


function* performOtherRequest(action) {
  try {
    const data = action.data;
    const result = yield call(otherRequest, data);
    if (result && result.networkSuccess)
      yield put(sendOtherRequestDone({ data: result }));
    else {
      yield put(sendOtherRequestDone({ data: [] }));
      MySwal.fire({
        icon: "error",
        title: "Invalid Request",
      });
    }
  } catch (error) {
    console.error(error);
    yield put(sendOtherRequestDone({ data: [] }));
  }
}

export function* watchOtherRequest() {
  yield takeLatest(SEND_OTHER_REQUEST, performOtherRequest);
}



function* performCooEditRequest(action) {
  try {
    const data = action.data;
    const result = yield call(cooEditRequest, action.sendType, data);
    if (result && result.networkSuccess)
      yield put(sendCooEditRequestDone({ data: result }));
    else {
      yield put(sendCooEditRequestDone({ data: [] }));
      MySwal.fire({
        icon: "error",
        title: "Invalid Request",
      });
    }
  } catch (error) {
    console.error(error);
    yield put(sendCooEditRequestDone({ data: [] }));
  }
}

export function* watchCooEditRequest() {
  yield takeLatest(SEND_COO_EDIT_REQUEST, performCooEditRequest);
}

function* performGoodsDetailsList(action) {
  try {
    const data = action.data;
    const result = yield call(goodsDetailsList, data);
    if (result && result.networkSuccess)
      yield put(getGoodsDetailsListDone({ data: result }));
    else {
      yield put(getGoodsDetailsListDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getGoodsDetailsListDone({ data: [] }));
  }
}

export function* watchGoodsDetailsList() {
  yield takeLatest(GET_GOODS_DETAILS_LIST, performGoodsDetailsList);
}

function* performCooGoodsEditRequest(action) {
  try {
    const data = action.data;
    const result = yield call(cooEditGoodsDetail, action.sendType, data);
    if (result && result.networkSuccess)
      yield put(sendCooEditGoodsDone({ data: result }));
    else {
      yield put(sendCooEditGoodsDone({ data: [] }));
      MySwal.fire({
        icon: "error",
        title: "Invalid Request",
      });
    }
  } catch (error) {
    console.error(error);
    yield put(sendCooEditGoodsDone({ data: [] }));
  }
}

export function* watchCooGoodsEditRequest() {
  yield takeLatest(SEND_COO_EDIT_GOODS, performCooGoodsEditRequest);
}

function* performRatificationType(action) {
  try {
    const data = action.data;
    const result = yield call(ratificationType, data);
    if (result && result.networkSuccess && result.items)
      yield put(getRatificationTypeDone({ data: result.items }));
    else {
      yield put(getRatificationTypeDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getRatificationTypeDone({ data: [] }));
  }
}

export function* watchRatificationType() {
  yield takeLatest(GET_RATIFICATION_TYPE, performRatificationType);
}

function* performRatificationDocType(action) {
  try {
    const data = action.data;
    const result = yield call(ratificationDocType, data);
    if (result && result.networkSuccess && result.items)
      yield put(getRatificationDocTypeDone({ data: result.items }));
    else {
      yield put(getRatificationDocTypeDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getRatificationDocTypeDone({ data: [] }));
  }
}

export function* watchRatificationDocType() {
  yield takeLatest(GET_RATIFICATION_DOC_TYPE, performRatificationDocType);
}

function* performSendRatificationRequest(action) {
  try {
    const data = action.data;
    const result = yield call(ratificationRequest, data);
    if (result && result.networkSuccess && result.rowcode)
      yield put(sendRatificationRequestDone({ data: result }));
    else {
      yield put(sendRatificationRequestDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(sendRatificationRequestDone({ data: [] }));
  }
}

export function* watchSendRatificationRequest() {
  yield takeLatest(SEND_RATIFICATION_REQUEST, performSendRatificationRequest);
}

function* performVerfiyMembership(action) {
  try {
    const data = action.data;
    const result = yield call(membershipVerification, data);
    if (
      result &&
      result.networkSuccess &&
      result.activities &&
      result.company_profile
    )
      yield put(getMembershipVerifyDone({ data: result }));
    else {
      yield put(getMembershipVerifyDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getMembershipVerifyDone({ data: [] }));
  }
}

export function* watchVerfiyMembership() {
  yield takeLatest(GET_MEMBERSHIP_VERIFY, performVerfiyMembership);
}

function* performMembershipFees(action) {
  try {
    const data = action.data;
    const result = yield call(membershipFees, data);
    if (result && result.networkSuccess && result.items)
      yield put(getMembershipFeesDone({ data: result }));
    else {
      yield put(getMembershipFeesDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getMembershipFeesDone({ data: [] }));
  }
}

export function* watchMembershipFees() {
  yield takeLatest(GET_MEMBERSHIP_FEES, performMembershipFees);
}

function* performMembershipProfile(action) {
  try {
    const data = action.data;
    const result = yield call(membershipProfile, data, action.dataType);
    if (
      (result && result.items) ||
      (result &&
        result.networkSuccess &&
        result.activities &&
        result.company_profile)
    )
      yield put(getMembershipProfileDone({ data: result }));
    else {
      yield put(getMembershipProfileDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getMembershipProfileDone({ data: [] }));
  }
}

export function* watchMembershipProfile() {
  yield takeLatest(GET_MEMBERSHIP_PROFILE, performMembershipProfile);
}

function* performCooAttachments(action) {
  try {
    const data = action.data;
    const result = yield call(cooAttachments, data, action.reqType);
    if (result && result.networkSuccess)
      yield put(sendCooAttachmentsDone({ data: result }));
    else {
      yield put(sendCooAttachmentsDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(sendCooAttachmentsDone({ data: [] }));
  }
}

export function* watchCooAttachments() {
  yield takeLatest(SEND_COO_ATTACHMENTS, performCooAttachments);
}

function* performDeleteRequest(action) {
  try {
    const data = action.data;
    const result = yield call(deleteRequest, data);
    if (result && result.networkSuccess && result.req_code)
      yield put(deleteRequestDone({ data: result }));
    else {
      yield put(deleteRequestDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(deleteRequestDone({ data: [] }));
  }
}

export function* watchDeleteRequest() {
  yield takeLatest(DELETE_REQUEST, performDeleteRequest);
}

function* performIssuedRequestsList(action) {
  try {
    const data = action.data;
    const result = yield call(getIssuedRequestsList, data);
    if (result && result.networkSuccess)
      yield put(getRakIssuedRequestsListDone({ data: { ...result } }));
    else {
      yield put(getRakIssuedRequestsListDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getRakIssuedRequestsListDone({ data: [] }));
  }
}

export function* watchIssuedRequestsList() {
  yield takeLatest(GET_RAK_ISSUED_REQUESTS_LIST, performIssuedRequestsList);
}

function* performPaymentRequest(action) {
  try {
    const data = action.data;
    const result = yield call(paymentRequest, data);
    if (result && result.networkSuccess)
      yield put(sendPaymentRequestDataDone({ data: { ...result } }));
    else {
      yield put(sendPaymentRequestDataDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(sendPaymentRequestDataDone({ data: [] }));
  }
}

export function* watchPaymentRequest() {
  yield takeLatest(SEND_PAYMENT_REQUEST_DATA, performPaymentRequest);
}

function* performTotalsRequest(action) {
  try {
    const data = action.data;
    const result = yield call(totals, data);
    if (result && result.networkSuccess)
      yield put(getTotalsDataDone({ data: { ...result } }));
    else {
      yield put(getTotalsDataDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getTotalsDataDone({ data: [] }));
  }
}

export function* watchTotalsRequest() {
  yield takeLatest(GET_TOTALS_DATA, performTotalsRequest);
}

function* performPaymentDetails(action) {
  try {
    const data = action.data;
    const result = yield call(paymentDetails, data);
    if (result && result.networkSuccess)
      yield put(getPaymentDetailsDataDone({ data: { ...result } }));
    else {
      yield put(getPaymentDetailsDataDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getPaymentDetailsDataDone({ data: [] }));
  }
}

export function* watchPaymentDetails() {
  yield takeLatest(GET_PAYMENT_DETAILS_DATA, performPaymentDetails);
}

function* performConfirmPayment(action) {
  try {
    const data = action.data;
    const result = yield call(confirmPayment, data);
    if (result && result.networkSuccess)
      yield put(postConfirmPaymentDataDone({ data: { ...result } }));
    else {
      yield put(postConfirmPaymentDataDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(postConfirmPaymentDataDone({ data: [] }));
  }
}

export function* watchConfirmPayment() {
  yield takeLatest(POST_CONFIRM_PAYMENT_DATA, performConfirmPayment);
}

function* performRatificationRequestDetails(action) {
  try {
    const data = action.data;
    const result = yield call(ratificationRequestDetails, data, action.reqType);
    if (result && result.networkSuccess)
      yield put(getRatificationRequestDataDone({ data: result.items[0] }));
    else {
      yield put(getRatificationRequestDataDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getRatificationRequestDataDone({ data: [] }));
  }
}

export function* watchRatificationRequestDetails() {
  yield takeLatest(
    GET_RATIFICATION_REQUEST_DATA,
    performRatificationRequestDetails
  );
}

function* performRatificationAttach(action) {
  try {
    const data = action.data;
    const result = yield call(ratificationRequestAttach, data, action.reqType);
    if (result && result.networkSuccess)
      yield put(getRatificationAttachDataDone({ data: result.items }));
    else {
      yield put(getRatificationAttachDataDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getRatificationAttachDataDone({ data: [] }));
  }
}

export function* watchRatificationRequestAttach() {
  yield takeLatest(GET_RATIFICATION_ATTACH_DATA, performRatificationAttach);
}

function* performRatificationRequestUpdate(action) {
  try {
    const data = action.data;
    const result = yield call(ratificationRequestUpdate, data);
    if (result && result.networkSuccess)
      yield put(sendRatificationUpdateRequestDone({ data: result }));
    else {
      yield put(sendRatificationUpdateRequestDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(sendRatificationUpdateRequestDone({ data: [] }));
  }
}

export function* watchRatificationRequestRequestUpdate() {
  yield takeLatest(
    SEND_RATIFICATION_UPDATE_REQUEST,
    performRatificationRequestUpdate
  );
}

function* performcooAdditionalRequestDetails(action) {
  try {
    const data = action.data;
    const result = yield call(cooAdditionalRequestDetails, data);
    if (result && result.networkSuccess)
      yield put(getCooAdditionalRequestDetailsDone({ data: result.items[0] }));
    else {
      yield put(getCooAdditionalRequestDetailsDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getCooAdditionalRequestDetailsDone({ data: [] }));
  }
}

export function* watchcooAdditionalRequestDetails() {
  yield takeLatest(
    GET_COO_ADDITIONAL_REQUEST_DETAILS,
    performcooAdditionalRequestDetails
  );
}


function* performotherRequestDetails(action) {
  try {
    const data = action.data;
    const result = yield call(otherRequestDetails, data);
    if (result && result.networkSuccess)
      yield put(getOtherRequestDetailsDone({ data: result.items[0] }));
    else {
      yield put(getOtherRequestDetailsDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getOtherRequestDetailsDone({ data: [] }));
  }
}

export function* watchotherRequestDetails() {
  yield takeLatest(
    GET_OTHER_REQUEST_DETAILS,
    performotherRequestDetails
  );
}


function* performcooEditRequestDetails(action) {
  try {
    const data = action.data;
    const result = yield call(cooEditRequestDetails, data);
    if (result && result.networkSuccess)
      yield put(getCooEditRequestDetailsDone({ data: result }));
    else {
      yield put(getCooEditRequestDetailsDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getCooEditRequestDetailsDone({ data: [] }));
  }
}

export function* watchcooEditRequestDetails() {
  yield takeLatest(GET_COO_EDIT_REQUEST_DETAILS, performcooEditRequestDetails);
}

function* performcooEditRequestOriginDetails(action) {
  try {
    const data = action.data;
    const result = yield call(cooEditRequestOriginDetails, data);
    if (result && result.networkSuccess)
      yield put(getCooEditRequestOriginDetailsDone({ data: result }));
    else {
      yield put(getCooEditRequestOriginDetailsDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getCooEditRequestOriginDetailsDone({ data: [] }));
  }
}

export function* watchcooEditRequestOriginDetails() {
  yield takeLatest(
    GET_COO_EDIT_REQUEST_ORIGIN_DETAILS,
    performcooEditRequestOriginDetails
  );
}

function* performCooGoodsEditData(action) {
  try {
    const data = action.data;
    const result = yield call(cooEditGoodsDetailData, data);
    if (result && result.networkSuccess)
      yield put(getCooEditGoodsDataDone({ data: result }));
    else {
      yield put(getCooEditGoodsDataDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getCooEditGoodsDataDone({ data: [] }));
  }
}

export function* watchCooGoodsEditData() {
  yield takeLatest(GET_COO_EDIT_GOODS_DATA, performCooGoodsEditData);
}

function* performCooStampsData(action) {
  try {
    const data = action.data;
    const result = yield call(cooStamps, data);
    if (result && result.networkSuccess)
      yield put(getCooStampsDone({ data: result.items }));
    else {
      yield put(getCooStampsDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getCooStampsDone({ data: [] }));
  }
}

export function* watchCooStampsData() {
  yield takeLatest(GET_COO_STAMPS, performCooStampsData);
}

function* performCheckInvoiceNo(action) {
  try {
    const data = action.data;
    const result = yield call(checkInvoice, data);
    if (result && result.networkSuccess)
      yield put(checkInvoiceNoDone({ data: result.message[0] }));
    else {
      yield put(checkInvoiceNoDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(checkInvoiceNoDone({ data: [] }));
  }
}

export function* watchCheckInvoiceNo() {
  yield takeLatest(CHECK_INVOICE_NO, performCheckInvoiceNo);
}

function* performDeletedAttachs(action) {
  try {
    const data = action.data;
    const result = yield call(ratificationRequestDelete, data, action.reqType);
    if (result && result.networkSuccess)
      yield put(sendDeletedAttachmentsDone({ data: result }));
    else {
      yield put(sendDeletedAttachmentsDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(sendDeletedAttachmentsDone({ data: [] }));
  }
}

export function* watchDeletedAttachs() {
  yield takeLatest(SEND_DELETED_ATTACHMENTS, performDeletedAttachs);
}

function* performCooAdditionalRequestUpdate(action) {
  try {
    const data = action.data;
    const result = yield call(cooAdditionalRequestUpdate, data);
    if (result && result.networkSuccess)
      yield put(sendCooAdditionalRequestUpdateDone({ data: result }));
    else {
      yield put(sendCooAdditionalRequestUpdateDone({ data: [] }));
      MySwal.fire({
        icon: "error",
        title: "Invalid Request",
      });
    }
  } catch (error) {
    console.error(error);
    yield put(sendCooAdditionalRequestUpdateDone({ data: [] }));
  }
}

export function* watchCooAdditionalRequestUpdate() {
  yield takeLatest(
    SEND_COO_ADDITIONAL_REQUEST_UPDATE,
    performCooAdditionalRequestUpdate
  );
}

function* performOtherRequestUpdate(action) {
  try {
    const data = action.data;
    const result = yield call(otherRequestUpdate, data);
    if (result && result.networkSuccess)
      yield put(sendOtherRequestUpdateDone({ data: result }));
    else {
      yield put(sendOtherRequestUpdateDone({ data: [] }));
      MySwal.fire({
        icon: "error",
        title: "Invalid Request",
      });
    }
  } catch (error) {
    console.error(error);
    yield put(sendOtherRequestUpdateDone({ data: [] }));
  }
}

export function* watchOtherRequestUpdate() {
  yield takeLatest(
    SEND_OTHER_REQUEST_UPDATE,
    performOtherRequestUpdate
  );
}


function* performMostUsedService(action) {
  try {
    const data = action.data;
    const result = yield call(sendMostUsedService, data);
    if (result && result.networkSuccess)
      yield put(sendMostUsedServiceDone({ data: result }));
    else {
      yield put(sendMostUsedServiceDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(sendMostUsedServiceDone({ data: [] }));
  }
}

export function* watchMostUsedService() {
  yield takeLatest(SEND_MOST_USED_SERVICE, performMostUsedService);
}

function* performGetMostUsedService() {
  try {
    const result = yield call(getMostUsedService);
    if (result && result.networkSuccess)
      yield put(getMostUsedServiceDone({ data: result.res.mostUsed }));
    else {
      yield put(getMostUsedServiceDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getMostUsedServiceDone({ data: [] }));
  }
}

export function* watchGetMostUsedService() {
  yield takeLatest(GET_MOST_USED_SERVICE, performGetMostUsedService);
}

function* performGetCooRequestDetails(action) {
  try {
    const data = action.data;
    const result = yield call(getCooRequestDetails, data);
    if (result && result.networkSuccess)
      yield put(getCooRequestDetailsDone({ data: result }));
    else {
      yield put(getCooRequestDetailsDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getCooRequestDetailsDone({ data: [] }));
  }
}

export function* watchGetCooRequestDetails() {
  yield takeLatest(GET_COO_REQUEST_DETAILS, performGetCooRequestDetails);
}

function* performCooUpdateRequest(action) {
  try {
    const data = action.data;
    const result = yield call(cooRequestUpdate, data);
    if (result && result.networkSuccess)
      yield put(sendCooUpdateRequestDone({ data: result }));
    else {
      yield put(sendCooUpdateRequestDone({ data: [] }));
      MySwal.fire({
        icon: "error",
        title: "Invalid Request",
      });
    }
  } catch (error) {
    console.error(error);
    yield put(sendCooUpdateRequestDone({ data: [] }));
  }
}

export function* watchCooUpdateRequest() {
  yield takeLatest(SEND_COO_UPDATE_REQUEST, performCooUpdateRequest);
}

function* performUpdatePassword(action) {
  try {
    const data = action.data;
    const result = yield call(updatePassword, data, action.userType);
    if (result && result.networkSuccess)
      yield put(sendUpdatedPasswordDone({ data: result }));
    else {
      yield put(sendUpdatedPasswordDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(sendUpdatedPasswordDone({ data: [] }));
  }
}

export function* watchUpdatePassword() {
  yield takeLatest(SEND_UPDATED_PASSWORD, performUpdatePassword);
}

function* performSearchByKeyword(action) {
  try {
    const data = action.data;
    const result = yield call(searchByKeyword, data);
    if (result && result.networkSuccess) {
      yield put(postSearchKeywordData({ data: result }));
    } else {
      yield put(postSearchKeywordData({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(postSearchKeywordData({ data: [] }));
  }
}

export function* watchSearchByKeyword() {
  yield takeLatest(POST_SEARCH_KEYWORD, performSearchByKeyword);
}

function* performCustomerRate(action) {
  try {
    const data = action.data;
    const result = yield call(sendCustomerRating, data);
    if (result && result.networkSuccess)
      yield put(sendCustomerRateDone({ data: result }));
    else {
      yield put(sendCustomerRateDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(sendCustomerRateDone({ data: [] }));
  }
}

export function* watchCustomerRate() {
  yield takeLatest(SEND_CUSTOMER_RATE, performCustomerRate);
}

function* performPaymentTrx(action) {
  try {
    const data = action.data;
    const result = yield call(getPaymentTrx, data);
    if (result && result.networkSuccess)
      yield put(getPaymentTrxDone({ data: result }));
    else {
      yield put(getPaymentTrxDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getPaymentTrxDone({ data: [] }));
  }
}

export function* watchPaymentTrx() {
  yield takeLatest(GET_PAYMENT_TRX, performPaymentTrx);
}

function* performMemberRegister(action) {
  try {
    const data = action.data;
    const result = yield call(sendMemberRegister, data, action.userType);
    if (result && result.networkSuccess)
      yield put(sendMemberRegisterDone({ data: result }));
    else {
      yield put(sendMemberRegisterDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(sendMemberRegisterDone({ data: [] }));
  }
}

export function* watchMemberRegister() {
  yield takeLatest(SEND_MEMBER_REGISTER, performMemberRegister);
}

function* performMemberProfileCompanyUpdate(action) {
  try {
    const data = action.data;
    const result = yield call(profileCompanyUpdate, data, action.dataType);
    if (result && result.networkSuccess)
      yield put(sendMemberProfileUpdateDone({ data: result }));
    else {
      yield put(sendMemberProfileUpdateDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(sendMemberProfileUpdateDone({ data: [] }));
  }
}

export function* watchMemberProfileCompanyUpdate() {
  yield takeLatest(
    SEND_MEMBER_PROFILE_UPDATE,
    performMemberProfileCompanyUpdate
  );
}

function* performServiceLoginUpdate(action) {
  try {
    const result = yield call(editServiceUserProfile, action);
    if (result && result.networkSuccess)
      yield put(serviceLoginUpdateDone({ data: result }));
    else {
      yield put(serviceLoginUpdateDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(serviceLoginUpdateDone({ data: [] }));
  }
}

export function* watchServiceLoginUpdate() {
  yield takeLatest(SERVICE_LOGIN_UPDATE, performServiceLoginUpdate);
}

function* performGetCirculars() {
  try {
    const result = yield call(getCirculars);
    if (result && result.networkSuccess)
      yield put(getCircularsDone({ data: result }));
    else {
      yield put(getCircularsDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getCircularsDone({ data: [] }));
  }
}

export function* watchGetCirculars() {
  yield takeLatest(GET_CIRCULARS, performGetCirculars);
}

function* performSendNotification(action) {
  try {
    let data = action?.data;
    const result = yield call(sendNotification, data);
    if (result && result.networkSuccess && result?.o_result?.length > 0)
      yield put(
        sendNotificationDone({
          data: { ...result?.o_result[0], success: true },
        })
      );
    else yield put(sendNotificationDone({ data: [] }));
  } catch (error) {
    console.error(error);
    yield put(sendNotificationDone({ data: [] }));
  }
}
export function* watchSendNotification() {
  yield takeLatest(SEND_NOTIFICATION, performSendNotification);
}

function* performSendEmail(action) {
  try {
    let data = action?.data;
    const result = yield call(sendEmail, data);
    if (result && result.networkSuccess)
      yield put(sendEmailDone({ data: result?.data }));
    else yield put(sendEmailDone({ data: [] }));
  } catch (error) {
    console.error(error);
    yield put(sendEmailDone({ data: [] }));
  }
}
export function* watchSendEmail() {
  yield takeLatest(SEND_EMAIL, performSendEmail);
}

function* performGetFileList(action) {
  try {
    const data = action.data;
    const result = yield call(getFileList, data);
    if (result && result.networkSuccess)
      yield put(getFileListDone({ data: result }));
    else {
      yield put(getFileListDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getFileListDone({ data: [] }));
  }
}

export function* watchGetFileList() {
  yield takeLatest(GET_FILE_LIST, performGetFileList);
}

function* performFileStamp(action) {
  try {
    const data = action.data;
    const code = action.code;
    const fileType = action.fileType;
    let result = [];
    let resultItem = {};
    if (data && data?.length) {
      for (let i = 0; i < data.length; i++) {
        resultItem = yield call(
          fileStamp,
          data[i],
          data[i]?.income_code && data[i]?.income_code == "51"
            ? "ratifi"
            : "stamp"
        );
        axios.post(`/api/info`, {
          key: `${data[i]} / stamp file`,
          data: JSON.stringify(resultItem),
        });
        if (resultItem && resultItem.networkSuccess) {
          resultItem = {
            success: resultItem?.data?.success,
            coo_code: data[i]?.coo_code ? data[i]?.coo_code : 0,
            trx_code: code,
            income_code: data[i]?.income_code ? data[i]?.income_code : 0,
            attachment_name: data[i]?.file_to_stamp
              ? data[i]?.file_to_stamp
              : null,

            stampped_file_name: data[i]?.file_to_stamp
              ? data[i]?.income_code && data[i]?.income_code == "51"
                ? data[i]?.file_to_stamp.substr(
                    0,
                    data[i]?.file_to_stamp.lastIndexOf(".")
                  ) + "_ratified.pdf"
                : data[i]?.file_to_stamp.substr(
                    0,
                    data[i]?.file_to_stamp.lastIndexOf(".")
                  ) + "_stamped.pdf"
              : "",
            stampped_by: "Auto",
            additional_request_code: data[i]?.request_code
              ? data[i]?.request_code
              : 0,
          };
          result?.push(resultItem);
        }
      }
    }
    axios.post(`/api/info`, {
      key: `${code} / file stamp result`,
      data: JSON.stringify(result),
    });
    yield put(
      fileStampDone({
        data: result,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(fileStampDone({ data: [] }));
  }
}

export function* watchFileStamp() {
  yield takeLatest(FILE_STAMP, performFileStamp);
}

function* performFinishFileStamp(action) {
  try {
    const data = action.data;
    const result = yield call(finishFileStamp, { coo_stamps: data });
    if (result && result.networkSuccess)
      yield put(finishFileStampDone({ data: result }));
    else {
      yield put(finishFileStampDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(finishFileStampDone({ data: [] }));
  }
}

export function* watchFinishFileStamp() {
  yield takeLatest(FINISH_FILE_STAMP, performFinishFileStamp);
}

function* performSupplierLogin({ email, password }) {
  const data = { email: email, password: password };
  try {
    const result = yield call(supplierLogin, data);
    if (result && result.networkSuccess) {
      if (!result?.data?.success) {
        yield put(supplierLoginDone({ status: 0 }));
        yield put(serviceLoginFaild({ code: result }));
        sessionStorage.setItem("loggedType", 0);
      } else {
        yield put(serviceLoginDone({ status: 3 }));
        sessionStorage.setItem("loggedType", 3);
        sessionStorage.setItem(
          "supplierProfile",
          JSON.stringify(result?.data?.user)
        );
        sessionStorage.setItem("supplierAuthUserSession", result?.data?.token);
        sessionStorage.setItem("updateUser", true);
        sessionStorage.setItem("haveRequest", result?.data?.haveRequest);
        store.dispatch(
          push(
            result?.data?.haveRequest
              ? "/services-form/supplier-services/Supplier Registration/view"
              : "/services-form/supplier-services/Supplier Registration"
          )
        );
      }
    } else {
      yield put(serviceLoginDone({ status: 0 }));
      sessionStorage.setItem("loggedType", 0);
    }
  } catch (error) {
    console.error(error);
    yield put(serviceLoginDone({ status: 0 }));
    sessionStorage.setItem("loggedType", 0);
  }
}

export function* SupplierLogin() {
  yield takeLatest(SUPPLIER_LOGIN, performSupplierLogin);
}

function* performSupplierRegister(action) {
  try {
    const data = action.data;
    const result = yield call(sendSupplierRegister, data);
    if (result && result.networkSuccess)
      yield put(sendSupplierRegisterDone({ data: result }));
    else {
      yield put(sendSupplierRegisterDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(sendSupplierRegisterDone({ data: [] }));
  }
}

export function* watchSupplierRegister() {
  yield takeLatest(SEND_SUPPLIER_REGISTER, performSupplierRegister);
}

function* performGetNotification(action) {
  try {
    const data = action.data;
    const result = yield call(getNotifications, data);
    if (result && result.networkSuccess)
      yield put(getNotificationDone({ data: result }));
    else {
      yield put(getNotificationDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getNotificationDone({ data: [] }));
  }
}

export function* watchGetNotification() {
  yield takeLatest(GET_NOTIFICATION, performGetNotification);
}

function* performGetServiceStep(action) {
  try {
    const data = action.data;
    const result = yield call(getServiceStep, data);
    if (result && result.networkSuccess)
      yield put(getServiceStepDone({ data: result }));
    else {
      yield put(getServiceStepDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getServiceStepDone({ data: [] }));
  }
}

export function* watchGetServiceStep() {
  yield takeLatest(GET_SERVICE_STEP, performGetServiceStep);
}

function* performPostPrintTracking(action) {
  try {
    const data = action.data;
    const result = yield call(printTracking, data);
    if (result && result.networkSuccess)
      yield put(postPrintTrackingDone({ data: result }));
    else {
      yield put(postPrintTrackingDone({ data: [] }));
    }
  } catch (error) {
    yield put(postPrintTrackingDone({ data: [] }));
  }
}

export function* watchPostPrintTracking() {
  yield takeLatest(POST_PRINT_TRACKING, performPostPrintTracking);
}

function* performGetTrxCooList(action) {
  try {
    const data = action.data;
    const result = yield call(getTrxCooList, data);
    if (result && result.networkSuccess) {
      yield put(getTrxCooListDone({ data: result }));
      if (result?.items && result?.items?.length > 0) {
        const response = yield call(sendCooListToIcc, result?.items);
        if (
          response &&
          response?.data?.success &&
          response?.data?.data?.length > 0
        ) {
          let array = [];
          response?.data?.data?.map((item, index) => {
            array?.push({
              chamber: "AE1600401",
              number: result?.items[index]?.number,
              issued: result?.items[index]?.issued,
            });
          });
          for (let i = 0; i < array.length; i++) {
            const checkResponse = yield call(
              checkCooListToIcc,
              array[i]?.chamber,
              array[i]?.number,
              array[i]?.issued
            );
          }
        }
      }
    } else {
      yield put(getTrxCooListDone({ data: [] }));
    }
  } catch (error) {
    console.error(error);
    yield put(getTrxCooListDone({ data: [] }));
  }
}

export function* watchGetTrxCooList() {
  yield takeLatest(GET_TRX_COO_LIST, performGetTrxCooList);
}
