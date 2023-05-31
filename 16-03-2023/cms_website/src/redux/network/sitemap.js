import { fetchData } from "./api";

export const getSitemap = async () =>
  await fetchData("/api/site/map", null, null);
