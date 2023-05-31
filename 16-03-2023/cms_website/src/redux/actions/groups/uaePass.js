import { createAction } from "../creators";

export default {
  ...createAction("UPDATE_AUTH_CODE", "payload"),

  ...createAction("GET_ACCESS_TOKEN", "data"),
  ...createAction("GET_ACCESS_TOKEN_DONE", "payload"),

  ...createAction("GET_PROFILE", "token"),
  ...createAction("GET_PROFILE_DONE", "payload"),

  ...createAction("UAE_PASS_LOGIN", "data"),
  ...createAction("UAE_PASS_LOGIN_DONE", "data"),

  ...createAction("GET_UAE_PASS_PERSON"),
  ...createAction("GET_UAE_PASS_PERSON_DONE", "data"),

  ...createAction("SEND_UAE_PASS_PERSON_DATA", "data"),
  ...createAction("SEND_UAE_PASS_PERSON_DATA_DONE", "data"),

  ...createAction("UAE_PASS_LOGOUT"),
};
