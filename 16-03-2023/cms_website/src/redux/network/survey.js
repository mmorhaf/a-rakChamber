import { fetchData, postData } from "./api";

export const getAllSurveys = async (type, language) =>
  await fetchData("/api/survey", { type }, { language });

export const getSurveyQuestion = async (data) =>
  await fetchData(`/api/survey/${data.id}/questions`, null, {
    language: "all",
  });

export const saveSurveyAnswers = async (data) =>
  await postData(`/api/survey/answer`, data, {
    language: "all",
  });

export const getSurveyByAlias = async (alias, language) =>
  await fetchData(`/api/survey/${alias}`, null, { language });

export const getSurveyQByAlias = async (alias, language) =>
  await fetchData(`/api/survey/${alias}/questionsbyalias`, null, { language });

export const submitSurveyAnswer = async (data, language) =>
  await postData(`/api/survey/answer`, data, { language });

export const getSurveyAnswers = async (id) =>
  await fetchData(`/api/survey/${id}/answers`);

export const getArchivedPolls = async (language) =>
  await fetchData(`/api/survey/archived`, {type:'poll'}, { language });
