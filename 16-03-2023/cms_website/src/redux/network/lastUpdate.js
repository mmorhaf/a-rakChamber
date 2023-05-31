import { fetchData } from "./api";

export const getLastUpdate = async () =>
  await fetchData(`/api/lastUpdate`, null, null);
