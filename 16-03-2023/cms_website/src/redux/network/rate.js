import { fetchData, postData } from "./api";

export const askingForRate = async (url) =>
  await fetchData(`/api/rate/askFor`, { url }, null);

export const sendFeedBack = async (data) =>
  await postData(`/api/rate/feedback`, data, null);

export const sendIsUseful = async (data) =>
  await postData(`/api/rate/isUseFull`, data, null);

export const sendReport = async (data) =>
  await postData(`/api/rate/report`, data, null);

export const rateFile = async (id, rate) =>
  await postData(`/api/file/${id}/rate`, { rate }, null);
