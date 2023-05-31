import {
  postRAKData,
  postRakServicesData,
  getRAKData,
  postData,
  fetchData,
} from "./api";
import axios from "axios";

export const businessDirectorySearch = async (data) =>
  await postRAKData("POST", "eservice_search_directory/search", data, null);

export const businessDirectorySearchByActivity = async (data) =>
  await postRAKData(
    "POST",
    "eservice_search_directory/search_by_activity",
    data,
    null
  );

export const fetchEServicesDetails = async (data) =>
  await postRakServicesData(`services/details`, data, null);

export const fetchEServicesGroups = async (data) =>
  await postRakServicesData(`services/groups`, data, null);

export const fetchEServicesLists = async (data) =>
  await postRakServicesData(`services/list`, data, null);

export const searchByKeyword = async (data) =>
  await postRakServicesData(`services/search`, data, null);

export const cooVerification = async (data) =>
  await postRAKData("POST", `eservice_coo/verify`, data, null);

export const cooVerificationData = async (data) =>
  await getRAKData(
    `${
      data.type == "verify"
        ? `eservice_coo/verify`
        : data.type == "issued"
        ? `eservice_coo/issued_coo`
        : data.type == "request"
        ? `eservice_coo/coo_request`
        : data.type == "print_issued"
        ? `eservice_coo/eprint_issued_coo`
        : `eservice_coo/verify`
    }`,
    { code: data.code },
    null
  );

export const ratificationVerification = async (data) =>
  await getRAKData(`eservice_ratification/verify`, data, null);

export const serviceLogin = async (data) =>
  data.loginType
    ? await postRAKData(
        "POST",
        `${data.loginType === 1 ? `eservice_member` : `eservice_person`}/login`,
        data,
        null
      )
    : null;

export const editServiceUserProfile = async (data) =>
  data.loginType
    ? await postRAKData(
        "PUT",
        `${data.loginType === 1 ? `eservice_member` : `eservice_person`}/login`,
        data.data,
        null
      )
    : null;

export const getSelectMenuData = async () => {
  let hsItems = await getRAKData("list/hsItems", null, true);
  let iactivity = await getRAKData("list/iactivity", null, true);
  let coo_type = await getRAKData("eservice_coo/coo_type");
  let currency = await getRAKData("list/currency", null, true);
  let country = await getRAKData("list/country", null, true);
  let transportation = await getRAKData("list/transportation", null, true);
  let uom = await getRAKData("list/uom", null, true);
  let legal_status = await getRAKData("list/legal_status", null, true);
  let classification = await getRAKData("list/classification", null, true);
  let domain = await getRAKData("list/domain", null, true);
  return {
    coo_type: coo_type.items || [],
    currency: currency.items || [],
    country: country.items || [],
    transportation: transportation.items || [],
    uom: uom.items || [],
    hsItems: hsItems.items || [],
    legal_status: legal_status.items || [],
    classification: classification.items || [],
    domain: domain.items || [],
    iactivity: iactivity.items || [],
    // networkSuccess:
    //   coo_type.networkSuccess &&
    //   currency.networkSuccess &&
    //   country.networkSuccess &&
    //   transportation.networkSuccess &&
    //   uom.networkSuccess &&
    //   hsItems.networkSuccess,
  };
};
export const getIsicActivityData = async () => {
  // let isic_activity = await getRAKData("list/isic_activity", null, true);
  let isic_activity = await getRAKData(
    `eservice_search_directory/isic_activity`,
    null,
    null
  );
  // let sector = await getRAKData("list/isic_activity_sector", null, true);
  let sector = await getRAKData(
    `eservice_search_directory/isic_activity_sector`,
    null,
    null
  );

  return {
    isic_activity: isic_activity.items || [],
    sector: sector.items || [],
  };
};

export const calculateFees = async (data) =>
  await getRAKData(`eservice_coo/fees/${data.invoiceValue}/${data.currency}`);

export const newCoo = async (data) =>
  await postRAKData("POST", `eservice_coo/request`, data, null);

export const uploadFileRak = async (body) => {
  return await axios
    .post(`/api/service/file/upload/${body.code}`, body.data)
    .then((res) => {
      if (res.status === 200 /* && res.data.successUpload*/) {
        return { networkSuccess: true, res: [...res.data] };
      } else {
        return { networkSuccess: false, res: [] || {} };
      }
    })
    .catch((e) => {
      return { networkSuccess: false, res: {} };
    });
};

