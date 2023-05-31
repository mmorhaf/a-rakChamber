import { fetchData } from "./api";

export const getThemeList = async () =>
  await fetchData("/api/theme", null, null);
