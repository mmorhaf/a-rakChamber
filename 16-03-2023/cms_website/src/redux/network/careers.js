import { fetchData, postData } from "./api";

export const getAllCareers = async (language, department) =>
  await fetchData("/api/career", { department }, { language });

export const getCareerById = async (id, language) =>
  await fetchData(`/api/career/${id}`, null, { language });

export const getCareerByAlias = async (alias, language) =>
  await fetchData(`/api/career/${alias}`, null, { language });

export const submitCareerApp = async (data) =>
  await postData("/api/application", data, null);