export const getRakRequestsList = async (data) =>
  await getRAKData(
    `view_all_req_list/${
      data.code ? `person_pending_list` : `pending_request_list`
    }`,
    data,
    true
  );

export const getIssuedRequestsList = async (data) =>
  await getRAKData(
    `view_all_req_list/${
      data.code ? `person_issued_list` : `Issued_request_List`
    }`,
    data,
    true
  );

export const getCooAccreditedList = async (data) =>
  await getRAKData(`list/cooAccreditedList`, data, true);

export const cooAdditionalRequest = async (data) =>
  await postRAKData("POST", `eservice_coo/additional_request`, data, null);

export const cooAdditionalRequestUpdate = async (data) =>
  await postRAKData("PUT", `eservice_coo/additional_request`, data, null);

export const cooAdditionalRequestDetails = async (data) =>
  await getRAKData(`eservice_coo/additional_request`, data, null);

  export const otherRequest = async (data) =>
  await postRAKData("POST", `eservice_coo/other_request`, data, null);

export const otherRequestUpdate = async (data) =>
  await postRAKData("PUT", `eservice_coo/other_request`, data, null);

export const otherRequestDetails = async (data) =>
  await getRAKData(`eservice_coo/other_request`, data, null);

export const cooEditRequest = async (sendType, data) =>
  await postRAKData(
    sendType == "post" ? "POST" : sendType == "put" ? "PUT" : "POST",
    `eservice_coo_amendment/cooEdit`,
    data,
    null
  );

export const cooEditRequestDetails = async (data) =>
  await getRAKData(`eservice_coo_amendment/cooEdit`, data, null);

export const cooEditRequestOriginDetails = async (data) =>
  await getRAKData(`eservice_coo_amendment/cooC`, data, null);

export const goodsDetailsList = async (data) =>
  await getRAKData(`eservice_coo_amendment/goods_details_list`, data, null);

export const cooEditGoodsDetail = async (sendType, data) =>
  await postRAKData(
    sendType == "post" ? "POST" : sendType == "put" ? "PUT" : "POST",
    `eservice_coo_amendment/editCooGoodsDetail`,
    data,
    null
  );

export const cooEditGoodsDetailData = async (data) =>
  await getRAKData(`eservice_coo_amendment/editCooGoodsDetail`, data, null);

export const ratificationType = async () =>
  await getRAKData(`eservice_ratification/ratification_type`, null, null);

export const ratificationDocType = async () =>
  await getRAKData(`list/ratification_doc_type`, null, true);

export const ratificationRequest = async (data) =>
  await postRAKData("POST", `eservice_ratification/request`, data, null);

export const membershipVerification = async (data) =>
  await getRAKData(
    `eservice_membership/verify/${data.code}/${data.CompanyDate}`,
    null,
    null
  );

export const membershipFees = async (data) =>
  await postRAKData("POST", `eservice_membership/fees_updated`, data, true);

export const membershipProfile = async (data, dataType) =>
  await getRAKData(
    dataType == "1"
      ? `eservice_membership/profile${
          data.company_code ? `/` + data.company_code + `/` : `/`
        }${data.code}`
      : `eservice_person/profile`,
    dataType == "1" ? null : data,
    null
  );

export const cooAttachments = async (data, reqType) =>
  await postRAKData(
    "POST",
    reqType == 51
      ? `eservice_attachment/ratification`
      : reqType == 55
      ? `eservice_attachment/additional_request`
      : reqType == 88
      ? `eservice_attachment/additional_request`
      : reqType == 50
      ? `eservice_attachment/coo`
      : "",
    data,
    null
  );

export const ratificationRequestDelete = async (data, reqType) =>
  await postRAKData(
    "PUT",
    reqType == 51
      ? `eservice_attachment/ratification`
      : reqType == 55
      ? `eservice_attachment/additional_request`
      : reqType == 50
      ? `eservice_attachment/coo`
      : "",
    data,
    null
  );

export const deleteRequest = async (data) =>
  await postRAKData("PUT", `eservice_request/delete_byclient`, data, null);

export const paymentRequest = async (data) =>
  await postRAKData("POST", `eservice_payment/online_payment`, data, null);

export const totals = async (data) =>
  await getRAKData(`eservice_kpi/totals`, data, null);

export const paymentDetails = async (data) =>
  await getRAKData(`eservice_payment/payment_request`, data, null);

export const confirmPayment = async (data) =>
  await postRAKData("POST", `eservice_payment/confirm_online_pay`, data, null);

