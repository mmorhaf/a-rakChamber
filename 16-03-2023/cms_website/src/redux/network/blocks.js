import { fetchData, postData } from "./api";

export const fetchBlockData = async (language, url) =>
  await fetchData("/api/block/url", { url }, { language });
