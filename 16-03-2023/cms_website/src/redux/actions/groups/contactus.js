import { createAction } from "../creators";

export default {
  ...createAction("CONTACT_US_ACTION", "data"),
  ...createAction("CONTACT_US_RETURNED", "res"),
};
