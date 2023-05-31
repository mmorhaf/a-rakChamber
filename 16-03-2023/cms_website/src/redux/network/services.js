import { postData, fetchData } from "./api";
const localToken = localStorage.getItem("authUser");
const sessionToken = sessionStorage.getItem("authUserSession")
  ? sessionStorage.getItem("authUserSession")
  : sessionStorage.getItem("supplierAuthUserSession");
const supplierToken = sessionStorage.getItem("supplierAuthUserSession");
const token = localToken ? localToken : sessionToken ? sessionToken : null;

export const submitServiceForm = async (data) =>
  await postData("/api/service/request", { ...data }, null);

export const fetchMyRequests = async () =>
  await fetchData("/api/service/request/mine", null, { token });

export const fetchRequestDetails = async (id) =>
  await fetchData(`/api/service/request/${id}`, null, { token });

export const addRequestNote = async (data) =>
  await postData(`/api/service/request/${data.id}/note`, data.body, {
    token,
  });

export const fetchRequestNotes = async (id) =>
  await fetchData(`/api/service/request/${id}/note`, null, { token });

export const fetchRequestStatusChanges = async (id) =>
  await fetchData(`/api/service/request/${id}/status`, null, { token });

export const submitSupplierForm = async (data) =>
  await postData(
    "/api/service/request/supplier",
    { ...data },
    { token: supplierToken }
  );

export const updateSupplier = async (data, id) =>
  await postData(
    `/api/service/request/supplier/${id}/update`,
    { ...data },
    { token: supplierToken }
  );

export const generateQRCode = async (data) =>
  await postData("/api/qrCode/generate", data, null);

export const markNotification = async (data) =>
  await postData(`/api/notification/mark/mine`, data, { token: supplierToken });
