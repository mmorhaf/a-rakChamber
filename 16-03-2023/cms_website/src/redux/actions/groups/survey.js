import { createAction } from "../creators";

export default {
  ...createAction("GET_ALL_SURVEYS", "language", "sort"),
  ...createAction("ALL_SURVEYS_RETURNED", "data"),

  ...createAction("GET_SURVEY_QUESTIONS", "data"),
  ...createAction("GET_SURVEY_QUESTIONS_COMPLETE", "data"),
  ...createAction("SAVE_ANSWERS", "data"),
  ...createAction("SAVE_ANSWERS_COMPLETE", "data"),

  ...createAction("GET_SURVEY_BY_ALIAS", "language", "alias"),
  ...createAction("SURVEY_BY_ALIAS_RETURNED", "data"),

  ...createAction("GET_SURVEY_Q_BY_ALIAS", "language", "alias"),
  ...createAction("SURVEY_Q_BY_ALIAS_RETURNED", "data"),

  ...createAction("SUBMIT_SURVEY", "data", "language"),
  ...createAction("SUBMIT_SURVEY_RETURNED", "data"),
  ...createAction("GET_ANSWERS_BY_ID", "id"),
  ...createAction("ANSWERS_BY_ID_RETURNED", "data"),
  ...createAction("GET_ARCHIVED_POLLS", "language"),
  ...createAction("ARCHIVED_POLLS_RETURNED", "data"),
};
