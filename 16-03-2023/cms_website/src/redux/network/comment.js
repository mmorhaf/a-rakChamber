import { fetchData, postData } from "./api";

export const submitComment = async (data) =>
  await postData(`/api/comment`, data, null);
