import { fetchData } from "./api";

export const search = async (data, language) =>
  await fetchData("/api/search",  data , { language });

export const searchPost = async (data, language) =>
  await fetchData("/api/post/search", data, { language });

export const searchNewsPost = async (data, sort, language) =>
  await fetchData(`/api/filter/${sort}`, data, { language });
