import { createAction } from "../creators";

export default {
  ...createAction("REQ_SITEMAP"),
  ...createAction("SITEMAP_RETURNED", "data"),
};
