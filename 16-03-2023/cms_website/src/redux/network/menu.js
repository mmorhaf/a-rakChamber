import { fetchData } from "./api";

export const getMenu = async (language) =>
  await fetchData("/api/menuItem/compact", null, null);
