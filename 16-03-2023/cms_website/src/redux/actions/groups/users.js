import { createAction } from "../creators";

export default {
  ...createAction("LOG_IN_ACTION", "payload"),
  ...createAction("LOG_IN_COMPLETE", "data"),
  ...createAction("FORGOT_PASSWORD_ACTION", "payload"),
  ...createAction("FORGOT_PASSWORD_EMAIL_RETURNED", "data"),
  ...createAction("RESET_PASSWORD_ACTION", "payload"),
  ...createAction("RESET_PASSWORD_RETURNED", "data"),
  ...createAction("SIGN_UP_ACTION", "payload"),
  ...createAction("SIGN_UP_COMPLETE", "data"),
  ...createAction("LOG_OUT"),
  ...createAction("CONFIRM_USER", "data"),
  ...createAction("CONFIRM_USER_RETURNED", "data"),
  ...createAction("UPDATE_USER_Action", "id", "payload"),
  ...createAction("USER_UPDATED", "response"),
  ...createAction("ACTIVATE_ACCOUNT", "payload"),
  ...createAction("ACTIVATE_ACCOUNT_RETURNED", "data"),
};
