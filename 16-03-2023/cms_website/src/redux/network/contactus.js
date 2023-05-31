import { postData, fetchData } from "./api";
//let lang = localStorage.getItem("lang");

export const contactUs = async (data) =>
  await postData(`/api/service/request`, data, null);
