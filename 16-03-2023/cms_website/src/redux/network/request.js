import { postData } from "./api";

export const submitRequest = async (data) =>
  await postData(`/api/request`, data, null);