export const ratificationRequestDetails = async (data, reqType) =>
  await getRAKData(
    reqType == "request"
      ? `eservice_ratification/view_request`
      : `eservice_ratification/issued`,
    data,
    null
  );

export const ratificationRequestAttach = async (data, reqType) =>
  await getRAKData(
    reqType == 51
      ? `eservice_attachment/ratification`
      : reqType == 55
      ? `eservice_attachment/additional_request`
      : reqType == 50
      ? `eservice_attachment/coo`
      : "",
    data,
    null
  );

export const ratificationRequestUpdate = async (data) =>
  await postRAKData("PUT", `eservice_ratification/request`, data, null);

export const cooStamps = async (data) =>
  await getRAKData(`eservice_autostamp/coo_stamp`, data, null);

export const checkInvoice = async (data) =>
  await getRAKData(`eservice_coo/check_inovice_no`, data, null);

export const sendMostUsedService = async (code) =>
  await postData(`/api/service/${code}/count`, null, null);

export const getMostUsedService = async () =>
  await fetchData(`/api/service/most/used`, null, null);

export const getCooRequestDetails = async (data) =>
  await getRAKData(`eservice_coo/request`, data, null);

export const cooRequestUpdate = async (data) =>
  await postRAKData("PUT", `eservice_coo/request`, data, null);

export const updatePassword = async (data, userType) =>
  await postRAKData(
    "POST",
    userType == "1"
      ? `eservice_member/change_password`
      : `eservice_person/change_password`,
    data,
    null
  );

export const sendCustomerRating = async (data) =>
  await postRAKData("POST", `eservice_rating/customer_rating`, data, null);

export const getPaymentTrx = async (data) =>
  await getRAKData(`eservice_payment/trx/${data.code}`, null, null);

export const sendMemberRegister = async (data, userType) =>
  await postRAKData(
    "POST",
    userType == "membership"
      ? `eservice_member/register`
      : "eservice_person/register",
    data,
    null
  );

export const profileCompanyUpdate = async (data, dataType) =>
  await postRAKData(
    "PUT",
    dataType == "membership"
      ? `eservice_membership/update_profile`
      : dataType == "user"
      ? `eservice_member/update_user_profile`
      : `eservice_person/profile`,
    data,
    null
  );

export const getCirculars = async () =>
  await fetchData(`/api/attachment`, null, null);

export const sendNotification = async (data) =>
  await postRAKData("POST", `eservice_notification/coo`, data, null);

export const getNotifications = async (data) =>
  await getRAKData(`eservice_notification/coo`, data, null);

export const sendEmail = async (data) =>
  await postData(`/api/email/external`, data, null);

export const getFileList = async (data) =>
  await getRAKData(`eservice_autostamp/trx_filelist/${data.code}`, null, null);

export const fileStamp = async (data, fileType) =>
  await postData(
    fileType == "stamp"
      ? `/api/stamp?filename=${data?.file_to_stamp}&code=${data?.coo_code}&date=${data?.coo_issue_date}&invoice_no=${data?.invoice_no}&invoice_date=${data?.invoice_issue_date}&company_code=${data?.company_code}`
      : `/api/ratifi?filename=${data?.file_to_stamp}&code=${data?.coo_code}&verify_id=${data?.verify_id}&company_code=${data?.company_code}&trade_reg_no=${data?.trade_reg_no}&company_name=${data.company_name}&lang=${data.lang}&type=${data.type}`,
    null,
    null
  );

export const finishFileStamp = async (data) =>
  await postRAKData("POST", `eservice_autostamp/auto_stamp`, data, null);

export const supplierLogin = async (data) =>
  await postData(`/api/users/login/supplier`, data, null);

export const sendSupplierRegister = async (data) =>
  await postData("/api/users/signUp/supplier", data, null);

export const getServiceStep = async (data) =>
  await getRAKData(`eservice_step/service_step`, data, null);

export const printTracking = async (data) =>
  await postRAKData("POST", "eservice_request/customer_print", data, null);

export const getTrxCooList = async (data) =>
  await getRAKData(`icc/trx_coo_list/${data?.code}/${data?.date}`, null, null);

export const sendCooListToIcc = async (data) =>
  await postData("/api/payment/test/icc", data, null);

export const checkCooListToIcc = async (chamber, number, issued) =>
  await postData(
    `/api/payment/test/icc/verify?chamber=${chamber}&number=${number}&issued=${issued}`,
    null,
    null
  );
