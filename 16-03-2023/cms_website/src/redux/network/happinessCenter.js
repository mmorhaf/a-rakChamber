import { fetchData, postData } from "./api";

export const getAllCenters = async (language) =>
  await fetchData("/api/happiness/center", null, { language });

export const getCenterById = async (id, language) =>
  await fetchData(`/api/happiness/center/${id}`, null, { language });
