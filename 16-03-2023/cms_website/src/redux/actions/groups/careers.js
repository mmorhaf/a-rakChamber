import { createAction } from "../creators";

export default {
  ...createAction("GET_ALL_CAREERS", "language", "department"),
  ...createAction("ALL_CAREERS_RETURNED", "data"),
  ...createAction("GET_CAREER_BY_ID", "id", "language"),
  ...createAction("CAREER_BY_ID_RETURNED", "data"),
  ...createAction("POST_CAREER_APPLICATION", "data"),
  ...createAction("POST_CAREER_APPLICATION_RETURNED", "data"),
  ...createAction("GET_CAREER_BY_ALIAS", "alias", "language"),
  ...createAction("GET_CAREER_BY_ALIAS_RETURNED", "data"),
  //SubmitCareer
  ...createAction("SUBMIT_CAREER", "payload"),
  ...createAction("SUBMIT_CAREER_DONE", "data"),
};
