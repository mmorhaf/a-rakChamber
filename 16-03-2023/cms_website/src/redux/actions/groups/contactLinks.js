import { createAction } from "../creators";

export default {
  ...createAction("GET_CONTACT_LINKS"),
  ...createAction("CONTACT_LINKS_RETURNED", "data"),
};
