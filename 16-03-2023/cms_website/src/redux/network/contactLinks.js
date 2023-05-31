import { fetchData } from "./api";

export const getContactLinks = async () =>
  await fetchData("/api/statistics/contact/links", null, null);
